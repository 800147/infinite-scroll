import { useCallback, useState } from "react";

type useRequestFunction<Q extends unknown[], P> = (...props: Q) => Promise<P>;

type useRequestResult<Q extends unknown[], P> = [
  (...props: Q) => void,
  P | null | undefined,
  Error | null | undefined,
  boolean
];

interface IState<T> {
  data: T | null | undefined;
  error: Error | null | undefined;
  loading: boolean;
}

/**
 * @returns [request, data, error, loading]
 */
export const useRequest = <Q extends unknown[], P>(
  requestFunction: useRequestFunction<Q, P>
): useRequestResult<Q, P> => {
  const [{ data, error, loading }, setState] = useState<IState<P>>({
    data: undefined,
    error: undefined,
    loading: false,
  });

  const request = useCallback(
    (...props: Q) => {
      setState((state) => ({ ...state, loading: false }));

      void requestFunction(...props)
        .then((data) =>
          setState({
            data,
            error: null,
            loading: false,
          })
        )
        .catch((error: Error) =>
          setState({
            data: null,
            error,
            loading: false,
          })
        );
    },
    [requestFunction, setState]
  );

  return [request, data, error, loading];
};
