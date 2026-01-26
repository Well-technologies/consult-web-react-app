import clsx from "clsx";
import { Controller } from "react-hook-form";

import { FormLabel } from "@/ui/atoms/formLabel/FormLabel";
import { Input } from "@/ui/atoms/input/input";

import { FormInputProps } from "./FormInput.types";
import { useState } from "react";

// import { ReactComponent as CheckMarkCircle } from "@/assets/icons/checkmark-circle.svg?react";

export const FormInput = ({
  register,
  control,
  helperText,
  label,
  name,
  containerClassName,
  error,
  autoComplete,
  options,
  ...props
}: FormInputProps & { control?: any }) => {
  const [value, setValue] = useState("");
  // If control is provided, use Controller pattern
  if (control) {
    return (
      <div className={clsx("flex flex-col", containerClassName)}>
        {label && <FormLabel label={label} {...props} />}
        <Controller
          name={name || ""}
          control={control}
          render={({ field }) => (<>
            <Input {...props} {...field}
              value={value}
              onChange={(e) =>{ setValue(e.target.value); console.log('optoins', options)}} />
            {value && (
              <ul style={{ border: "1px solid #ccc" }}>
                {options?.map((item: any) => (
                  <li
                    key={item}
                    onClick={() => setValue(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </>

          )}

        />
        {error && helperText && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-400">
            {helperText}
          </p>
        )}
      </div>
    );
  }

  // Otherwise use register pattern (legacy)
  return (
    <div className={clsx("flex flex-col", containerClassName)}>
      {label && <FormLabel label={label} {...props} />}
      <Input {...props} {...register?.(name || "")} />
      {error && helperText && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {helperText}
        </p>
      )}
    </div>
  );
};
