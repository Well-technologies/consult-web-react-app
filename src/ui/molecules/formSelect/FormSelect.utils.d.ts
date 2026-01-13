import { Option } from "../../atoms/select/Select.types";
import { SelectValue } from "../customSelect/CustomSelect.types";
export declare const getFormSelectValues: (value: SelectValue) => any;
export declare const getSelectOptionsFromValue: (value: number | string | string[], options: Option[]) => Option | Option[] | null;
