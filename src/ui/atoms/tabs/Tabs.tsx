import clsx from "clsx";

import { TabsProps } from "./Tabs.types";

export const Tabs = <T extends string | number>({
  tabs,
  activeTab,
  setTab,
  containerClassName,
  variant = 'default',
}: TabsProps<T>) => {
  return (
    <div
      className={clsx(
        "pb-0 flex flex-col ",
        containerClassName || (variant === 'default' ? "border-2 border-gray-100 rounded-lg" : "border-none")
      )}
    >
      <div className={clsx(
        "px-1 pt-1",
        variant === 'default' && "border-0 border-gray-200 rounded-b-lg rounded-t-md dark:border-gray-700"
      )}>
        <div
          className={clsx(
            "flex flex-wrap text-sm font-medium text-center mb-2 items-center",
            variant === 'chips' ? "gap-1.5" : ""
          )}
          role="tablist"
        >
          {tabs.map(
            ({ label, value, isHide }) =>
              !isHide && (
                <button
                  key={`tab-${value}`}
                  onClick={() => setTab(value)}
                  className={clsx(
                    "inline-block transition-all cursor-pointer",
                    variant === 'chips' 
                      ? "px-3 py-1 text-xs rounded-full border lg:border-0 lg:border-b-2 lg:rounded-none lg:rounded-t-lg w-auto lg:w-auto lg:px-4 lg:py-2 lg:text-sm"
                      : "px-4 py-2 text-sm w-full lg:w-auto border-b-2 rounded-t-lg hover:text-primary-600 hover:border-primary",
                    variant === 'chips'
                      ? activeTab === value
                        ? "border-primary bg-primary/10 text-primary lg:bg-transparent lg:border-primary"
                        : "border-gray-200 bg-gray-50 text-gray-600 lg:bg-transparent lg:border-gray-300"
                      : activeTab === value
                        ? "border-primary text-primary"
                        : "border-gray-300 text-gray-600",
                    "dark:hover:text-secondary"
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
          value === activeTab && (
            <div key={value} className="flex-1 overflow-auto">
              {component}
            </div>
          )
      )}
    </div>
  );
};
