import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: boolean) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = window.localStorage.getItem(key);
    return stored === null ? initialValue : stored === "true";
  });

  useEffect(() => {
    window.localStorage.setItem(key, String(value));
  }, [key, value]);

  return [value, setValue] as const;
}
