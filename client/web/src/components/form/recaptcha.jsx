"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Google reCAPTCHA v2 ("I'm not a robot" checkbox).
// Hidden, and not required, until NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set.
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export const recaptchaEnabled = !!SITE_KEY;
export const RECAPTCHA_MESSAGE = "Please confirm you are not a robot.";

let loader = null;
function loadRecaptcha() {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  if (!loader) {
    loader = new Promise((resolve, reject) => {
      window.__onRecaptchaLoad = () => resolve(window.grecaptcha);
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?onload=__onRecaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        loader = null;
        reject(new Error("reCAPTCHA failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return loader;
}

// onChange(token) gets "" when the tick expires or is reset.
// ref.reset() clears it (a token can only be used once).
const Recaptcha = forwardRef(function Recaptcha({ onChange, error, className = "" }, ref) {
  const box = useRef(null);
  const widgetId = useRef(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
      onChangeRef.current?.("");
    },
  }));

  useEffect(() => {
    if (!SITE_KEY) return undefined;
    let cancelled = false;
    loadRecaptcha()
      .then((grecaptcha) => {
        if (cancelled || !box.current || widgetId.current !== null) return;
        widgetId.current = grecaptcha.render(box.current, {
          sitekey: SITE_KEY,
          callback: (token) => onChangeRef.current?.(token),
          "expired-callback": () => onChangeRef.current?.(""),
          "error-callback": () => onChangeRef.current?.(""),
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!SITE_KEY) return null;

  return (
    <div className={className}>
      <div ref={box} />
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
});

export default Recaptcha;
