import { apiFetch } from "@/helpers/apiFetch";

export const numbers_GET = (page: number) =>
  apiFetch<{
    page: {
      size: number;
      number: number;
      total_pages: number;
    };
    data: number[];
  }>(`/api/numbers?page=${page}`);
