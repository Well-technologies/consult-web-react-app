import { useTranslation } from "react-i18next";

import FlashLogo from "@/assets/logo.png";

import { TopBarProps } from "./TopBar.types";
import { TopBarActions } from "./topBarActions/TopBarActions";

export const TopBar = ({ openSideBar }: TopBarProps) => {
  const { t } = useTranslation();

  return (
    <div className="fixed top-0 flex w-full flex-row h-12 justify-between border-secondary-50 border-b-2 py-2 px-2 md:px-4 bg-white dark:bg-secondary-800 z-999">
      <button
        type="button"
        onClick={() => openSideBar()}
        className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <span className="sr-only">{t("sidebar.openSideBar.srOnly")}</span>
        <svg
          className="w-6 aspect-square"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <div className="flex gap-1 md:gap-2 items-center text-sm md:text-lg font-semibold text-secondary dark:text-white">
        <img className="md:mr-2 h-6" src={FlashLogo} alt="logo" />
        {t("application.name")}
      </div>
      <TopBarActions />
    </div>
  );
};
