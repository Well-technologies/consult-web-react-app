import clsx from "clsx";
import { Controller } from "react-hook-form";

import { FormLabel } from "@/ui/atoms/formLabel/FormLabel";
import {PhoneNumber} from "@/ui/atoms/phoneNumber/PhoneNumber.tsx";

import { FormInputProps } from "./FormPhoneNumberInput.types";

// import { ReactComponent as CheckMarkCircle } from "@/assets/icons/checkmark-circle.svg?react";

export const FormPhoneNumberInput = ({
  name,
  control,
  helperText,
  label,
  containerClassName,
  error,
  ...props
}: FormInputProps & { control: any }) => {

  return (
    <div className={clsx("flex flex-col", containerClassName)}>
      {label && <FormLabel label={label} {...props} />}
      <Controller
        name={name || 'mobile'}
        control={control}
        render={({ field }) => (
          <PhoneNumber 
            {...props}
            value={field.value} 
            onChange={field.onChange} 
            disabled={props.disabled} 
          />
        )}
      />
      {error && helperText && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {helperText}
        </p>
      )}
    </div>
  );
};
