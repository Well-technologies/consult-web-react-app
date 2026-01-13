import { GetCalendarClassNameProps } from "./DatePicker.types";
export declare const Days: string[];
export declare const generateYearGroups: (startYear: number, groupSize: number, minYear: number) => {
    title: string;
    years: number[];
}[];
export declare const getCurrentYearGroup: (yearGroups: {
    title: string;
    years: number[];
}[], currentYear: number) => {
    title: string;
    years: number[];
};
export declare const getCalendarClassName: ({ day, dayString, selectedEndDate, selectedStartDate, type, }: GetCalendarClassNameProps) => string;
