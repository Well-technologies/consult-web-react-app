import { ClassNames, GroupOption, Option } from "../CustomSelect.types";
export interface SelectProviderStore {
    value: Option | Option[] | null;
    handleValueChange: (selected: Option) => void;
    formatGroupLabel: ((data: GroupOption) => JSX.Element) | null;
    formatOptionLabel: ((data: Option) => JSX.Element) | null;
    classNames?: ClassNames;
}
export interface SelectProviderProps {
    value: Option | Option[] | null;
    handleValueChange: (selected: Option) => void;
    children: JSX.Element;
    otherData: {
        formatGroupLabel: ((data: GroupOption) => JSX.Element) | null;
        formatOptionLabel: ((data: Option) => JSX.Element) | null;
        classNames?: ClassNames;
    };
}
