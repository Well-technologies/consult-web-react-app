import clsx from "clsx";
import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CalendarIcon } from "@/assets/icons/customIcons/CalendarIcon";
import { ChevronIcon } from "@/assets/icons/customIcons/ChevronIcon";
import { CloseIcon } from "@/assets/icons/customIcons/CloseIcon";
import useOnClickOutside from "@/hooks/useOnClickOutside/useOnClickOutside";

import { DatePickerProps, DatePickerType } from "./DatePicker.types";
import {
  Days,
  generateYearGroups,
  getCalendarClassName,
  getCurrentYearGroup,
} from "./DatePicker.utils";

export default function DatePicker({
  placeholder = "Select Date Range",
  onChange,
  value,
  type = DatePickerType.DateRange,
  disabled,
  isHiddenActions,
  pastOnly,
  futureOnly,
  isTypable,
}: DatePickerProps) {


  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isSelectingMonth, setIsSelectingMonth] = useState(false);
  const [startYearNumber, setStartYearNumber] = useState(0);
  const [isSelectingYear, setIsSelectingYear] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [typedValue, setTypedValue] = useState("");

  const datepickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof value === "object") {
      if (value?.startDate && value?.endDate) {
        setSelectedStartDate(value.startDate);
        setSelectedEndDate(value.endDate);
      }
    } else {
      setSelectedStartDate(value);
      setSelectedEndDate(value);
    }
  }, [value]);

  useEffect(() => {
    setTypedValue(updateInput());
  }, [selectedStartDate, selectedEndDate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (/[^0-9/]/.test(val)) return;

    if (val.length > typedValue.length) {
      if (val.length === 4) {
        val += "/";
      } else if (val.length === 7) {
        val += "/";
      }
    }
    setTypedValue(val);

    // Navigate calendar logic
    const yearMatch = val.match(/^(\d{4})/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1]);
      if (year >= 1900 && year <= 2100) {
        const monthMatch = val.match(/^\d{4}\/(\d{1,2})/);
        const newDate = new Date(currentDate);
        newDate.setFullYear(year);

        if (monthMatch) {
          const month = parseInt(monthMatch[1]) - 1;
          if (month >= 0 && month <= 11) {
            newDate.setMonth(month);
          }
        }
        setCurrentDate(newDate);
      }
    }

    const datePattern = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/;
    const match = val.match(datePattern);
    if (match) {
      const year = parseInt(match[1]);
      const month = parseInt(match[2]) - 1;
      const day = parseInt(match[3]);
      const date = new Date(year, month, day);

      if (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      ) {
        const formattedDate = `${year}/${String(month + 1).padStart(2, "0")}/${String(day).padStart(2, "0")}`;

        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const inputDate = new Date(year, month, day);
        inputDate.setHours(0, 0, 0, 0);

        if (pastOnly && inputDate > now) return;
        if (futureOnly && inputDate < now) return;

        setSelectedStartDate(formattedDate);
        setSelectedEndDate(formattedDate);

        if (isHiddenActions || type === DatePickerType.SingleDate) {
          onChange(formattedDate);
        }
      }
    } else if (val === "") {
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      if (type === DatePickerType.DateRange) {
        onChange({ startDate: "", endDate: "" });
      } else {
        onChange("");
      }
    }
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      const dayString = `${day.getFullYear()}/${String(day.getMonth() + 1).padStart(2, "0")}/${String(day.getDate()).padStart(2, "0")}`;

      const className = getCalendarClassName({
        day,
        dayString,
        selectedEndDate,
        selectedStartDate,
        type,
        pastOnly,
        futureOnly,
      });

      daysArray.push(
        <div
          key={i}
          className={className}
          data-date={dayString}
          onClick={() => handleDayClick(dayString)}
        >
          {i}
        </div>
      );
    }

    return daysArray;
  };

  const renderMonths = () => {
    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(currentDate.getFullYear(), i).toLocaleString("default", {
        month: "long",
      })
    );

    return (
      <div className="grid grid-cols-3 gap-2 px-5 py-2">
        {months.map((month, index) => (
          <div
            key={month}
            className="text-center text-sm font-medium cursor-pointer py-2 rounded-md hover:bg-secondary hover:text-white"
            onClick={() => {
              setCurrentDate(new Date(currentDate.getFullYear(), index));
              setIsSelectingMonth(false);
            }}
          >
            {month}
          </div>
        ))}
      </div>
    );
  };

  const presentYear = new Date().getFullYear();
  const yearGroups = generateYearGroups(presentYear, 12, 1900);

  const currentDateYear = currentDate.getFullYear();
  const yearGroup = getCurrentYearGroup(
    yearGroups,
    currentDateYear - startYearNumber
  );

  const renderYears = useMemo(() => {
    return (
      <div className="grid grid-cols-3 gap-2 px-5 py-2">
        {yearGroup.years.map((year) => (
          <div
            key={year}
            className={clsx(
              "text-center text-sm font-medium cursor-pointer py-2 rounded-md hover:bg-secondary hover:text-white",
              presentYear === year
                ? "bg-secondary-50 dark:bg-secondary-600"
                : ""
            )}
            onClick={() => {
              setCurrentDate(new Date(year, currentDate.getMonth()));
              setIsSelectingYear(false);
              setIsSelectingMonth(true);
              setStartYearNumber(0);
            }}
          >
            {year}
          </div>
        ))}
      </div>
    );
  }, [currentDate, yearGroup]);

  const handleDayClick = (selectedDay: string) => {
    const date = new Date(selectedDay);
    const now = new Date();
    date.setHours(0, 0, 0, 0);
    const todayDate = new Date(now.setHours(0, 0, 0, 0));

    if (pastOnly && date > todayDate) return;
    if (futureOnly && date < todayDate) return;

    if (type === DatePickerType.SingleDate) {
      setSelectedEndDate(selectedDay);
      setSelectedStartDate(selectedDay);
      if (isHiddenActions) handleDayClickApply(selectedDay);
      return;
    }
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(selectedDay);
      setSelectedEndDate(null);
    } else {
      if (new Date(selectedDay) < new Date(selectedStartDate)) {
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(selectedDay);
      } else {
        setSelectedEndDate(selectedDay);
      }
    }
  };
  const handleDayClickApply = (selectedDay: string) => {
    onChange(selectedDay);
    setIsOpen(false);
    setIsSelectingMonth(false);
    setIsSelectingYear(false);
  };

  const updateInput = () => {
    if (type === DatePickerType.SingleDate) {
      return selectedStartDate || "";
    }
    if (selectedStartDate && selectedEndDate) {
      return `${selectedStartDate} → ${selectedEndDate}`;
    } else if (selectedStartDate) {
      return selectedStartDate;
    } else {
      return "";
    }
  };

  const toggleDatepicker = () => {
    setIsOpen(!isOpen);
  };

  const handleApply = () => {
    if (selectedStartDate && selectedEndDate) {
      if (type === DatePickerType.DateRange) {
        onChange({ startDate: selectedStartDate, endDate: selectedEndDate });
      } else if (type === DatePickerType.SingleDate) {
        onChange(selectedStartDate);
      }
      setIsOpen(false);
      setIsSelectingMonth(false);
      setIsSelectingYear(false);
    }
  };

  const handleCancel = () => {
    if (!isHiddenActions) {
      setSelectedStartDate(null);
    }
    setSelectedEndDate(null);
    setIsOpen(false);
    setIsSelectingMonth(false);
    setIsSelectingYear(false);
  };

  const handleClear = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    if (type === DatePickerType.DateRange) {
      onChange({ startDate: "", endDate: "" });
      return;
    }
    onChange("");
  };

  useOnClickOutside(datepickerRef, () => {
    setIsOpen((prev: boolean) => {
      if (prev) {
        handleCancel();
      }
      return prev;
    });
  });

  return (
    <div className="relative" ref={datepickerRef}>
      <div className="relative flex items-center">
        <span className="absolute left-0 pl-5 text-secondary">
          <CalendarIcon />
        </span>

        <input
          id="datepicker"
          type="text"
          placeholder={placeholder}
          className={clsx(
            "w-full rounded-md text-sm text-secondary border border-stroke  py-2.25 pl-[50px] pr-8  outline-none transition focus:border-secondary dark:border-secondary dark:text-secondary dark:focus:border-secondary",
            disabled
              ? "bg-gray-50 opacity-50 cursor-not-allowed"
              : "bg-transparent"
          )}
          value={isTypable ? typedValue : updateInput()}
          onChange={isTypable ? handleInputChange : undefined}
          onClick={toggleDatepicker}
          disabled={disabled}
          readOnly={!isTypable}
        />

        <span className="absolute right-0 h-full py-2 items-center flex cursor-pointer pl-1.5 text-secondary">
          {selectedStartDate && selectedEndDate && !disabled ? (
            <button
              disabled={disabled}
              className="px-1.5 cursor-pointer"
              onClick={handleClear}
            >
              <CloseIcon className={"w-5 h-5 p-0.5"} />
            </button>
          ) : null}
          <span className="w-px h-full inline-block text-white bg-gray-300 text-opacity-0" />
          <button
            type="button"
            disabled={disabled}
            className="px-1.5"
            onClick={toggleDatepicker}
          >
            <ChevronIcon
              className={`transition duration-300 w-6 h-6 rotate-90 p-0.5${
                isOpen ? `transform rotate-90 text-gray-500` : " text-gray-300"
              }`}
            />
          </button>
        </span>
      </div>

      {isOpen && (
        <div
          id="datepicker-container"
          className="shadow-lg md:min-w-[300px] absolute mt-2 rounded-xl border border-stroke bg-white pt-2 dark:border-secondary dark:bg-secondary z-[9999999]"
        >
          <div className="flex items-center justify-between px-5 pt-1">
            <button
              id="prevMonth"
              type="button"
              className={clsx(
                "rounded-full bg-secondary-100 p-1 text-secondary hover:bg-gray-2 dark:text-white dark:hover:bg-secondary",
                isSelectingMonth
                  ? "opacity-30 cursor-not-allowed"
                  : "cursor-pointer"
              )}
              disabled={isSelectingMonth}
              onClick={() => {
                if (isSelectingYear) {
                  const yearGroup = getCurrentYearGroup(
                    yearGroups,
                    currentDateYear - startYearNumber - 12
                  );
                  if (!yearGroup.title) return;
                  setStartYearNumber(startYearNumber + 12);
                  return;
                }
                setCurrentDate(
                  new Date(currentDate.setMonth(currentDate.getMonth() - 1))
                );
              }}
            >
              <ChevronIcon
                className={`transition duration-300 w-6 rotate-180 transform text-secondary`}
              />
            </button>

            <div id="currentMonthYear" className="flex">
              <button
                type="button"
                id="currentMonth"
                className={clsx(
                  "text-sm font-medium text-secondary dark:text-white px-2 py-1 rounded-lg",
                  isSelectingMonth || isSelectingYear
                    ? "hidden"
                    : "cursor-pointer hover:bg-secondary-50 "
                )}
                disabled={isSelectingMonth}
                onClick={() => {
                  setIsSelectingMonth(true);
                  setIsSelectingYear(false);
                }}
              >
                {currentDate.toLocaleString("default", {
                  month: "long",
                })}
              </button>
              <button
                type="button"
                id="currentYear"
                className={clsx(
                  "text-sm font-medium text-secondary dark:text-white px-2 py-1 rounded-lg",
                  isSelectingYear
                    ? "hidden"
                    : "cursor-pointer hover:bg-secondary-50"
                )}
                onClick={() => {
                  setIsSelectingYear(true);
                  setIsSelectingMonth(false);
                }}
              >
                {currentDate.getFullYear()}
              </button>
            </div>

            <button
              id="nextMonth"
              type="button"
              className={clsx(
                "rounded-full bg-secondary-100 p-1 text-secondary hover:bg-gray-2 dark:text-white dark:hover:bg-secondary",
                isSelectingMonth
                  ? "opacity-30 cursor-not-allowed"
                  : "cursor-pointer"
              )}
              disabled={isSelectingMonth}
              onClick={() => {
                if (isSelectingYear) {
                  const yearGroup = getCurrentYearGroup(
                    yearGroups,
                    currentDateYear - startYearNumber + 12
                  );
                  if (!yearGroup.title) return;
                  setStartYearNumber(startYearNumber - 12);
                  return;
                }
                setCurrentDate(
                  new Date(currentDate.setMonth(currentDate.getMonth() + 1))
                );
              }}
            >
              <ChevronIcon
                className={`transition duration-300 w-6 rotate-0 transform text-secondary`}
              />
            </button>
          </div>

          <div className={isSelectingMonth ? "" : "hidden"}>
            {renderMonths()}
          </div>
          <div className={isSelectingYear ? "" : "hidden"}>{renderYears}</div>
          <div className={isSelectingMonth || isSelectingYear ? "hidden" : ""}>
            <div className="my-4 grid grid-cols-7 gap-2 px-5">
              {Days.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-secondary-color"
                >
                  {day}
                </div>
              ))}
            </div>
            <div
              id="days-container"
              className="mt-2 grid grid-cols-7 gap-y-0.5 px-5"
            >
              {renderCalendar()}
            </div>
          </div>

          {!isHiddenActions && (
            <div className="mt-2 flex justify-end space-x-2.5 border-t border-stroke p-2 dark:border-secondary">
              <button
                id="cancelButton"
                type="button"
                className="rounded-md border-2 cursor-pointer border-gray-100 py-2 px-4 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                onClick={handleCancel}
              >
                {t("global.modal.cancel")}
              </button>
              <button
                id="applyButton"
                type="button"
                className="flex gap-2 cursor-pointer items-center justify-center md:justify-start rounded-lg px-4 py-2 bg-primary-600 text-white text-sm"
                onClick={handleApply}
              >
                {t("global.modal.apply")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
