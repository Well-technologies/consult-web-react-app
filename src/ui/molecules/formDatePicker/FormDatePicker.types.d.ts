import { ReactNode } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { DatePickerProps } from "@/ui/atoms/datePicker/DatePicker.types";
export type FormDatePickerProps = Omit<DatePickerProps, "onChange"> & {
    id: string;
    startedDateName: string;
    endedDateName: string;
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    containerClassName?: string;
    helperText?: string;
    label?: ReactNode;
    error?: boolean;
    required?: boolean;
};
