import { useEffect, useState } from "react";

function usePersistedState<T>(
  key: string,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const isBrowser = globalThis.window !== undefined;

  const [state, setState] = useState<T>(() => {
    if (!isBrowser) return defaultValue;

    const persistedState = localStorage.getItem(key);
    return persistedState === null ? defaultValue : JSON.parse(persistedState);
  });

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
