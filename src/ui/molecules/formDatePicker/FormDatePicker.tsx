import clsx from "clsx";

import DatePicker from "@/ui/atoms/datePicker/DatePicker";
import { FormLabel } from "@/ui/atoms/formLabel/FormLabel";

import { FormDatePickerProps } from "./FormDatePicker.types";
import { formatDate, reverseFormatDate, reverseFormatDates } from "./FormDatePicker.utils";

export const FormDatePicker = ({
  register,
  setValue,
  helperText,
  label,
  startedDateName,
  endedDateName,
  containerClassName,
  error,
  value,
  id,
  ...props
}: FormDatePickerProps) => {
  register(startedDateName);
  register(endedDateName);

  return (
    <div
      key={`container-${id}`}
      className={clsx("flex flex-col", containerClassName)}
    >
      {label && <FormLabel label={label} {...props} />}

      <DatePicker
        key={id}
        onChange={(value) => {
          if (typeof value === "object") {
            const { startDate, endDate } = value;
            setValue(startedDateName, formatDate(startDate));
            setValue(endedDateName, formatDate(endDate));
          } else {
            setValue(startedDateName, formatDate(value));
          }
        }}
        value={
          typeof value === "object"
            ? reverseFormatDates(value)
            : reverseFormatDate(value)
        }
        {...props}
      />

      {error && helperText && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {helperText}
        </p>
      )}
    </div>
  );
};
