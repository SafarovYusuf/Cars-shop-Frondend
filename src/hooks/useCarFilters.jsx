import { useState } from "react";

export function useCarFilters(initial = {}) {
  const [search, setSearch] = useState(initial.search || "");
  const [color, setColor] = useState(initial.color || "");
  const [year, setYear] = useState(initial.year || "");
  const [sort, setSort] = useState(initial.sort || "newest");

  return {
    filters: { search, color, year, sort },
    search,
    setSearch,
    color,
    setColor,
    year,
    setYear,
    sort,
    setSort,
  };
}
