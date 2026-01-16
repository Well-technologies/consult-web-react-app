export type DateValueType = { startDate: string; endDate: string };

export enum DatePickerType {
  DateRange = "DateRange",
  SingleDate = "SingleDate",
}

export type DatePickerProps = {
  placeholder?: string;
  onChange: (dates: DateValueType | string) => void;
  value: DateValueType | string;
  type?: DatePickerType;
  disabled?: boolean;
  isHiddenActions?: boolean;
  pastOnly?: boolean;
  futureOnly?: boolean;
};

export type GetCalendarClassNameProps = {
  dayString: string;
  type: DatePickerType;
  selectedStartDate: string | null;
  selectedEndDate: string | null;
  day: Date;
  pastOnly?: boolean;
  futureOnly?: boolean;
};
