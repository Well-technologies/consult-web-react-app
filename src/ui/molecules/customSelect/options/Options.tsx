import clsx from "clsx";
import React, { useCallback, useContext, useMemo } from "react";

import { SelectContext } from "@/hooks/useSelectContext/selectContext";
import { Option } from "@/ui/atoms/select/Select.types";

import { MultiOptions, OptionsProps } from "../CustomSelect.types";
import { DEFAULT_COLOR } from "../CustomSelect.utils";
import { DisabledItem, GroupItem, Item } from "../item/Item";

export const Options: React.FC<OptionsProps> = ({
  list,
  noOptionsMessage,
  text,
  isMultiple,
  value,
  primaryColor,
}) => {
  const { classNames } = useContext(SelectContext);
  const filterByText = useCallback(() => {
    const filterItem = (item: Option) => {
      return item.label.toLowerCase().indexOf(text.toLowerCase()) > -1;
    };

    let result = list.map((item) => {
      if ("options" in item) {
        return {
          label: item.label,
          options: item.options.filter(filterItem),
        };
      }
      return item;
    });

    result = result.filter((item) => {
      if ("options" in item) {
        return item.options.length > 0;
      }
      return filterItem(item);
    });

    return result;
  }, [text, list]);

  const removeValues = useCallback(
    (array: MultiOptions) => {
      if (!isMultiple) {
        return array;
      }

      if (Array.isArray(value)) {
        const valueId = value.map((item) => item.value);

        const filterItem = (item: Option) => !valueId.includes(item.value);

        let newArray = array.map((item) => {
          if ("options" in item) {
            return {
              label: item.label,
              options: item.options.filter(filterItem),
            };
          }
          return item;
        });

        newArray = newArray.filter((item) => {
          if ("options" in item) {
            return item.options.length > 0;
          } else {
            return filterItem(item);
          }
        });

        return newArray;
      }
      return array;
    },
    [isMultiple, value]
  );

  const filterResult = useMemo(() => {
    return removeValues(filterByText());
  }, [filterByText, removeValues]);

  return (
    <div
      role="options"
      className={
        classNames && classNames.list
          ? classNames.list
          : "max-h-72 overflow-y-auto scrollbar-hide"
      }
    >
      {filterResult.map((item, index) => (
        <React.Fragment key={index}>
          {"options" in item ? (
            <>
              <div
                className={clsx(
                  "px-2.5",
                  classNames?.listItemClassName
                    ? classNames.listItemClassName
                    : ""
                )}
              >
                <GroupItem
                  primaryColor={primaryColor || DEFAULT_COLOR}
                  item={item}
                />
              </div>

              {index + 1 < filterResult.length && <hr className="my-1" />}
            </>
          ) : (
            <div
              className={clsx(
                "px-2.5",
                classNames?.listItemClassName
                  ? classNames.listItemClassName
                  : ""
              )}
            >
              <Item primaryColor={primaryColor || DEFAULT_COLOR} item={item} />
            </div>
          )}
        </React.Fragment>
      ))}

      {filterResult.length === 0 && (
        <DisabledItem>{noOptionsMessage}</DisabledItem>
      )}
    </div>
  );
};
