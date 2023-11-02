"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";
import InfiniteScrollLoader__ from "./InfiniteScrollLoader.module.css";

export interface IInfiniteScrollLoaderProps {
  loadFunction: () => void;
}

export const InfiniteScrollLoader: FunctionComponent<
  IInfiniteScrollLoaderProps
> = ({ loadFunction }) => {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  const onceCalled = useRef(false);

  useEffect(() => {
    if (!el) {
      return () => {
        /* Noop */
      };
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Timeout is for Safari (delay for boundingRect recalculation)
        setTimeout(() => {
          if (
            !onceCalled.current &&
            entry.isIntersecting &&
            el.getBoundingClientRect().y < window.innerHeight
          ) {
            onceCalled.current = true;

            loadFunction();
          }
        });
      });
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [el, loadFunction, onceCalled]);

  return (
    <div className={InfiniteScrollLoader__.Root}>
      <div ref={setEl} className={InfiniteScrollLoader__.Trigger} />
    </div>
  );
};
