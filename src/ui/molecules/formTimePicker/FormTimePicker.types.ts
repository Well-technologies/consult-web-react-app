import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormReturn,
  UseFormSetValue,
} from "react-hook-form";

import { TimePickerProps } from "@/ui/atoms/timePicker/TimePicker.types";

export type FormTimePickerProps<IFormInput extends FieldValues> =
  TimePickerProps & {
    control: UseFormReturn<IFormInput>["control"];
    register?: UseFormRegister<IFormInput>;
    setValue: UseFormSetValue<IFormInput>;
    name: Path<IFormInput>;
    label?: string;
    containerClassName?: string;
    error?: boolean;
    helperText?: string;
  };
