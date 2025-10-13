// utils/date.ts (or wherever your formatDate lives)
export const formatDate = (date: string | Date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(); // or your preferred format
};
