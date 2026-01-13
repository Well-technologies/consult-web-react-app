import { OptionPosition } from "./CustomSelect.types";
export declare const COLORS: string[];
export declare const DEFAULT_COLOR = "secondary";
export declare const styles: {
    bg: {
        primary: string;
        secondary: string;
        red: string;
    };
    bgHover: {
        primary: string;
        secondary: string;
        red: string;
    };
    ring: {
        primary: string;
        secondary: string;
        red: string;
    };
    borderFocus: {
        primary: string;
        secondary: string;
        red: string;
    };
    text: {
        primary: string;
        secondary: string;
        red: string;
    };
    textHover: {
        primary: string;
        secondary: string;
        red: string;
    };
};
export declare const getStyleFromPosition: (optionPosition: OptionPosition) => {
    menu: string;
    icon: string;
};
