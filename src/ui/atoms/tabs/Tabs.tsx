import clsx from "clsx";

import { TabsProps } from "./Tabs.types";

export const Tabs = <T extends string | number>({
  tabs,
  activeTab,
  setTab,
  containerClassName,
}: TabsProps<T>) => {
  return (
    <div
      className={clsx(
        "pb-0 flex flex-col ",
        containerClassName || "border-2 border-gray-100 rounded-lg"
      )}
    >
      <div className="border-0 px-1 pt-1 border-gray-200 rounded-b-lg rounded-t-md dark:border-gray-700">
        <div
          className="flex lg:flex-wrap text-sm font-medium text-center mb-2 items-center"
          role="tablist"
        >
          {tabs.map(
            ({ label, value, isHide }) =>
              !isHide && (
                <button
                  key={`tab-${value}`}
                  onClick={() => setTab(value)}
                  className={clsx(
                    "inline-block px-4 py-2 w-full lg:w-auto border-b-2 rounded-t-lg hover:text-primary-600 hover:border-primary dark:hover:text-secondary cursor-pointer",
                    activeTab === value
                      ? "border-primary  text-primary"
                      : "border-gray-300  text-gray-600"
                  )}
                  type="button"
                  role="tab"
                >
                  {label}
                </button>
              )
          )}
        </div>
      </div>
      {tabs.map(
        ({ value, component }) =>
          value === activeTab && <div key={value}>{component}</div>
      )}
    </div>
  );
};
