import { cn } from "@/lib/utils";
import { DividerProps } from "./Divider.types";

const Divider = ({
  variant = "centered",
  children,
  className,
}: DividerProps) => {
  if (variant === "simple" && !children) {
    return (
      <hr
        className={cn(
          "border-0 border-t border-border bg-transparent",
          className
        )}
      />
    );
  }

  if (variant === "centered" && children) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <hr className="flex-1 border-0 border-t border-border bg-transparent" />
        <div className="whitespace-nowrap text-sm text-secondary">{children}</div>
        <hr className="flex-1 border-0 border-t border-border bg-transparent" />
      </div>
    );
  }

  if (variant === "end" && children) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div className="whitespace-nowrap text-sm text-secondary">{children}</div>
        <hr className="flex-1 border-0 border-t border-border bg-transparent" />
      </div>
    );
  }

  return null;
};

export { Divider };
