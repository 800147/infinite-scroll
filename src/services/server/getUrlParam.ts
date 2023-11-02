import { ServerError } from "./ServerError";
import { NextRequest } from "next/server";

export function getUrlParam(
  req: NextRequest,
  paramName: string,
  isRequired: true
): string;
export function getUrlParam(
  req: NextRequest,
  paramName: string,
  isRequired?: false
): string | null;
export function getUrlParam(
  req: NextRequest,
  paramName: string,
  isRequired?: boolean
): string | null {
  const value = req.nextUrl.searchParams.get(paramName);

  if (isRequired && value === null) {
    throw new ServerError(`Parameter «${paramName}» is required`, 400);
  }

  return value;
}
