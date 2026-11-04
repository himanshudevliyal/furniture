export const APPOINTMENT_STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-neutral-200 text-neutral-600",
};

// "2026-11-05" -> "Thu, 05 Nov 2026"
export const formatDate = (date) =>
  date
    ? new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : "-";

// "16:00" -> "4:00 PM"
export const formatTime = (time) => {
  if (!time) return "-";
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};
