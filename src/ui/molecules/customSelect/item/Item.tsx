import React, { useCallback, useContext, useMemo } from "react";

import { SelectContext } from "@/hooks/useSelectContext/selectContext";
import { useSelectContext } from "@/hooks/useSelectContext/useSelectContext";

import {
  DisabledItemProps,
  GroupItemProps,
  ItemProps,
} from "../CustomSelect.types";
import { COLORS, DEFAULT_COLOR, styles } from "../CustomSelect.utils";

// CustomSelectComponent
export const Item: React.FC<ItemProps> = ({ item, primaryColor }) => {
  const { classNames, value, handleValueChange, formatOptionLabel } =
    useSelectContext();

  const isSelected = useMemo(() => {
    return (
      value !== null && !Array.isArray(value) && value.value === item.value
    );
  }, [item.value, value]);

  const textHoverColor = useMemo(() => {
    if (COLORS.includes(primaryColor)) {
      return styles.textHover[primaryColor as keyof typeof styles.textHover];
    }
    return styles.textHover[DEFAULT_COLOR];
  }, [primaryColor]);

  const bgColor = useMemo(() => {
    if (COLORS.includes(primaryColor)) {
      return styles.bg[primaryColor as keyof typeof styles.bg];
    }
    return styles.bg[DEFAULT_COLOR];
  }, [primaryColor]);

  const bgHoverColor = useMemo(() => {
    if (COLORS.includes(primaryColor)) {
      return styles.bgHover[primaryColor as keyof typeof styles.bgHover];
    }
    return styles.bgHover[DEFAULT_COLOR];
  }, [primaryColor]);

  const getItemClass = useCallback(() => {
    const baseClass =
      "block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded text-sm";
    const selectedClass = isSelected
      ? `text-white ${bgColor}`
      : `text-gray-500 ${bgHoverColor} ${textHoverColor}`;

    return classNames && classNames.listItem
      ? classNames.listItem({ isSelected })
      : `${baseClass} ${selectedClass}`;
  }, [bgColor, bgHoverColor, classNames, isSelected, textHoverColor]);

  return (
    <>
      {formatOptionLabel ? (
        <div onClick={() => handleValueChange(item)}>
          {formatOptionLabel({ ...item, isSelected })}
        </div>
      ) : (
        <>
          {item.disabled ? (
            <DisabledItem>{item.label}</DisabledItem>
          ) : (
            <li
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => {
                if (e.key === " " || e.key === "Enter") {
                  handleValueChange(item);
                }
              }}
              aria-selected={isSelected}
              role={"option"}
              onClick={() => handleValueChange(item)}
              className={getItemClass()}
            >
              {item.label}
            </li>
          )}
        </>
      )}
    </>
  );
};

export const GroupItem: React.FC<GroupItemProps> = ({ item, primaryColor }) => {
  const { classNames, formatGroupLabel } = useSelectContext();

  return (
    <>
      {item.options.length > 0 && (
        <>
          {formatGroupLabel ? (
            <>{formatGroupLabel(item)}</>
          ) : (
            <div
              className={
                classNames?.listGroupLabel
                  ? classNames.listGroupLabel
                  : "pr-2 py-2 cursor-default select-none truncate font-bold text-gray-700"
              }
            >
              {item.label}
            </div>
          )}

          {item.options.map((item, index) => (
            <Item primaryColor={primaryColor} key={index} item={item} />
          ))}
        </>
      )}
    </>
  );
};

export const DisabledItem: React.FC<DisabledItemProps> = ({ children }) => {
  const { classNames } = useContext(SelectContext);
  return (
    <div
      className={
        classNames && classNames.listDisabledItem
          ? classNames.listDisabledItem
          : "px-2 py-2 cursor-not-allowed truncate text-gray-400 select-none"
      }
    >
      {children}
    </div>
  );
};
