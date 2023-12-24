import { format } from "date-fns";

export const formatDate = (date: Date | string) =>
  typeof date === "string"
    ? format(new Date(date), "yyyy-MM-dd")
    : format(date, "yyyy-MM-dd");
