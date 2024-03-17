import { useEffect, useState } from "react";

export function useDibaunce(value: string, delay: number = 300): string {
  const [debaunce, setDebaunce] = useState(value);

  useEffect(() => {
    const hander = setTimeout(() => setDebaunce(value), delay);
    return () => clearTimeout(hander);
  }, [value, delay]);

  return debaunce;
}
