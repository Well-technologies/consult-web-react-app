import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { FormSelect } from "@/ui/molecules/formSelect/FormSelect";

import { ConsultationsFiltersProps } from "./ConsultationsFilters.types";

export const ConsultationsFilters = ({
  openFilter,
  control,
  myPatients,
  myPatientsOptions,
}: ConsultationsFiltersProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        "transition-discrete border-gray-100 transition-all ease-in-out duration-300",
        openFilter
          ? "max-h-auto border-b-2 opacity-100"
          : "max-h-0 border-b-0 opacity-0 overflow-hidden"
      )}
    >
      <form
        noValidate
        className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-4"
      >
        {!!myPatients?.length && (
          <FormSelect
            id="patient"
            name="patient"
            isSearchable
            control={control}
            placeholder={t("consultation.filter.field.patient")}
            isClearable
            options={myPatientsOptions}
          />
        )}
      </form>
    </div>
  );
};
