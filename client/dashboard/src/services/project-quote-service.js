import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";

export const fetchProjectQuotes = async (searchParams) => {
  const { data } = await http().get(
    `${endpoints.projectQuotes.getAll}?${searchParams}`,
  );

  return data;
};

export const fetchProjectQuote = async (id) => {
  const { data } = await http().get(
    `${endpoints.projectQuotes.getAll}/${id}`,
  );

  return data;
};

export const updateProjectQuoteStatus = async (id, status) => {
  return await http().put(
    `${endpoints.projectQuotes.getAll}/${id}/status`,
    { status },
  );
};

export const deleteProjectQuote = async (id) => {
  return await http().delete(`${endpoints.projectQuotes.getAll}/${id}`);
};

export const updateProjectQuote = async (id, data) => {
  return await http().put(`${endpoints.projectQuotes.getAll}/${id}`, data);
};
