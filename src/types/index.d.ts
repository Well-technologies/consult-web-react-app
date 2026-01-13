export type FormValidationMessages<T> = Record<keyof T, Record<string, string>>;
export type Schema<T> = FormValidationMessages<T>;
export declare enum FormType {
    Edit = "Edit",
    Add = "Add",
    View = "View"
}
export declare enum DateFormatOptionType {
    Full = "Full",
    MonthDayYear = "MonthDayYear"
}
