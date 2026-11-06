"use client";

import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  Loader2,
} from "lucide-react";

import Recaptcha, { RECAPTCHA_MESSAGE, recaptchaEnabled } from "./recaptcha";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Same rules as the quote form: only name and phone are required.
const detailsSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  phone: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .regex(/^[0-9+\-\s()]{7,15}$/, "Enter a valid mobile number"),
  email: z.email({ message: "Enter a valid email address" }).optional().or(z.literal("")),
  company: z.string().trim().max(150, "Company name is too long").optional().or(z.literal("")),
  address: z.string().trim().max(300, "Address is too long").optional().or(z.literal("")),
  message: z.string().trim().max(2000, "Message is too long").optional().or(z.literal("")),
  for_business: z.enum(["yes", "no"]).optional().or(z.literal("")),
  units: z.string().optional().or(z.literal("")),
});

// Same choices as the API.
const UNIT_OPTIONS = ["1-10", "11-50", "51-100", "101-500", "500+"];

const inputClass =
  "w-full rounded-md border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 shadow-sm transition placeholder:text-neutral-500 hover:border-neutral-300 focus:border-[#E87717] focus:outline-none focus:ring-4 focus:ring-[#E87717]/10";
const errorInputClass = "border-red-400 focus:border-red-500 focus:ring-red-500/10";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const pad = (n) => String(n).padStart(2, "0");
const monthKey = (y, m) => `${y}-${pad(m + 1)}`;
const lastDayOf = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();

// "2026-11-05" -> "Thursday, 5 November 2026"
const longDate = (date) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const fetchMonth = async (y, m) => {
  const from = `${monthKey(y, m)}-01`;
  const to = `${monthKey(y, m)}-${pad(lastDayOf(y, m))}`;
  const res = await fetch(`${API_URL}/appointments/slots?from=${from}&to=${to}`, {
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.data) throw new Error(json.message || "Could not load slots");
  return json.data;
};

function Field({ id, label, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium text-neutral-800">
        {label}{" "}
        {required ? (
          <span className="text-[#E87717]">*</span>
        ) : (
          <span className="font-normal text-neutral-500">(optional)</span>
        )}
      </label>
      {children}
      {error && <p className="text-xs font-medium text-red-600">{error.message}</p>}
    </div>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.04em] text-neutral-900">
      <Icon className="h-5 w-5 text-[#E87717]" aria-hidden />
      {children}
    </h3>
  );
}

