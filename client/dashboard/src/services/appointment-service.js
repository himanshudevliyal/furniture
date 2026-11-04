import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

// API sends { status, data }; return the inner data.
const unwrap = (body) => body?.data ?? body;

export const fetchAppointments = async (searchParams) => {
  const { data } = await http().get(`${endpoints.appointments.getAll}?${searchParams}`);
  return unwrap(data);
};

export const fetchAppointment = async (id) => {
  const { data } = await http().get(`${endpoints.appointments.getAll}/${id}`);
  return unwrap(data);
};

export const updateAppointmentStatus = async (id, status) => {
  return await http().put(`${endpoints.appointments.getAll}/${id}/status`, { status });
};

export const deleteAppointment = async (id) => {
  return await http().delete(`${endpoints.appointments.getAll}/${id}`);
};

// Slot grid with bookings and disabled days/slots for [from, to].
export const fetchAppointmentSlots = async (from, to) => {
  const { data } = await http().get(`${endpoints.appointments.slots}?from=${from}&to=${to}`);
  return unwrap(data);
};

// time empty = disable the whole day
export const disableAppointmentSlot = async ({ date, time, reason }) => {
  return await http().post(endpoints.appointments.slotBlocks, { date, time: time || null, reason });
};

export const enableAppointmentSlot = async (blockId) => {
  return await http().delete(`${endpoints.appointments.slotBlocks}/${blockId}`);
};
