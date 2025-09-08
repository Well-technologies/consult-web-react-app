import clsx from "clsx";

import { FormLabel } from "@/ui/atoms/formLabel/FormLabel";
import { TextArea } from "@/ui/atoms/textArea/TextArea";

import { FormTextAreaProps } from "./FormTextArea.types";

// import { ReactComponent as CheckMarkCircle } from "@/assets/icons/checkmark-circle.svg?react";

export const FormTextArea = ({
  register,
  helperText,
  label,
  name,
  required,
  containerClassName,
  error,
  ...props
}: FormTextAreaProps) => {
  return (
    <div className={clsx("flex flex-col", containerClassName)}>
      {label && <FormLabel label={label} {...props} />}

      <TextArea {...props} {...register(name || "")} />
      {error && helperText && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {helperText}
        </p>
      )}
    </div>
  );
};
