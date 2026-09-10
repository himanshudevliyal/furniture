import nodemailer from "nodemailer";
import config from "../config/index.js";
import { renderEmail } from "../utils/render-mail.js";
import { AxiosError } from "axios";
import path from "path";
import fs from "fs";
import ejs from "ejs";

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vishal.gautam.5812@gmail.com",
    pass: config.smtp_password,
  },
});

export const sendSampleMail = async (to) => {
  const info = await mailer.sendMail({
    from: `"Infrakeys" <vishal.gautam.5812@gmail.com>`,
    to: to,
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });

  console.log("Message sent:", info.messageId);
};

export const sendResetUsernameEmail = async (userEmail, token) => {
  try {
    const templatePath = path.join(
      process.cwd(),
      "views",
      "forgot-username.ejs",
    );
    const templateString = fs.readFileSync(templatePath, "utf-8");
    const resetLink = `/reset-username?t=${token}`;
    const htmlContent = ejs.render(templateString, {
      resetLink,
    });

    const mailOptions = {
      // from: config.smtp_from_email,
      from: '"Infrakeys" <vishal.gautam.5812@gmail.com>',
      to: userEmail,
      subject: "Reset Your Username – Infrakeys",
      html: htmlContent,
    };

    const info = await mailer.sendMail(mailOptions);
    console.log("Username reset email sent successfully!");
    return info;
  } catch (error) {
    console.error("Error sending Username reset email:", error);
    throw error;
  }
};

export const sendResetPasswordEmail = async (userEmail, token) => {
  try {
    const templatePath = path.join(
      process.cwd(),
      "app/views/emails",
      "forgot-password.ejs",
    );
    const templateString = fs.readFileSync(templatePath, "utf-8");
    const resetLink = `${config.app_url}/reset-password?t=${token}`;
    const htmlContent = ejs.render(templateString, {
      resetLink,
    });

    const mailOptions = {
      from: `"Infrakeys" <vishal.gautam.5812@gmail.com>`,
      to: userEmail,
      subject: "Reset Your Password – Infrakeys",
      html: htmlContent,
    };

    const info = await mailer.sendMail(mailOptions);
    console.log("Password reset email sent successfully!");
    return info;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

export async function sendEmail({ to, templateKey, payload, subject }) {
  if (process.env.NODE_ENV === "development") {
    console.log("📧 Email skipped (dev):", { to, subject, payload });
    return;
  }

  try {
    const html = await renderEmail(templateKey, payload);
    return mailer.sendMail({
      from: `"Infrakeys" <vishal.gautam.5812@gmail.com>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new HttpError(
        error?.response?.data?.message ?? "Something went wrong!",
        error?.response?.status ?? 500,
      );
    } else {
      throw error;
    }
  }
}
