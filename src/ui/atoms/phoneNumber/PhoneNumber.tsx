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
      value={value || ''}
      className={cn(
              "border-input text-secondary bg-background ring-offset-background placeholder:text-secondary-300 flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
              className,
              disabled ? "bg-gray-50" : ""
            )}/>
  )
};

export { PhoneNumber};
