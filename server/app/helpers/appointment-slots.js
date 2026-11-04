"use strict";

// Booking slots for the "Book an Appointment" form.
// Mon–Sat, 30-minute slots from 10:00; the last slot starts 16:00 and ends
// 16:30. All dates/times are India time (Asia/Kolkata).

export const SLOT_START = "10:00";
export const SLOT_END = "16:30"; // last slot ends here
export const SLOT_MINUTES = 30;
export const BOOKING_WINDOW_DAYS = 60; // how far ahead visitors can book
export const CLOSED_WEEKDAYS = [0]; // 0 = Sunday

const TIME_ZONE = "Asia/Kolkata";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const toMinutes = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const toTime = (minutes) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

// ["10:00", "10:30", ..., "16:00"]
export const SLOT_TIMES = (() => {
  const times = [];
  for (let m = toMinutes(SLOT_START); m + SLOT_MINUTES <= toMinutes(SLOT_END); m += SLOT_MINUTES) {
    times.push(toTime(m));
  }
  return times;
})();

// "16:00" -> "4:00 PM"
export const timeLabel = (time) => {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

export const isValidDate = (date) =>
  typeof date === "string" &&
  DATE_RE.test(date) &&
  !Number.isNaN(new Date(`${date}T00:00:00Z`).getTime()) &&
  new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;

export const isValidSlotTime = (time) => SLOT_TIMES.includes(time);

export const weekday = (date) => new Date(`${date}T00:00:00Z`).getUTCDay();

export const addDays = (date, days) => {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

// Today's date and the current minute of the day, in India time.
export const nowInIndia = () => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: TIME_ZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  );
  return {
    today: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
};

export const lastBookableDate = () => addDays(nowInIndia().today, BOOKING_WINDOW_DAYS);

// Builds the slot grid for every date in [from, to].
// `blocks`: [{ id, date, time|null, reason }] (time null = whole day off)
// `bookings`: [{ id, name, phone, booking_date, booking_time }]
// `withDetails` adds booking/block info for the admin view.
export const buildAvailability = ({ from, to, blocks, bookings, withDetails = false }) => {
  const { today, minutes: nowMinutes } = nowInIndia();
  const lastDate = lastBookableDate();
  const days = [];

  for (let date = from; date <= to; date = addDays(date, 1)) {
    const dayBlock = blocks.find((b) => b.date === date && !b.time);
    const isClosedWeekday = CLOSED_WEEKDAYS.includes(weekday(date));
    const isPast = date < today;
    const beyondWindow = date > lastDate;

    const slots = SLOT_TIMES.map((time) => {
      const booking = bookings.find((b) => b.booking_date === date && b.booking_time === time);
      const slotBlock = blocks.find((b) => b.date === date && b.time === time);

      let status = "available";
      if (isClosedWeekday) status = "closed";
      else if (isPast || (date === today && toMinutes(time) <= nowMinutes)) status = "past";
      else if (booking) status = "booked";
      else if (dayBlock || slotBlock) status = "blocked";
      else if (beyondWindow) status = "closed";

      const slot = { time, label: timeLabel(time), status };
      if (withDetails) {
        // Show who booked even on past/blocked days.
        if (booking) slot.booking = { id: booking.id, name: booking.name, phone: booking.phone };
        if (slotBlock) slot.block = { id: slotBlock.id, reason: slotBlock.reason };
      }
      return slot;
    });

    const day = {
      date,
      weekday: weekday(date),
      open: !isClosedWeekday && !isPast && !beyondWindow && !dayBlock && slots.some((s) => s.status === "available"),
      slots,
    };
    if (withDetails) {
      day.closedWeekday = isClosedWeekday;
      if (dayBlock) day.block = { id: dayBlock.id, reason: dayBlock.reason };
    }
    days.push(day);
  }

  return days;
};
