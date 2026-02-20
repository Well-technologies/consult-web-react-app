import * as React from "react";

import { SearchIcon } from "@/assets/icons/customIcons/SearchIcon";
import { cn } from "@/lib/utils";

import { InputProps } from "./Input.types";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, search, ...props }, ref) => {
    return (
      <div className="relative">
        {search && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-4 h-4 text-gray-400" />
          </div>
        )}

        <input
          type={type}
          className={cn(
            "border-input text-secondary bg-background ring-offset-background placeholder:text-secondary-300 flex h-10 w-full rounded-md border pl-10 pr-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className,
            props.disabled ? "bg-gray-50" : ""
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
