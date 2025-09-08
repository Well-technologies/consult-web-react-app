import clsx from "clsx";
import { omit } from "lodash";
// import { ReactComponent as CheckMarkCircle } from "@/assets/icons/checkmark-circle.svg?react";
import { Controller } from "react-hook-form";

import { FormLabel } from "@/ui/atoms/formLabel/FormLabel";

import { CustomSelect } from "../customSelect/CustomSelect";
import { FormSelectProps } from "./FormSelect.types";
import {
  getFormSelectValues,
  getSelectOptionsFromValue,
} from "./FormSelect.utils";

export const FormSelect = ({
  control,
  helperText,
  label,
  name,
  containerClassName,
  defaultValue,
  error,
  onSelect,
  ...props
}: FormSelectProps) => {
  return (
    <div className={clsx("flex flex-col", containerClassName)}>
      {label && <FormLabel label={label} {...props} />}
      <Controller
        render={({ field: { value, onChange, ...field } }) => (
          <CustomSelect
            {...omit(field, ["ref"])}
            {...props}
            value={getSelectOptionsFromValue(value, props.options)}
            onChange={(selectValue) => {
              onChange(getFormSelectValues(selectValue));
              onSelect && onSelect(selectValue, value);
            }}
          />
        )}
        name={name}
        control={control}
        defaultValue={defaultValue || (props.isMultiple ? [] : "")}
      />
      {error && helperText && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {helperText}
        </p>
      )}
    </div>
  );
};
