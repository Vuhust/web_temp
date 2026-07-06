import { useState, useMemo } from "react";

export function usePagination(totalItems: number, pageSize = 12) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const pagination = useMemo(
    () => ({
      page,
      pageSize,
      totalPages,
      totalItems,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      setPage,
      nextPage: () => setPage((p) => Math.min(p + 1, totalPages)),
      prevPage: () => setPage((p) => Math.max(p - 1, 1)),
    }),
    [page, pageSize, totalPages, totalItems]
  );

  return pagination;
}
