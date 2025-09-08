import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import RightArrowIcon from "@/assets/icons/arrow_down_icon.png";
import WorkAvatarIcon from "@/assets/icons/work_avatar_icon.png";
import { AppRoute } from "@/routing/AppRoute.enum";
import { StoreReducerStateTypes } from "@/store/store.types";
import { allReducerStates } from "@/store/store.utils";
import { Avatar } from "@/ui/atoms/avatar/Avatar";

import { SidebarProps } from "./Sidebar.types";
import { getNavbarOptions } from "./Sidebar.utils";
import { SidebarOption } from "./sidebarOption/SidebarOption";
import { TopBar } from "./topBar/TopBar";

export const Sidebar = ({ children }: SidebarProps) => {
  const { t } = useTranslation();

  // TODO: Need to remove this configuration. This is only Use for Check the UI
  const isEnableSubCompanies = false;
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isOpenOrganizationDetails, setOpenOrganizationDetails] =
    useState(false);
  const { companyLogo, companyName, subCompanies } = useSelector(
    (rootState) =>
      allReducerStates(rootState as StoreReducerStateTypes).user.companyDetails
  );

  const navbarOptions = getNavbarOptions(location.pathname as AppRoute);

  useEffect(() => {
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="">
      <TopBar openSideBar={() => setSidebarOpen(!isSidebarOpen)} />
      <aside
        id="sidebar-multi-level-sidebar"
        className={clsx(
          "fixed top-12 left-0 z-40 h-screen w-64 transition-transform lg:-translate-x-0 border-r-2 border-gray-50",
          isSidebarOpen ? "-translate-x-0" : "-translate-x-full"
        )}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto scrollbar-hide bg-white px-3 pt-3 pb-4 dark:bg-gray-800">
          <div
            className={clsx(
              "w-full relative flex flex-col items-center  py-2 mb-3 gap-2 rounded-lg",
              isEnableSubCompanies
                ? "border-2 border-secondary-50"
                : "bg-secondary-50"
            )}
          >
            {isEnableSubCompanies ? (
              <div
                className="absolute top-2 rounded-full right-2 p-2  bg-secondary-50 cursor-pointer"
                onClick={() => {
                  if (!subCompanies.length) return;
                  setOpenOrganizationDetails(!isOpenOrganizationDetails);
                }}
              >
                <img
                  src={RightArrowIcon}
                  className={clsx(
                    "w-3 aspect-square transition-all duration-300",
                    isOpenOrganizationDetails ? "rotate-180" : "rotate-0"
                  )}
                />
              </div>
            ) : null}

            <Avatar
              className={clsx(
                "w-1/4 md:w-2/5 p-1.5 ",
                isEnableSubCompanies ? "border-0!" : ""
              )}
              imageUrl={companyLogo}
              defaultIcon={WorkAvatarIcon}
            />
            <div className="text-sm md:text-base text-secondary font-semibold">
              {companyName}
            </div>

            {isOpenOrganizationDetails ? (
              <div className="flex w-9/10 flex-wrap flex-row gap-2 py-3 px-2 mb-1 border-t-2 border-secondary-50">
                <div className="px-2 text-xs font-semibold text-start flex flex-row w-full justify-between self-start text-secondary">
                  {t("sidebar.subCompanies")}
                </div>
                {subCompanies.map((item) => (
                  <div className="flex w-full flex-wrap flex-row  items-center gap-2 bg-white rounded-lg py-2 px-4 shadow-lg">
                    <Avatar
                      className="w-6 aspect-square"
                      imageUrl={item.companyLogo}
                      defaultIcon=""
                    />
                    <p className="text-xs text-secondary font-semibold">
                      {item.companyName}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <ul className="space-y-2 font-medium">
            {navbarOptions.map((navbarOption) => (
              <SidebarOption key={navbarOption.name} {...navbarOption} />
            ))}
          </ul>
        </div>
      </aside>
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 z-30 h-full w-full bg-black opacity-20 md:hidden"
          onClick={() => setSidebarOpen(false)} // Close sidebar on overlay click
        ></div>
      )}

      <div className="p-0 sm:p-2 lg:ml-64 lg:p-4 mt-12">{children}</div>
    </div>
  );
};
