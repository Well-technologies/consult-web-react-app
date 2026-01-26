import clsx from "clsx";

import { ButtonProps } from "./Button.types";

export const Button = ({ variant, disabled, onClick, className, type, children, isFullWidth }: ButtonProps) => {
  return (
              <button
                type={type || "button"}
                disabled={disabled}
                onClick={onClick}
                className={clsx(
                  "cursor-pointer rounded-lg px-5 py-2.5 text-center text-sm font-medium",
                  isFullWidth && "w-full",
                  variant === "primary" && "bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
                  variant === "secondary" && "bg-secondary-600 hover:bg-secondary-700 dark:bg-secondary-600 dark:hover:bg-secondary-700 text-white disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
                  variant === "outline" && "text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 dark:focus:bg-slate-800 dark:active:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none",
                  className
                )}
              >
                {children}
              </button>
  );
};
