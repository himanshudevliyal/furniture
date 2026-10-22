import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export const fetchJobApplications = async (searchParams) => {
  const { data } = await http().get(
    `${endpoints.jobApplications.getAll}?${searchParams}`,
  );
  return data;
};

export const fetchJobApplication = async (id) => {
  const { data } = await http().get(`${endpoints.jobApplications.getAll}/${id}`);
  return data;
};

export const updateJobApplicationStatus = async (id, status) => {
  return await http().put(`${endpoints.jobApplications.getAll}/${id}/status`, {
    status,
  });
};

export const deleteJobApplication = async (id) => {
  return await http().delete(`${endpoints.jobApplications.getAll}/${id}`);
};
