import clsx from "clsx";

import { FormLabel } from "@/ui/atoms/formLabel/FormLabel";
import { Input } from "@/ui/atoms/input/input";

import { FormInputProps } from "./FormInput.types";

// import { ReactComponent as CheckMarkCircle } from "@/assets/icons/checkmark-circle.svg?react";

export const FormInput = ({
  register,
  helperText,
  label,
  name,
  containerClassName,
  error,
  ...props
}: FormInputProps) => {
  return (
    <div className={clsx("flex flex-col", containerClassName)}>
      {label && <FormLabel label={label} {...props} />}
      <Input {...props} {...register(name || "")} />
      {error && helperText && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {helperText}
        </p>
      )}
    </div>
  );
};
