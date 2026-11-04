"use strict";

// Google reCAPTCHA v2 ("I'm not a robot") check for website forms.
// Switched off until RECAPTCHA_SECRET_KEY is set in .env.

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

export const recaptchaEnabled = () => !!process.env.RECAPTCHA_SECRET_KEY;

export const RECAPTCHA_MESSAGE = "Please confirm you are not a robot.";

export async function verifyRecaptcha(token, ip) {
  if (!recaptchaEnabled()) return true;
  if (!token || typeof token !== "string") return false;

  try {
    const params = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    });
    if (ip) params.append("remoteip", ip);

    const res = await fetch(VERIFY_URL, { method: "POST", body: params });
    const result = await res.json();
    return result.success === true;
  } catch (error) {
    console.error("reCAPTCHA verify failed:", error?.message || error);
    return false;
  }
}

// Route preHandler for JSON forms (token in body.recaptcha_token).
export async function requireRecaptcha(req, res) {
  const ok = await verifyRecaptcha(req.body?.recaptcha_token, req.ip);
  if (!ok) {
    return res.code(400).send({ status: false, message: RECAPTCHA_MESSAGE });
  }
}
