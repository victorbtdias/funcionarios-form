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

    return 0;
  });
};
