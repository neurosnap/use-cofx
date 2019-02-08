import { useState, useEffect, useCallback } from 'react';
import { task } from 'cofx';

export type AsyncState<T> =
  | {
      loading: true;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

export default function useCofx<T>(
  fn: (...args: any[]) => any,
  ...args: any[]
) {
  const [state, set] = useState<AsyncState<T>>({
    loading: true,
  });
  const memoized = useCallback(fn, args);

  useEffect(() => {
    let mounted = true;
    set({
      loading: true,
    });
    const promise = memoized();

    const onResolve = (value: T) => {
      if (!mounted) {
        return;
      }

      set({
        loading: false,
        value,
      });
    };

    const onReject = (error: Error) => {
      if (!mounted) {
        return;
      }

      set({
        loading: false,
        error,
      });
    };

    task(promise).then(onResolve, onReject);

    return () => {
      mounted = false;
    };
  }, [memoized]);

  return state;
}
