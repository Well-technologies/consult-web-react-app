import clsx from "clsx";
import * as React from "react";

import { SelectProps } from "./Select.types";

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options }, ref) => {
    return (
      <select
        ref={ref}
        className={clsx(
          "bg-background border border-input text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          className
        )}
        value={options[0].value}
      >
        {options.map((item, index) => (
          <option
            className={item.default ? "text-muted-foreground" : ""}
            key={`${item.value} ${index}`}
            value={item.value}
            selected={item.default}
          >
            {item.label}
          </option>
        ))}
      </select>
    );
  }
);
Select.displayName = "Select";

export { Select };
