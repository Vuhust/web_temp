import { useEffect, useState } from "react";

/** True after client mount — use before rendering persisted/local-only state. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
