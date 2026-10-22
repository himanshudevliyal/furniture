import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteJobApplication,
  fetchJobApplication,
  fetchJobApplications,
  updateJobApplicationStatus,
} from "@/services/job-application-service";

export const useJobApplications = (searchParams = "") => {
  return useQuery({
    queryKey: ["job-applications", searchParams],
    queryFn: () => fetchJobApplications(searchParams),
  });
};

export const useJobApplication = (id) => {
  return useQuery({
    queryKey: ["job-applications", id],
    queryFn: () => fetchJobApplication(id),
    enabled: !!id,
  });
};

export const useUpdateJobApplicationStatus = (id, callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["job-applications", id],
    mutationFn: (status) => updateJobApplicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      callback?.();
    },
  });
};

export const useDeleteJobApplication = (id, callback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["job-applications", id],
    mutationFn: () => deleteJobApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      callback?.();
    },
  });
};
