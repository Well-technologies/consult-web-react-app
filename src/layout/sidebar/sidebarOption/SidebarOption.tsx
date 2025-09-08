import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { NavBarOptionType, NavigationOption } from "../Sidebar.types";

export const SidebarOption = ({
  name,
  icon,
  navigateTo,
  type,
  subRoutes,
}: NavigationOption) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const navigate = useNavigate();

  const onOpenSubmenu = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  const isSelectedSidebarOption = location.pathname.includes(navigateTo);

  if (type === NavBarOptionType.Route) {
    return (
      <li id={`${name}-${type}`}>
        <button
          onClick={() => navigate(navigateTo)}
          className={clsx(
            "group flex w-full text-sm md:text-base cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
            isSelectedSidebarOption ? "bg-gray-100" : ""
          )}
        >
          {icon}
          <span className="ms-3">{name}</span>
        </button>
      </li>
    );
  }
  if (type === NavBarOptionType.SubRoute) {
    return (
      <li id={`${name}-${type}`}>
        <button
          onClick={() => navigate(navigateTo)}
          className={clsx(
            "group flex w-full text-sm md:text-base cursor-pointer items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
            isSelectedSidebarOption ? "bg-gray-100" : ""
          )}
        >
          {name}
        </button>
      </li>
    );
  }
  if (type === NavBarOptionType.Menu) {
    return (
      <li id={`${name}-${type}`}>
        <button
          type="button"
          className={clsx(
            "group flex w-full text-sm md:text-base cursor-pointer items-center rounded-lg p-2 text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
            isSelectedSidebarOption ? "bg-gray-100" : ""
          )}
          onClick={() => onOpenSubmenu(name)}
        >
          {icon}
          <span className="ms-3 flex-1 text-left whitespace-nowrap rtl:text-right">
            {name}
          </span>
          <svg
            className="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <ul
          id="dropdown-example"
          className={clsx("space-y-2 py-2", openMenu === name ? "" : "hidden")}
        >
          {subRoutes?.map((item) => (
            <SidebarOption {...item} />
          ))}
        </ul>
      </li>
    );
  }
};
