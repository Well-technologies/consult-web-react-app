import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { ChevronIcon } from "@/assets/icons/customIcons/ChevronIcon";
import { CloseIcon } from "@/assets/icons/customIcons/CloseIcon";
import useOnClickOutside from "@/hooks/useOnClickOutside/useOnClickOutside";
import { Input } from "@/ui/atoms/input/input";

import {
  Option,
  Options as ListOption,
  CustomSelectProps,
  OptionPosition,
} from "./CustomSelect.types";
import {
  COLORS,
  DEFAULT_COLOR,
  getStyleFromPosition,
  styles,
} from "./CustomSelect.utils";
import { Options } from "./options/Options";
import SelectProvider from "./selectProvider/SelectProvider";
import { Spinner } from "./spinner/Spinner";

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options = [],
  value = null,
  onChange,
  onSearchInputChange,
  placeholder = "Select...",
  // searchInputPlaceholder = "Search...",
  isMultiple = false,
  isClearable = false,
  isSearchable = false,
  isDisabled = false,
  loading = false,
  menuIsOpen = false,
  noOptionsMessage = "No options found",
  primaryColor = "secondary",
  formatGroupLabel = null,
  formatOptionLabel = null,
  classNames,
  isDividerHidden,
  optionPosition = OptionPosition.Bottom,
}) => {
  const [open, setOpen] = useState<boolean>(menuIsOpen);
  const [list, setList] = useState<ListOption>(options);
  const [inputValue, setInputValue] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const formatItem = (item: Option) => {
      if ("disabled" in item) return item;
      return {
        ...item,
        disabled: false,
      };
    };

    setList(
      options.map((item) => {
        if ("options" in item) {
          return {
            label: item.label,
            options: item.options.map(formatItem),
          };
        } else {
          return formatItem(item);
        }
      })
    );
  }, [options]);

  useEffect(() => {
    if (isSearchable) {
      if (open) {
        searchBoxRef.current?.select();
      } else {
        setInputValue("");
      }
    }
  }, [open, isSearchable]);

  const toggle = useCallback(() => {
    if (!isDisabled) {
      setOpen(!open);
    }
  }, [isDisabled, open]);

  const closeDropDown = useCallback(() => {
    if (open) setOpen(false);
  }, [open]);

  useOnClickOutside(ref, () => {
    closeDropDown();
  });

  const onPressEnterOrSpace = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        return;
      }
      e.preventDefault();
      if ((e.code === "Enter" || e.code === "Space") && !isDisabled) {
        toggle();
      }
    },
    [isDisabled, toggle]
  );

  const handleValueChange = useCallback(
    (selected: Option) => {
      function update() {
        if (!isMultiple && !Array.isArray(value)) {
          closeDropDown();
          onChange(selected);
        }

        if (isMultiple && (Array.isArray(value) || value === null)) {
          onChange(value === null ? [selected] : [...value, selected]);
        }
      }

      if (selected !== value) {
        update();
      }
    },
    [closeDropDown, isMultiple, onChange, value]
  );

  const clearValue = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onChange(null);
    },
    [onChange]
  );

  const removeItem = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, item: Option) => {
      if (isMultiple && Array.isArray(value) && value.length) {
        e.stopPropagation();
        const result = value.filter((current) => item.value !== current.value);
        onChange(result.length ? result : null);
      }
    },
    [isMultiple, onChange, value]
  );

  const getSelectClass = useCallback(() => {
    let ringColor = styles.ring[DEFAULT_COLOR];
    if (COLORS.includes(primaryColor)) {
      ringColor = styles.ring[primaryColor as keyof typeof styles.ring];
    }

    let borderFocus = styles.borderFocus[DEFAULT_COLOR];
    if (COLORS.includes(primaryColor)) {
      borderFocus =
        styles.borderFocus[primaryColor as keyof typeof styles.borderFocus];
    }
    const baseClass =
      "flex text-sm cursor-pointer text-secondary-300 h-10 border border-input rounded transition-all duration-300 focus:outline-none";
    const defaultClass = `${baseClass} ${
      isDisabled
        ? "bg-gray-50"
        : `bg-white hover:border-gray-400 ${borderFocus} focus:ring ${ringColor}`
    }`;

    return classNames && classNames.menuButton
      ? classNames.menuButton({ isDisabled })
      : defaultClass;
  }, [classNames, isDisabled, primaryColor]);

  const getTagItemClass = useCallback(
    (item: Option) => {
      const baseClasses = "bg-gray-200 border rounded-sm flex space-x-1";
      const disabledClass = isDisabled ? "border-gray-500 px-1" : "pl-1";
      return classNames?.tagItem
        ? classNames.tagItem({ item, isDisabled })
        : `${baseClasses} ${disabledClass}`;
    },
    [classNames, isDisabled]
  );

  const { menu, icon } = getStyleFromPosition(optionPosition);

  return (
    <SelectProvider
      otherData={{
        formatGroupLabel,
        formatOptionLabel,
        classNames,
      }}
      value={value}
      handleValueChange={handleValueChange}
    >
      <div className="relative w-full" ref={ref}>
        <div
          aria-expanded={open}
          onKeyDown={onPressEnterOrSpace}
          onClick={toggle}
          className={getSelectClass()}
        >
          <div className="grow pl-2.5 py-2 pr-2 flex flex-wrap gap-1">
            {!isMultiple ? (
              isSearchable ? (
                <Input
                  id="customSelect-searchInput"
                  ref={searchBoxRef}
                  value={inputValue}
                  type="text"
                  disabled={isDisabled}
                  className={clsx(
                    "border-none px-0 h-full focus-visible:ring-0 focus-visible:outline-hidden"
                  )}
                  placeholder={
                    value && !Array.isArray(value) ? value.label : placeholder
                  }
                  onChange={(e) => {
                    if (
                      onSearchInputChange &&
                      typeof onSearchInputChange === "function"
                    ) {
                      onSearchInputChange(e);
                    }
                    if (e.target.value.length > 0 && !open) {
                      toggle();
                    }
                    setInputValue(e.target.value);
                  }}
                />
              ) : (
                <p
                  className={clsx(
                    "truncate cursor-default select-none text-sm",
                    value && !Array.isArray(value)
                      ? "text-secondary"
                      : "text-secondary-300",
                    isDisabled ? "opacity-50" : ""
                  )}
                >
                  {value && !Array.isArray(value) ? value.label : placeholder}
                </p>
              )
            ) : (
              <>
                {value === null && placeholder}

                {Array.isArray(value) &&
                  value.map((item, index) => (
                    <div className={getTagItemClass(item)} key={index}>
                      <p
                        className={
                          classNames?.tagItemText
                            ? classNames.tagItemText
                            : "text-gray-600 truncate cursor-default select-none text-sm"
                        }
                      >
                        {item.label}
                      </p>
                      {!isDisabled && (
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={(e) => removeItem(e, item)}
                          className={
                            classNames?.tagItemIconContainer
                              ? classNames.tagItemIconContainer
                              : "flex items-center px-1 cursor-pointer rounded-r-sm hover:bg-red-200 hover:text-red-600"
                          }
                        >
                          <CloseIcon
                            className={
                              classNames?.tagItemIcon
                                ? classNames.tagItemIcon
                                : "w-3 h-3 mt-0.5"
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
              </>
            )}
          </div>

          <div className="flex flex-none items-center py-1.5">
            {loading && (
              <div className="px-1.5">
                <Spinner primaryColor={primaryColor} />
              </div>
            )}

            {isClearable && !isDisabled && !!value && (
              <div className="px-1.5 cursor-pointer" onClick={clearValue}>
                <CloseIcon
                  className={
                    classNames?.closeIcon
                      ? classNames.closeIcon
                      : "w-5 h-5 p-0.5"
                  }
                />
              </div>
            )}
            {!isDividerHidden && (
              <div className="h-full">
                <span className="w-px h-full inline-block text-white bg-gray-300 text-opacity-0" />
              </div>
            )}

            <div className="px-1.5">
              <ChevronIcon
                className={`transition duration-300 w-6 h-6 rotate-90 p-0.5${
                  open ? `transform ${icon} text-gray-500` : " text-gray-300"
                }`}
              />
            </div>
          </div>
        </div>

        {open && !isDisabled && (
          <div
            className={
              classNames?.menu
                ? classNames.menu
                : clsx(
                    "absolute z-10 w-full bg-white shadow-lg border rounded py-1  text-sm text-gray-700 ",
                    menu
                  )
            }
          >
            <Options
              list={list}
              noOptionsMessage={noOptionsMessage}
              text={inputValue}
              isMultiple={isMultiple}
              value={value}
              primaryColor={primaryColor || DEFAULT_COLOR}
            />
          </div>
        )}
      </div>
    </SelectProvider>
  );
};
