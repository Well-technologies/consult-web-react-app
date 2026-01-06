import * as React from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const OtpInput = React.forwardRef<HTMLInputElement, OtpInputProps>(
  ({ value = "", onChange, disabled = false, className }, ref) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([null, null, null, null]);
    const digits = value.split("").slice(0, 4);

    const handleChange = (index: number, inputValue: string) => {
      const numericValue = inputValue.replace(/\D/g, "");

      if (numericValue.length > 1) {
        return;
      }

      const newDigits = [...digits];
      newDigits[index] = numericValue;

      const newValue = newDigits.join("");
      onChange(newValue);

      if (numericValue && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newDigits = [...digits];

        if (digits[index]) {
          newDigits[index] = "";
        } else if (index > 0) {
          newDigits[index - 1] = "";
          inputRefs.current[index - 1]?.focus();
        }

        onChange(newDigits.join(""));
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text");
      const numericData = pastedData.replace(/\D/g, "").slice(0, 4);

      if (numericData.length > 0) {
        onChange(numericData);
        if (numericData.length === 4) {
          inputRefs.current[3]?.blur();
        } else {
          inputRefs.current[numericData.length]?.focus();
        }
      }
    };

    return (
      <div className={cn("flex gap-2", className)}>
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
              if (index === 0 && ref) {
                if (typeof ref === "function") {
                  ref(el);
                } else {
                  ref.current = el;
                }
              }
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digits[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              "border-input text-secondary bg-background ring-offset-background placeholder:text-secondary-300 h-10 w-10 rounded-md border px-0 py-2 text-center text-sm font-semibold focus-visible:ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
              disabled ? "bg-gray-50" : ""
            )}
          />
        ))}
      </div>
    );
  }
);

OtpInput.displayName = "OtpInput";

export { OtpInput };
