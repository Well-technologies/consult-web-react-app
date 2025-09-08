import { OptionPosition } from "./CustomSelect.types";

export const COLORS = ["primary", "red", "secondary"];

export const DEFAULT_COLOR = "secondary";

export const styles = {
  bg: {
    primary: "bg-primary-600",
    secondary: "bg-secondary-600",
    red: "bg-red-500",
  },
  bgHover: {
    primary: "hover:bg-primary-100",
    secondary: "hover:bg-secondary-100",
    red: "hover:bg-red-100",
  },
  ring: {
    primary: "focus:ring-primary-500/20",
    secondary: "focus:ring-secondary-500/20",
    red: "focus:ring-red-500/20",
  },
  borderFocus: {
    primary: "focus:border-primary-500",
    secondary: "focus:border-secondary-500",
    red: "focus:border-red-500",
  },
  text: {
    primary: "text-primary-500",
    secondary: "text-secondary-500",
    red: "text-red-500",
  },
  textHover: {
    primary: "hover:text-primary-500",
    secondary: "hover:text-secondary-500",
    red: "hover:text-red-500",
  },
};

export const getStyleFromPosition = (optionPosition: OptionPosition) => {
  switch (optionPosition) {
    case OptionPosition.Top:
      return { menu: "bottom-full mb-1.5", icon: "rotate-270" };

    default:
      return { menu: "mt-1.5", icon: "rotate-90" };
  }
};
