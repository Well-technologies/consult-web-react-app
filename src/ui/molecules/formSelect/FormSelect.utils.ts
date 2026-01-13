import {isArray} from "lodash";

import { Option } from "../../atoms/select/Select.types";
import { SelectValue } from "../customSelect/CustomSelect.types";

export const getFormSelectValues = (value: SelectValue) => {
  if (isArray(value)) {
    return value?.map((item: Option) => item.value);
  }
  return value?.value;
};

export const getSelectOptionsFromValue = (
  value: number | string | string[],
  options: Option[]
) => {
  if (isArray(value)) {
    return options.filter((item: Option) => value?.includes(String(item.value)));
  }
  return options.find((item) => value === item.value) || null;
};
