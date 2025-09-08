import { DateValueType } from "@/ui/atoms/datePicker/DatePicker.types";

export const formatDate = (date: string) => {
  if (!date) return;
  const [month, day, year] = date.split("/").map(Number);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

export const reverseFormatDates = (dates: DateValueType): DateValueType => {
  return {
    startDate: reverseFormatDate(dates.startDate),
    endDate: reverseFormatDate(dates.endDate),
  };
};

export const reverseFormatDate = (date: string) => {
  if (!date) return "";
  const [year, month, day] = date.split("-").map(Number);
  return `${month}/${day}/${year}`;
};
