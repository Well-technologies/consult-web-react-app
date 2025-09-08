import { useContext } from "react";

import { SelectProviderStore } from "@/ui/molecules/customSelect/selectProvider/SelectProvider.types";

import { SelectContext } from "./selectContext";

export const useSelectContext = (): SelectProviderStore => {
  return useContext(SelectContext);
};
