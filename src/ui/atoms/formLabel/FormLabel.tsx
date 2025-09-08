import clsx from "clsx";

import { FormLabelProps } from "./FormLabel.types";

export const FormLabel = ({ label, required, className }: FormLabelProps) => {
  return (
    <label
      className={clsx(
        "mb-2 flex items-center text-sm  font-medium text-gray-900 dark:text-white",
        className
      )}
    >
      {label}
      {!required ? (
        <span className="ml-1 block text-xs font-medium text-gray-900 dark:text-white">
          {"(Optional)"}
        </span>
      ) : (
        <span className="ml-0.5 block text-xs font-medium text-primary dark:text-secondary">
          {"*"}
        </span>
      )}
    </label>
  );
};
