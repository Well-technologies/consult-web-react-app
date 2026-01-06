export type ButtonProps = {
  title?: string;
  variant: "primary" | "secondary" | "outline";
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  imageUrl?: string;
  defaultIcon?: string;
  children?: React.ReactNode;
  isFullWidth?: boolean;
}
