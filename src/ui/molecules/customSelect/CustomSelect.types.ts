export interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
  isSelected?: boolean;
}

export interface GroupOption {
  label: string;
  options: Option[];
}

export type Options = Array<Option | GroupOption>;

export interface ClassNames {
  menuButton?: (value?: { isDisabled?: boolean }) => string;
  menu?: string;
  tagItem?: (value?: { item?: Option; isDisabled?: boolean }) => string;
  tagItemText?: string;
  tagItemIconContainer?: string;
  tagItemIcon?: string;
  list?: string;
  listGroupLabel?: string;
  listItem?: (value?: { isSelected?: boolean }) => string;
  listDisabledItem?: string;
  ChevronIcon?: (value?: { open?: boolean }) => string;
  searchContainer?: string;
  searchBox?: string;
  searchIcon?: string;
  closeIcon?: string;
  listItemClassName?: string;
  menuClassName?: string;
}

export type SelectValue = Option | Option[] | null;

export interface CustomSelectProps {
  options: Options;
  value: SelectValue;
  onChange: (value: SelectValue) => void;
  onSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isMultiple?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isDividerHidden?: boolean;
  isDisabled?: boolean;
  loading?: boolean;
  menuIsOpen?: boolean;
  searchInputPlaceholder?: string;
  noOptionsMessage?: string;
  primaryColor?: "primary" | "red" | "secondary";
  formatGroupLabel?: ((data: GroupOption) => JSX.Element) | null;
  formatOptionLabel?: ((data: Option) => JSX.Element) | null;
  classNames?: ClassNames;
  optionPosition?: OptionPosition;
}

export enum OptionPosition {
  Bottom = "Bottom",
  Top = "Top",
}

export type MultiOptions = Array<Option | GroupOption>;

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
};

export interface DisabledItemProps {
  children: JSX.Element | string;
}

export interface GroupItemProps {
  item: GroupOption;
  primaryColor: string;
}

export interface ItemProps {
  item: Option;
  primaryColor: string;
}

export interface OptionsProps {
  list: MultiOptions;
  noOptionsMessage: string;
  text: string;
  isMultiple: boolean;
  value: Option | Option[] | null;
  primaryColor: string;
}

export interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export interface SpinnerProps {
  primaryColor: string;
}
