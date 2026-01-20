import clsx from "clsx";
import { useEffect, useState } from "react";

import { AppRoute } from "@/routing/AppRoute.enum";

import { SidebarProps } from "./Sidebar.types";
import { getNavbarOptions } from "./Sidebar.utils";
import { SidebarOption } from "./sidebarOption/SidebarOption";
import { TopBar } from "./topBar/TopBar";

export const Sidebar = ({ children }: SidebarProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
