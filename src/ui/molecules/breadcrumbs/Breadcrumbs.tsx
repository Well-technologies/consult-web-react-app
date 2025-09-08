import clsx from "clsx";
import { useNavigate } from "react-router-dom";

import { BreadcrumbsProps } from "./Breadcrumbs.types";

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex pt-2 pb-0 sm:pt-0 sm:pb-2 pl-1"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="inline-flex items-center">
            <div className="flex items-center">
              {breadcrumb.isSeparator ? (
                <svg
                  className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              ) : null}
              <button
                onClick={() =>
                  breadcrumb.navigateTo && navigate(breadcrumb.navigateTo)
                }
                disabled={!breadcrumb.navigateTo}
                className={clsx(
                  "inline-flex items-center text-sm font-medium ms-1 md:ms-2",
                  breadcrumb.navigateTo
                    ? "text-gray-700 cursor-pointer hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
                    : "text-gray-500"
                )}
              >
                {breadcrumb.icon || null}
                {breadcrumb.name}
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
