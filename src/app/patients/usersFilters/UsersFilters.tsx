import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { FormInput } from "@/ui/molecules/formInput/FormInput";

import { UsersFiltersProps } from "./UsersFilters.types";

export const UsersFilters = ({
  openFilter,
  searchText,
  setSearchText,
}: UsersFiltersProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        "transition-discrete  border-gray-100 transition-all ease-in-out duration-300",
        openFilter
          ? " max-h-auto border-b-2 opacity-100"
          : " max-h-0 border-b-1 opacity-0"
      )}
    > 
      <form
        noValidate
        className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-4"
      >
        <FormInput
          name="search_text"
          id="searchText"
          type="text"
          className=""
          placeholder={t("user.filter.searchText.placeholder")}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
    </div>
  );
};
