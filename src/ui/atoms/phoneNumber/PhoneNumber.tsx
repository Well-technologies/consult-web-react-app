import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { cn } from '@/lib/utils';

interface PhoneNumberProps {
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

const PhoneNumber = ({ value, onChange, disabled, className }: PhoneNumberProps) => {

  return (
    <PhoneInput
      placeholder="Enter phone number"
      disabled={disabled}
      international
      countryCallingCodeEditable={false}
      defaultCountry="LK"
      onChange={(phoneValue) => {
        onChange?.(phoneValue || '')
      }}
      autoFocus
      value={value || ''}
      className={cn(
                "border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm",
                "[&_.PhoneInputInput]:outline-none",
                "[&_.PhoneInputInput]:ring-0",
                "[&_.PhoneInputInput:focus]:outline-none",
                "[&_.PhoneInputInput:focus-visible]:outline-none",
                "[&_.PhoneInputInput:focus-visible]:ring-0",
                className,
              disabled ? "bg-gray-50" : ""
            )}/>
  )
};

export { PhoneNumber};
