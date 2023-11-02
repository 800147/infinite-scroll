export type ServerResult<T> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: { code: number; message: string } };
