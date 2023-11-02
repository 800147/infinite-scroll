import { ServerError } from "@/services/server/ServerError";
import type { ServerResult } from "@/types/ServerResult";

export const apiFetch = <T>(
  url: URL | RequestInfo,
  initProp: RequestInit = {}
): Promise<T | undefined> => {
  const init = { ...initProp };

  init.headers = {
    "Content-Type": "application/json",
    ...(init.headers ?? {}),
  };

  return fetch(url, init).then(async (res) => {
    if (!res.ok) {
      throw new Error(await res.text());
    }

    const { data, error } = (await res.json()) as ServerResult<T>;

    if (error) {
      throw new ServerError(error.message, error.code);
    }

    return data;
  });
};
