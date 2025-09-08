import React, { useMemo } from "react";

import { SelectContext } from "@/hooks/useSelectContext/selectContext";

import { SelectProviderProps } from "./SelectProvider.types";

const SelectProvider: React.FC<SelectProviderProps> = ({
  value,
  handleValueChange,
  otherData,
  children,
}) => {
  const store = useMemo(() => {
    return {
      value,
      handleValueChange,
      formatGroupLabel:
        otherData && typeof otherData.formatGroupLabel === "function"
          ? otherData.formatGroupLabel
          : null,
      formatOptionLabel:
        otherData && typeof otherData.formatOptionLabel === "function"
          ? otherData.formatOptionLabel
          : null,
      classNames: otherData?.classNames || undefined,
    };
  }, [handleValueChange, otherData, value]);

  return (
    <SelectContext.Provider value={store}>{children}</SelectContext.Provider>
  );
};

export default SelectProvider;
