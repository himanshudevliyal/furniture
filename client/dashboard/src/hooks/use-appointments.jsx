import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteAppointment,
  disableAppointmentSlot,
  enableAppointmentSlot,
  fetchAppointment,
  fetchAppointments,
  fetchAppointmentSlots,
  updateAppointmentStatus,
} from "@/services/appointment-service";

export const useAppointments = (searchParams = "") =>
  useQuery({
    queryKey: ["appointments", searchParams],
    queryFn: () => fetchAppointments(searchParams),
  });

export const useAppointment = (id) =>
  useQuery({
    queryKey: ["appointments", id],
    queryFn: () => fetchAppointment(id),
    enabled: !!id,
  });

export const useAppointmentSlots = (from, to) =>
  useQuery({
    queryKey: ["appointment-slots", from, to],
    queryFn: () => fetchAppointmentSlots(from, to),
    enabled: !!from && !!to,
  });

// Any change to bookings or blocks refreshes both the list and the slot grid.
const useRefresh = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["appointments"] });
    queryClient.invalidateQueries({ queryKey: ["appointment-slots"] });
  };
};

export const useUpdateAppointmentStatus = (callback) => {
  const refresh = useRefresh();
  return useMutation({
    mutationFn: ({ id, status }) => updateAppointmentStatus(id, status),
    onSuccess: () => {
      refresh();
      callback?.();
    },
  });
};

export const useDeleteAppointment = (id, callback) => {
  const refresh = useRefresh();
  return useMutation({
    mutationKey: ["appointments", id],
    mutationFn: () => deleteAppointment(id),
    onSuccess: () => {
      refresh();
      callback?.();
    },
  });
};

export const useDisableAppointmentSlot = () => {
  const refresh = useRefresh();
  return useMutation({ mutationFn: disableAppointmentSlot, onSuccess: refresh });
};

export const useEnableAppointmentSlot = () => {
  const refresh = useRefresh();
  return useMutation({ mutationFn: enableAppointmentSlot, onSuccess: refresh });
};
