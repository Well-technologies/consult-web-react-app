import 'react-phone-number-input/style.css';
interface PhoneNumberProps {
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    className?: string;
}
declare const PhoneNumber: ({ value, onChange, disabled, className }: PhoneNumberProps) => import("react/jsx-runtime").JSX.Element;
export { PhoneNumber };
