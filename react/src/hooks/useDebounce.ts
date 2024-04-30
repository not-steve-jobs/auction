import { useEffect, useState } from "react";

export const useDebounce = (value: any, duration: number) => {
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, duration);

    return () => clearTimeout(handler);
  }, [value, duration]);

  return debounced;
};
