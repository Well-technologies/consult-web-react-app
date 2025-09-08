import { ReactNode } from "react";
import { Control } from "react-hook-form";

import { Option } from "../../atoms/select/Select.types";
import {
  CustomSelectProps,
  SelectValue,
} from "../customSelect/CustomSelect.types";

export type FormSelectProps = Omit<
  CustomSelectProps,
  "onChange" | "value" | "options"
> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  boldLabel?: boolean;
  onInputChange?: (value: string) => void;
  onSelect?: (selectValue: SelectValue, prevValue: string) => void;
  containerClassName?: string;
  defaultValue?: string | string[];
  helperText?: string;
  label?: ReactNode;
  name: string;
  required?: boolean;
  error?: boolean;
  success?: boolean;
  options: Option[];
  id?: string;
};
