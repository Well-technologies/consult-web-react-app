import { CommonOptions } from "@/api/index.types";
import { UseFormRegister, UseFormSetValue, Control } from "react-hook-form";

export type ConsultationsFiltersProps = {
  openFilter: boolean;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  control: Control<any>;
  myPatients: any[];
  myPatientsOptions: CommonOptions[];
  // from_date: string;
  // to_date: string;
};
