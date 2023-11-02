import { ServerError } from "./ServerError";
import type { ServerResult } from "@/types/ServerResult";

export const res = <T = unknown>(body: ServerResult<T>, status?: number) =>
  new Response(JSON.stringify(body), {
    status: status ?? body.error?.code ?? 200,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });

export const toServerError = (error: unknown) => {
  if (error instanceof ServerError) {
    return { code: error.status, message: error.message };
  }

  if (error instanceof Error) {
    return { code: 500, message: error.message ?? "Server error" };
  }

  return { code: 500, message: "Server error" };
};
