import { DatePickerType, GetCalendarClassNameProps } from "./DatePicker.types";

export const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const generateYearGroups = (
  startYear: number,
  groupSize: number,
  minYear: number,
) => {
  const yearGroups = [];

  while (startYear >= minYear) {
    const endYear = startYear;
    const startRangeYear = Math.max(endYear - groupSize + 1, minYear); // Ensure it doesn't go below minYear

    yearGroups.push({
      title: `${startRangeYear} - ${endYear}`,
      years: Array.from(
        { length: endYear - startRangeYear + 1 },
        (_, index) => startRangeYear + index
      ),
    });

    startYear -= groupSize; // Move to the next group
  }

  return yearGroups;
};

export const getCurrentYearGroup = (
  yearGroups: {
    title: string;
    years: number[];
  }[],
  currentYear: number
) => {
  const years = yearGroups.find((item) => item.years.includes(currentYear));

  if (years) {
    return years;
  }
  return {
    title: "",
    years: [],
  };
};

export const getCalendarClassName = ({
  day,
  dayString,
  selectedEndDate,
  selectedStartDate,
  type,
  pastOnly,
  futureOnly,
}: GetCalendarClassNameProps) => {
  const today = new Date().toLocaleDateString("en-US");

  let className =
    "flex items-center justify-center text-sm cursor-pointer w-11 aspect-square rounded-full text-secondary dark:text-secondary hover:z-10 hover:bg-secondary hover:text-white";

  // Today Date
  if (dayString === today) {
    className += "z-5 bg-secondary-50 dark:bg-secondary-600";
  }

  const date = new Date(day);
  const now = new Date();
  
  // Reset time for accurate date comparison
  date.setHours(0, 0, 0, 0);
  const todayDate = new Date(now.setHours(0, 0, 0, 0));

  if (pastOnly && date > todayDate) {
    return "flex items-center justify-center text-sm w-11 aspect-square rounded-full text-gray-300 dark:text-gray-600 cursor-not-allowed pointer-events-none";
  }

  if (futureOnly && date < todayDate) {
    return "flex items-center justify-center text-sm w-11 aspect-square rounded-full text-gray-300 dark:text-gray-600 cursor-not-allowed pointer-events-none";
  }
  if (type === DatePickerType.DateRange) {
    if (selectedStartDate && dayString === selectedStartDate) {
      className +=
        "z-10 bg-secondary text-white dark:text-white rounded-r-none";
    }
    if (selectedEndDate && dayString === selectedEndDate) {
      className +=
        " z-10 bg-secondary text-white dark:text-white rounded-l-none";
    }

    if (
      selectedStartDate &&
      selectedEndDate &&
      new Date(day) > new Date(selectedStartDate) &&
      new Date(day) < new Date(selectedEndDate)
    ) {
      className += " z-10 bg-secondary-100 rounded-none";
    }
  }

  if (type === DatePickerType.SingleDate) {
    if (selectedEndDate && dayString === selectedStartDate) {
      className += " z-10 bg-secondary text-white dark:text-white";
    }
  }
  return className;
};
