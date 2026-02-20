import clsx from "clsx";
import { Controller, FieldValues } from "react-hook-form";

import { FormLabel } from "@/ui/atoms/formLabel/FormLabel";
import { TimerPicker } from "@/ui/atoms/timePicker/TimePicker";

import { FormTimePickerProps } from "./FormTimePicker.types";

export const FormTimePicker = <IFormInput extends FieldValues = FieldValues>({
  control,
  helperText,
  label,
  name,
  containerClassName,
  error,
  ...props
}: FormTimePickerProps<IFormInput>) => {
  return (
    <div className={clsx("flex flex-col", containerClassName)}>
      {label && <FormLabel label={label} {...props} />}
      <Controller
        name={name}
        control={control}
        render={({ field }) => <TimerPicker {...props} {...field} />}
      />
      {error && helperText && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {helperText}
        </p>
      )}
    </div>
  );
};
