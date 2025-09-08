export type FormValidationMessages<T> = Record<keyof T, Record<string, string>>;

export type Schema<T> = FormValidationMessages<T>;

export enum FormType {
  Edit = "Edit",
  Add = "Add",
  View = "View",
}

export enum DateFormatOptionType {
  Full = "Full",
  MonthDayYear = "MonthDayYear",
}
