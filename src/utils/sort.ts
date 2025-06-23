export const sortByField = <T>(
  data: T[],
  field: keyof T,
  direction: string
) => {
  return [...data].sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return direction === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    if (typeof valueA === "boolean" && typeof valueB === "boolean") {
      if (valueA === valueB) return 0;
      if (direction === "asc") {
        return valueA ? 1 : -1;
      } else {
        return valueA ? -1 : 1;
      }
    }

    return 0;
  });
};
