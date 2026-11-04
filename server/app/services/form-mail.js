"use strict";

// Emails for website form submissions: one to the Natraj inbox with every
// field, and (when the visitor gave an email) a short acknowledgement to them.
// Mail is sent in the background: a mail failure never fails the form.
import config from "../config/index.js";
import { mailer, MAIL_FROM } from "./mailer.js";

const BRAND = "#E87717";
const SITE_URL = (process.env.NEXT_PUBLIC_URL || "https://www.natrajfurniture.com").replace(/\/+$/, "");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br>");

// [["Label", value], ...] -> table rows; empty values are left out.
const rowsHtml = (rows) =>
  rows
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;width:180px;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

const rowsText = (rows) =>
  rows
    .filter(([, value]) => value !== undefined && value !== null && String(value).trim() !== "")
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

const layout = (heading, bodyHtml) => `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f6f6;padding:24px">
    <div style="max-width:620px;margin:0 auto;background:#fff;border-top:4px solid ${BRAND}">
      <div style="padding:20px 24px 8px">
        <p style="margin:0;color:${BRAND};font-size:12px;font-weight:bold;letter-spacing:.06em;text-transform:uppercase">Natraj Office Furniture</p>
        <h2 style="margin:6px 0 0;color:#111;font-size:20px">${escapeHtml(heading)}</h2>
      </div>
      <div style="padding:8px 24px 24px;font-size:14px;line-height:1.5;color:#333">${bodyHtml}</div>
    </div>
  </div>`;

const isConfigured = () => !!(config.smtp_user && config.smtp_password && config.notify_email);

/**
 * @param {object} mail
 * @param {string} mail.form      e.g. "Book Your Slot" (used in the subject)
 * @param {string} mail.summary   short subject tail, e.g. the visitor's name
 * @param {Array}  mail.rows      [["Label", value], ...] all submitted fields
 * @param {string} [mail.replyTo] visitor email, so "Reply" goes to them
 * @param {Array}  [mail.attachments] nodemailer attachments
 * @param {object} [mail.ack]     visitor acknowledgement: { message, rows }
 */
const send = async ({ form, summary, rows, replyTo, attachments, ack }) => {
  if (!isConfigured()) {
    console.warn(`📧 ${form} mail skipped: SMTP_USERNAME / SMTP_PASSWORD not set`);
    return;
  }

  await mailer.sendMail({
    from: MAIL_FROM,
    to: config.notify_email,
    replyTo: replyTo || undefined,
    subject: `New ${form}${summary ? `: ${summary}` : ""}`,
    text: `New ${form} from the website.\n\n${rowsText(rows)}`,
    html: layout(
      `New ${form}`,
      `<p style="margin:0 0 12px">A new <b>${escapeHtml(form)}</b> was submitted on the website.</p>
       <table style="width:100%;border-collapse:collapse;font-size:14px">${rowsHtml(rows)}</table>
       ${replyTo ? `<p style="margin:16px 0 0;color:#666">Reply to this email to answer ${escapeHtml(replyTo)} directly.</p>` : ""}`,
    ),
    attachments,
  });

  if (ack && replyTo) {
    await mailer.sendMail({
      from: MAIL_FROM,
      to: replyTo,
      replyTo: config.notify_email,
      subject: `We have received your ${form.toLowerCase()} – Natraj Office Furniture`,
      text: `${ack.message}\n\n${rowsText(ack.rows || [])}\n\nNatraj Office Furniture\n${SITE_URL}`,
      html: layout(
        "Thank you!",
        `<p style="margin:0 0 12px">${escapeHtml(ack.message)}</p>
         ${ack.rows?.length ? `<table style="width:100%;border-collapse:collapse;font-size:14px">${rowsHtml(ack.rows)}</table>` : ""}
         <p style="margin:16px 0 0">Regards,<br><b>Natraj Office Furniture</b><br>
           <a href="${SITE_URL}" style="color:${BRAND}">${SITE_URL.replace(/^https?:\/\//, "")}</a></p>`,
      ),
    });
  }
};

// Fire and forget from a controller, after the record is saved.
export const notifyForm = (mail) => {
  send(mail).catch((error) =>
    console.error(`📧 ${mail.form} mail failed:`, error?.message || error),
  );
};

// "2026-11-05" -> "Thursday, 5 November 2026"
export const longDate = (date) =>
  date
    ? new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      })
    : "";
