"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  useAppointmentSlots,
  useDisableAppointmentSlot,
  useEnableAppointmentSlot,
} from "@/hooks/use-appointments";
import { formatDate } from "./status";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const pad = (n) => String(n).padStart(2, "0");
const lastDayOf = (y, m) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();

const slotStyles = {
  available: "bg-emerald-50 text-emerald-700",
  booked: "bg-blue-50 text-blue-700",
  blocked: "bg-red-50 text-red-700",
  past: "bg-neutral-100 text-neutral-500",
  closed: "bg-neutral-100 text-neutral-500",
};
const slotNames = {
  available: "Available",
  booked: "Booked",
  blocked: "Disabled",
  past: "Past",
  closed: "Closed",
};

const errorText = (err, fallback) => err?.response?.data?.message || fallback;

export default function SlotManager() {
  const [view, setView] = useState(() => {
    const now = new Date();
    return { y: now.getFullYear(), m: now.getMonth() };
  });
  const [selected, setSelected] = useState("");
  const [reason, setReason] = useState("");
  // Inline result of the last action (the dashboard has no toast host).
  const [notice, setNotice] = useState(null);

  const from = `${view.y}-${pad(view.m + 1)}-01`;
  const to = `${view.y}-${pad(view.m + 1)}-${pad(lastDayOf(view.y, view.m))}`;
  const { data, isLoading, isError, isFetching } = useAppointmentSlots(from, to);
  const disable = useDisableAppointmentSlot();
  const enable = useEnableAppointmentSlot();
  const busy = disable.isPending || enable.isPending;

  const days = useMemo(() => Object.fromEntries((data?.days ?? []).map((d) => [d.date, d])), [data]);
  const day = days[selected];
  const today = data?.today;
  const editable = day && !day.closedWeekday && selected >= (today || "");

  const move = (step) => {
    const d = new Date(Date.UTC(view.y, view.m + step, 1));
    setView({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
    setSelected("");
    setNotice(null);
  };

  const run = (mutation, payload, ok, fallback) =>
    mutation.mutate(payload, {
      onSuccess: () => setNotice({ ok: true, text: ok }),
      onError: (err) => setNotice({ ok: false, text: errorText(err, fallback) }),
    });

  const disableDay = () => {
    run(disable, { date: selected, reason }, "Day disabled.", "Could not disable the day.");
    setReason("");
  };
  const disableSlot = (time) =>
    run(disable, { date: selected, time }, "Slot disabled.", "Could not disable the slot.");
  const enableBlock = (blockId, what) =>
    run(enable, blockId, `${what} enabled.`, `Could not enable the ${what.toLowerCase()}.`);

  const startWeekday = new Date(Date.UTC(view.y, view.m, 1)).getUTCDay();
  const total = lastDayOf(view.y, view.m);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
      {/* Calendar */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => move(-1)} aria-label="Previous month">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => move(1)} aria-label="Next month">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <p className="ml-1 font-medium">
            {MONTHS[view.m]} {view.y}
          </p>
          {isFetching && <Loader2 className="ml-auto h-4 w-4 animate-spin text-muted-foreground" />}
        </div>

        {isError ? (
          <p className="mt-4 text-sm text-destructive">Could not load slots.</p>
        ) : (
          <div className="mt-3 grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((d) => (
              <span key={d} className="py-1 text-xs font-medium text-muted-foreground">
                {d}
              </span>
            ))}
            {Array.from({ length: startWeekday }, (_, i) => (
              <span key={`b${i}`} />
            ))}
            {Array.from({ length: total }, (_, i) => {
              const date = `${view.y}-${pad(view.m + 1)}-${pad(i + 1)}`;
              const d = days[date];
              const booked = d?.slots.filter((s) => s.status === "booked").length ?? 0;
              const off = !!d?.block;
              const closed = d?.closedWeekday;
              return (
                <button
                  key={date}
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setSelected(date);
                    setNotice(null);
                  }}
                  className={cn(
                    "relative flex h-12 flex-col items-center justify-center rounded-md border text-sm transition-colors",
                    selected === date ? "border-primary ring-2 ring-primary/30" : "border-transparent hover:bg-muted",
                    off && "bg-red-50 text-red-700",
                    closed && "text-muted-foreground/50",
                    date < (today || "") && "text-muted-foreground",
                  )}
                >
                  {i + 1}
                  {booked > 0 && (
                    <span className="mt-0.5 rounded-full bg-blue-100 px-1.5 text-[10px] font-medium leading-4 text-blue-700">
                      {booked}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-red-100" /> Day disabled
          </span>
          <span className="flex items-center gap-1.5">
            <span className="rounded-full bg-blue-100 px-1.5 text-[10px] text-blue-700">2</span> Bookings
          </span>
          <span>Sunday is always closed</span>
        </div>
      </div>

      {/* Selected day */}
      <div className="rounded-xl border bg-card p-4">
        {!day ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Select a date to see and manage its slots.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
              <div>
                <p className="font-medium">{formatDate(day.date)}</p>
                <p className="text-xs text-muted-foreground">
                  {day.closedWeekday
                    ? "Closed (Sunday)"
                    : day.block
                      ? `Whole day disabled${day.block.reason ? `: ${day.block.reason}` : ""}`
                      : `${day.slots.filter((s) => s.status === "available").length} slots open`}
                </p>
              </div>

              {editable &&
                (day.block ? (
                  <Button onClick={() => enableBlock(day.block.id, "Day")} disabled={busy}>
                    Enable whole day
                  </Button>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <Input
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Reason (optional)"
                      className="h-9 w-44"
                    />
                    <Button variant="destructive" onClick={disableDay} disabled={busy}>
                      Disable whole day
                    </Button>
                  </div>
                ))}
            </div>

            {notice && (
              <p
                className={cn(
                  "mt-3 rounded-md px-3 py-2 text-sm",
                  notice.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700",
                )}
              >
                {notice.text}
              </p>
            )}

            <ul className="divide-y">
              {day.slots.map((slot) => (
                <li key={slot.time} className="flex flex-wrap items-center gap-3 py-2.5">
                  <span className="w-20 text-sm font-medium">{slot.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-medium",
                      slotStyles[slot.status],
                    )}
                  >
                    {slotNames[slot.status]}
                  </span>

                  <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
                    {slot.booking && (
                      <Link
                        href={`/appointments/${slot.booking.id}`}
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                      >
                        {slot.booking.name} · {slot.booking.phone}
                      </Link>
                    )}
                    {!slot.booking && slot.block?.reason}
                  </span>

                  {editable && !day.block && slot.status !== "past" && (
                    slot.block ? (
                      <Button size="sm" variant="outline" onClick={() => enableBlock(slot.block.id, "Slot")} disabled={busy}>
                        Enable
                      </Button>
                    ) : slot.status === "available" ? (
                      <Button size="sm" variant="outline" onClick={() => disableSlot(slot.time)} disabled={busy}>
                        Disable
                      </Button>
                    ) : null
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
