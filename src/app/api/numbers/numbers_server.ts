import { ServerError } from "@/services/server/ServerError";
import { getUrlParam } from "@/services/server/getUrlParam";
import { res, toServerError } from "@/services/server/res";
import { NextRequest } from "next/server";

const SIZE = 20;
const TOTAL_PAGES = 10;

export async function GET(request: NextRequest) {
  try {
    const page = Number(getUrlParam(request, "page", true));

    if (
      (Number.isNaN(page) || Math.floor(page) !== page, page < 0) ||
      page >= TOTAL_PAGES
    ) {
      throw new ServerError("Bad «page» parameter", 400);
    }

    await new Promise((res) => setTimeout(res, 500));

    return res({
      data: {
        page: {
          size: SIZE,
          number: page,
          total_pages: TOTAL_PAGES,
        },
        data: new Array(SIZE).fill(null).map((_v, i) => SIZE * page + i),
      },
    });
  } catch (error) {
    return res({ error: toServerError(error) });
  }
}
