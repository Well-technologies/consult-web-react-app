import { createContext } from "react";

import { SelectProviderStore } from "@/ui/molecules/customSelect/selectProvider/SelectProvider.types";

export const SelectContext = createContext<SelectProviderStore>({
  value: null,
  handleValueChange: (selected) => {
    console.debug("selected:", selected);
  },
  formatGroupLabel: null,
  formatOptionLabel: null,
  classNames: undefined,
});
