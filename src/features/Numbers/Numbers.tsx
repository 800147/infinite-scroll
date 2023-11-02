"use client";

import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Numbers__ from "./Numbers.module.css";
import { useRequest } from "@/helpers/hooks/useRequest";
import { numbers_GET } from "@/app/api/numbers/numbers_client";
import { InfiniteScrollLoader } from "@/components/InfiniteScrollLoader/InfiniteScrollLoader";

export const Numbers: FunctionComponent = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [get, numbersData, error] = useRequest(numbers_GET);
  const complete = Boolean(
    numbersData && numbersData.page.number >= numbersData.page.total_pages - 1
  );

  useEffect(() => {
    setNumbers((ns) => [...ns, ...(numbersData?.data ?? [])]);
  }, [numbersData, setNumbers]);

  const loadNext = useCallback(
    () => get((numbersData?.page.number ?? -1) + 1),
    [get, numbersData]
  );

  return (
    <div className={Numbers__.Root}>
      {numbers?.map((number, i) => (
        <p key={i}>{number}</p>
      ))}
      {error && <p>ERROR: {error.message}</p>}
      {!error && !complete && (
        <InfiniteScrollLoader
          key={numbersData?.page.number}
          loadFunction={loadNext}
        />
      )}
    </div>
  );
};
