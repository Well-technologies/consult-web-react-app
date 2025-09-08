import * as React from "react";

import { cn } from "@/lib/utils";

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.InputHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "border-input bg-background text-secondary ring-offset-background placeholder:text-secondary-300 flex w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        className,
        props.disabled ? "bg-gray-50" : ""
      )}
      ref={ref}
      {...props}
    />
  );
});
TextArea.displayName = "TextArea";

export { TextArea };
