import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDebouncedCallback } from "use-debounce";

import LeftArrowIcon from "@/assets/icons/left_arrow_icon.png";
import RightArrowIcon from "@/assets/icons/right_arrow_icon.png";
import { CustomSelect } from "@/ui/molecules/customSelect/CustomSelect";
import {
  OptionPosition,
  SelectValue,
} from "@/ui/molecules/customSelect/CustomSelect.types";
import {
  getFormSelectValues,
  getSelectOptionsFromValue,
} from "@/ui/molecules/formSelect/FormSelect.utils";
import { scroll } from "@/utils/scroll.utils";


import { Input } from "../input/input";
import { PaginationProps } from "./Pagination.types";

export const Pagination = ({
  count,
  page,
  pageSize,
  onChange,
  onPageSizeChange,
}: PaginationProps) => {
  const { t } = useTranslation();

  const [pageNumber, setPageNumber] = useState<string | number>(page);

  const debouncedValue = useDebouncedCallback(async (value) => {
    onChange(value);
    await scroll();
  }, 300);

  const changePage = async (decrease: boolean) => {
    const changedValue = decrease
      ? (pageNumber as number) - 1
      : (pageNumber as number) + 1;
    setPageNumber(changedValue);
    onChange(changedValue);
    await scroll();
  };

  useEffect(() => {
    onChange(page);
    setPageNumber(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, count]);

  const handlePageSizeConversion = (item: SelectValue) => {
    onChange(1);
    setPageNumber(1);
    onPageSizeChange(Number(getFormSelectValues(item)));
  };

  const initOptions = [10, 20, 50, 100];
  const defaultOptions = [
    ...initOptions,
    ...(!initOptions.includes(Number(pageSize)) ? [Number(pageSize)] : []),
  ].sort((a, b) => a - b);

  const options = defaultOptions.map((option) => ({
    value: option.toString(),
    label: option.toString(),
  }));

  return (
    <div className="flex flex-row-reverse items-center">
      <div className="flex flex-nowrap items-center justify-center text-sm py-1 lg:justify-end">
        <button
          className={clsx(
            "cursor-pointer px-1.5 flex items-center transition-all text-secondary hover:text-primary text-sm",
            page <= 1 ? "pointer-events-none text-secondary-400" : ""
          )}
          onClick={() => changePage(true)}
        >
          <img
            className="h-8 w-8 object-contain"
            src={LeftArrowIcon}
            alt={"Left Arrow Icon"}
          />
          {t("pagination.previous")}
        </button>
        <Input
          type="number"
          className="flex w-16 text-sm"
          value={pageNumber}
          max={count}
          min={1}
          onChange={(e: { target: { value: string } }) => {
            const numberValue = parseInt(e.target.value);
            const isPageAvailable = numberValue <= count && numberValue > 0;
            if (isNaN(numberValue) || isPageAvailable) {
              setPageNumber(isNaN(numberValue) ? "" : numberValue);
            }
            if (!isNaN(numberValue) && isPageAvailable) {
              debouncedValue(numberValue);
            }
          }}
        />
        <div className="pr-0.5 pl-1.5 text-secondary text-sm">/</div>
        <p className={"text-secondary text-sm"}>{count}</p>
        <button
          className={clsx(
            "cursor-pointer px-1.5 flex items-center transition-all text-secondary hover:text-primary text-sm",
            page === count ? "pointer-events-none text-secondary-400" : ""
          )}
          onClick={() => changePage(false)}
        >
          {t("pagination.next")}
          <img
            className="h-8 w-8 object-contain"
            src={RightArrowIcon}
            alt={"Right Arrow Icon"}
          />
        </button>
      </div>
      <div className="flex flex-row items-center w-16">
        <CustomSelect
          value={getSelectOptionsFromValue(String(pageSize), options)}
          placeholder=""
          onChange={handlePageSizeConversion}
          options={options}
          classNames={{
            listItemClassName: "px-1!",
          }}
          optionPosition={OptionPosition.Top}
          isDividerHidden
        />
      </div>
      <p className="text-center text-secondary pr-2 text-sm">
        {t("pagination.show")}
      </p>
    </div>
  );
};
