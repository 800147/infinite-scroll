// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types
export class ServerError extends Error {
  status: number;

  constructor(
    message: string = "Server error",
    status: number = 500,
    options?: ErrorOptions | undefined
  ) {
    super(message, options);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }

    this.name = "ServerError";
    this.status = status;
  }
}