function Calendar({ view, setView, data, isLoading, selectedDate, onSelect }) {
  const { y, m } = view;
  const days = useMemo(() => Object.fromEntries((data?.days ?? []).map((d) => [d.date, d])), [data]);
  const startWeekday = new Date(Date.UTC(y, m, 1)).getUTCDay();
  const total = lastDayOf(y, m);

  // Months that can hold a bookable date.
  const today = data?.today;
  const last = data?.last_bookable_date;
  const canPrev = today ? monthKey(y, m) > today.slice(0, 7) : false;
  const canNext = last ? monthKey(y, m) < last.slice(0, 7) : true;
  const move = (step) => {
    const d = new Date(Date.UTC(y, m + step, 1));
    setView({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={!canPrev}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:bg-transparent"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={!canNext}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-300 disabled:hover:bg-transparent"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
        <p className="ml-1 text-lg font-medium text-neutral-900">
          {MONTHS[m]} {y}
        </p>
        {isLoading && <Loader2 className="ml-auto h-4 w-4 animate-spin text-neutral-400" aria-hidden />}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center" role="grid" aria-label={`${MONTHS[m]} ${y}`}>
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="py-1.5 text-sm font-medium text-neutral-700">
            {d}
          </span>
        ))}
        {Array.from({ length: startWeekday }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {Array.from({ length: total }, (_, i) => {
          const date = `${monthKey(y, m)}-${pad(i + 1)}`;
          const open = !!days[date]?.open;
          const selected = selectedDate === date;
          return (
            <button
              key={date}
              type="button"
              disabled={!open}
              onClick={() => onSelect(date)}
              aria-pressed={selected}
              aria-label={`${longDate(date)}${open ? "" : ", not available"}`}
              className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors ${
                selected
                  ? "bg-[#E87717] font-semibold text-white"
                  : open
                    ? "font-medium text-neutral-900 hover:bg-[#E87717]/10 hover:text-[#C9620E]"
                    : "cursor-not-allowed text-neutral-300"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimeSlots({ day, selectedTime, onSelect }) {
  if (!day) {
    return (
      <p className="rounded-md border border-dashed border-neutral-200 px-4 py-8 text-center text-sm text-neutral-500">
        Choose a date to see the available times.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {day.slots.map((slot) => {
        const available = slot.status === "available";
        const selected = selectedTime === slot.time;
        return (
          <button
            key={slot.time}
            type="button"
            disabled={!available}
            onClick={() => onSelect(slot.time)}
            aria-pressed={selected}
            className={`rounded-md border px-3 py-3 text-sm font-medium transition-colors ${
              selected
                ? "border-[#E87717] bg-[#E87717] text-white"
                : available
                  ? "border-neutral-300 bg-white text-neutral-900 hover:border-[#E87717] hover:text-[#C9620E]"
                  : "cursor-not-allowed border-neutral-100 bg-neutral-50 text-neutral-300 line-through"
            }`}
          >
            {slot.label}
            {slot.status === "booked" && <span className="sr-only"> (booked)</span>}
          </button>
        );
      })}
    </div>
  );
}

export default function BookSlotForm() {
  const queryClient = useQueryClient();
  const [view, setView] = useState(() => {
    const now = new Date();
    return { y: now.getFullYear(), m: now.getMonth() };
  });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [slotError, setSlotError] = useState("");
  const [step, setStep] = useState("form"); // form | confirm | done
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const captchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["appointment-slots", view.y, view.m],
    queryFn: () => fetchMonth(view.y, view.m),
    staleTime: 30 * 1000,
  });

  const day = data?.days.find((d) => d.date === date);
  const slotLabel = day?.slots.find((s) => s.time === time)?.label || time;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      company: "",
      message: "",
      for_business: "",
      units: "",
    },
  });

  const pickDate = (value) => {
    setDate(value);
    setTime("");
    setSlotError("");
  };

  // Step 1 -> 2: details are valid and a slot is picked.
  const onReview = (values) => {
    if (!date || !time) {
      setSlotError("Please choose a date and time for your visit.");
      return;
    }
    if (recaptchaEnabled && !captchaToken) {
      setCaptchaError(RECAPTCHA_MESSAGE);
      return;
    }
    setDetails(values);
    setApiError("");
    setCaptchaError("");
    setStep("confirm");
  };

  const onConfirm = async () => {
    if (recaptchaEnabled && !captchaToken) {
      setCaptchaError(RECAPTCHA_MESSAGE);
      return;
    }
    setLoading(true);
    setApiError("");
    try {
      const res = await fetch(`${API_URL}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...details,
          booking_date: date,
          booking_time: time,
          recaptcha_token: captchaToken,
        }),
      });
      const result = await res.json().catch(() => ({}));

      if (res.status === 409) {
        // Slot taken or switched off meanwhile: refresh and pick again.
        await queryClient.invalidateQueries({ queryKey: ["appointment-slots"] });
        setTime("");
        setSlotError(result.message || "This time slot is no longer available.");
        setStep("form");
        return;
      }
      if (!res.ok) throw new Error(result.message || "Failed to book your slot");

      queryClient.invalidateQueries({ queryKey: ["appointment-slots"] });
      setStep("done");
    } catch (error) {
      console.error("Book slot error:", error);
      setApiError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      // A token works only once: clear it so a fresh tick is asked for.
      captchaRef.current?.reset();
      setCaptchaToken("");
    }
  };

  const startOver = () => {
    reset();
    setDetails(null);
    setDate("");
    setTime("");
    setSlotError("");
    setStep("form");
  };

  // ---------------------------------------------------------------- done
  if (step === "done") {
    return (
      <div className="flex flex-col items-center px-2 py-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="mt-4 text-xl font-semibold text-neutral-900">Your slot is booked!</h3>
        <p className="mt-2 text-base font-medium text-neutral-900">
          {longDate(date)} at {slotLabel}
        </p>
        <p className="mt-2 max-w-sm text-sm text-neutral-500">
          Thank you, {details?.name}. Our team will call you on {details?.phone} to confirm your
          visit.
        </p>
        <button
          type="button"
          onClick={startOver}
          className="mt-6 text-sm font-medium text-[#E87717] underline-offset-4 hover:underline"
        >
          Book another slot
        </button>
      </div>
    );
  }

  // ------------------------------------------------------------- confirm
  if (step === "confirm") {
    const rows = [
      ["Date", longDate(date)],
      ["Time", `${slotLabel} (India time)`],
      ["Name", details.name],
      ["Mobile Number", details.phone],
      ["Email address", details.email],
      ["Address", details.address],
      ["Special requests", details.message],
      ["Buying for business", details.for_business === "yes" ? "Yes" : details.for_business === "no" ? "No" : ""],
      ["Company name", details.company],
      ["Units", details.units],
    ].filter(([, v]) => v);

    return (
      <div>
        <SectionTitle icon={CheckCircle2}>Confirm your booking</SectionTitle>
        <p className="mt-2 text-sm text-neutral-500">Please check your details before booking.</p>

        <dl className="mt-5 divide-y divide-neutral-100 rounded-md border border-neutral-200">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 px-4 py-3 sm:grid-cols-[160px_1fr] sm:gap-4">
              <dt className="text-[13px] font-medium text-neutral-500">{label}</dt>
              <dd className="whitespace-pre-line break-words text-sm text-neutral-900">{value}</dd>
            </div>
          ))}
        </dl>

        {/* Ticked on the form step; asked again only if a submit used the token up. */}
        {!captchaToken && (
        <Recaptcha
          ref={captchaRef}
          className="mt-5"
          error={captchaError}
          onChange={(token) => {
            setCaptchaToken(token);
            if (token) setCaptchaError("");
          }}
        />
        )}

        {apiError && (
          <div className="mt-4 flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <p>{apiError}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setStep("form")}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-900 disabled:opacity-60"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Edit details
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#E87717] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#E87717]/20 transition-all hover:bg-[#C9620E] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Booking...
              </>
            ) : (
              <>
                Confirm Booking
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- form
  return (
    <form onSubmit={handleSubmit(onReview)} noValidate className="space-y-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionTitle icon={CalendarDays}>Date</SectionTitle>
          <div className="mt-5">
            <Calendar
              view={view}
              setView={setView}
              data={data}
              isLoading={isLoading}
              selectedDate={date}
              onSelect={pickDate}
            />
          </div>
        </div>

        <div>
          <SectionTitle icon={Clock}>Time</SectionTitle>
          <div className="mt-5">
            {isError ? (
              <p className="text-sm text-red-600">Could not load available times. Please refresh the page.</p>
            ) : (
              <TimeSlots day={day} selectedTime={time} onSelect={(t) => { setTime(t); setSlotError(""); }} />
            )}
          </div>
        </div>
      </div>

      <p className="flex items-center justify-center gap-2 text-center text-sm text-neutral-500">
        <Info className="h-4 w-4 shrink-0" aria-hidden />
        Monday to Saturday, 10:00 AM – 4:30 PM. All times are India time (IST).
      </p>

      {slotError && (
        <div className="flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <p>{slotError}</p>
        </div>
      )}

      <div>
        <SectionTitle icon={Info}>Your details</SectionTitle>
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="grid gap-4">
            <Field id="slot-name" label="First and last name" required error={errors.name}>
              <input
                id="slot-name"
                type="text"
                autoComplete="name"
                placeholder="First and last name"
                {...register("name")}
                className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
              />
            </Field>
            <Field id="slot-email" label="Email" error={errors.email}>
              <input
                id="slot-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                {...register("email")}
                className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
              />
            </Field>
            <Field id="slot-address" label="Address" error={errors.address}>
              <input
                id="slot-address"
                type="text"
                autoComplete="street-address"
                placeholder="Address"
                {...register("address")}
                className={`${inputClass} ${errors.address ? errorInputClass : ""}`}
              />
            </Field>
            <Field id="slot-phone" label="Phone number" required error={errors.phone}>
              <input
                id="slot-phone"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98104 38876"
                {...register("phone")}
                className={`${inputClass} ${errors.phone ? errorInputClass : ""}`}
              />
            </Field>
          </div>
          <Field id="slot-message" label="Any special requests" error={errors.message}>
            <textarea
              id="slot-message"
              rows={6}
              placeholder="Add any special requests"
              {...register("message")}
              className={`h-full min-h-32 resize-none ${inputClass} ${errors.message ? errorInputClass : ""}`}
            />
          </Field>
        </div>
      </div>

      <div>
        <SectionTitle icon={Building2}>Additional information</SectionTitle>
        <div className="mt-5 grid grid-cols-1 gap-4">
          <Field id="slot-business" label="Are you looking to buy for your business?" error={errors.for_business}>
            <select id="slot-business" {...register("for_business")} className={inputClass}>
              <option value="">--Select an option--</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </Field>
          <Field id="slot-company" label="Company Name" error={errors.company}>
            <input
              id="slot-company"
              type="text"
              autoComplete="organization"
              placeholder="Your company"
              {...register("company")}
              className={`${inputClass} ${errors.company ? errorInputClass : ""}`}
            />
          </Field>
          <Field id="slot-units" label="How many units are you looking to purchase?" error={errors.units}>
            <select id="slot-units" {...register("units")} className={inputClass}>
              <option value="">--Select an option--</option>
              {UNIT_OPTIONS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <Recaptcha
        ref={captchaRef}
        error={captchaError}
        onChange={(token) => {
          setCaptchaToken(token);
          if (token) setCaptchaError("");
        }}
      />

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E87717] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#E87717]/20 transition-all hover:bg-[#C9620E] active:scale-[0.99]"
      >
        Review Booking
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </button>
    </form>
  );
}
