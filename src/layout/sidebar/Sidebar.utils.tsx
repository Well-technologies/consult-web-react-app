import clsx from "clsx";

import { AppRoute } from "@/routing/AppRoute.enum";

import { NavBarOptionType, NavigationOption } from "./Sidebar.types";

export const getNavbarOptions = (pathname: AppRoute): NavigationOption[] => {
  return [
    // {
    //   navigateTo: AppRoute.Dashboard,
    //   name: "Dashboard",
    //   type: NavBarOptionType.Route,
    //   icon: (
    //     <svg
    //       className={clsx(
    //         "w-5 aspect-square shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
    //         pathname.includes(AppRoute.Dashboard) ? "text-gray-900" : ""
    //       )}
    //       aria-hidden="true"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="currentColor"
    //       viewBox="0 0 22 21"
    //     >
    //       <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
    //       <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
    //     </svg>
    //   ),
    // },
    // {
    //   navigateTo: "E-commerce",
    //   name: "E-commerce",
    //   type: NavBarOptionType.Menu,
    //   icon: (
    //     <svg
    //       className={clsx(
    //         "w-5 aspect-square shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
    //         pathname.includes(AppRoute.Dashboard) ? "text-gray-900" : ""
    //       )}
    //       aria-hidden="true"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="currentColor"
    //       viewBox="0 0 18 21"
    //     >
    //       <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
    //     </svg>
    //   ),
    //   subRoutes: [
    //     {
    //       navigateTo: "Products",
    //       name: "Products",
    //       type: NavBarOptionType.SubRoute,
    //       icon: null,
    //     },
    //     {
    //       navigateTo: "Billing",
    //       name: "Billing",
    //       type: NavBarOptionType.SubRoute,
    //       icon: null,
    //     },
    //     {
    //       navigateTo: "Invoice",
    //       name: "Invoice",
    //       type: NavBarOptionType.SubRoute,
    //       icon: null,
    //     },
    //   ],
    // },
    {
      navigateTo: AppRoute.Dashboard,
      name: "Dashboard",
      type: NavBarOptionType.Route,
      icon: (
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            "w-5 aspect-square shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            pathname === AppRoute.Dashboard ? "text-gray-900" : ""
          )}
        >
          <path d="M13 2.051V11h8.949c-.47-4.717-4.232-8.479-8.949-8.949zm4.969 17.953c2.189-1.637 3.694-4.14 3.98-7.004h-8.183l4.203 7.004z"></path>
          <path d="M11 12V2.051C5.954 2.555 2 6.824 2 12c0 5.514 4.486 10 10 10a9.93 9.93 0 0 0 4.255-.964s-5.253-8.915-5.254-9.031A.02.02 0 0 0 11 12z"></path>
        </svg>
      ),
    },
    {
      navigateTo: AppRoute.Claim,
      name: "Claim",
      type: NavBarOptionType.Route,
      icon: (
        <svg
          className={clsx(
            "w-5 aspect-square shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            pathname.includes(AppRoute.Claim) ? "text-gray-900" : ""
          )}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
        </svg>
      ),
    },
    {
      navigateTo: AppRoute.Employees,
      name: "Employees",
      type: NavBarOptionType.Route,
      icon: (
        <svg
          className={clsx(
            "w-5 aspect-square shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            pathname.includes(AppRoute.Employees) ? "text-gray-900" : ""
          )}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
        </svg>
      ),
    },
    {
      navigateTo: AppRoute.Billing,
      name: "Billing",
      type: NavBarOptionType.Route,
      icon: (
        <svg
          className={clsx(
            "w-5 aspect-square shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            pathname.includes(AppRoute.Billing) ? "text-gray-900" : ""
          )}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM64 80c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L80 96c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16zm128 72c8.8 0 16 7.2 16 16l0 17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5 .1s0 0 0 0s0 0 0 0c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1l0 17.1c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-17.8c-11.2-2.1-21.7-5.7-30.9-8.9c0 0 0 0 0 0c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5 .8 4.8 1.6 7.1 2.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c13.6 4.6 24.6 8.4 36.3 8.7c9.1 .3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5s0 0 0 0c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7l0-17.3c0-8.8 7.2-16 16-16z" />
        </svg>
      ),
    },
    {
      navigateTo: AppRoute.LeaderBoard,
      name: "LeaderBoard",
      type: NavBarOptionType.Route,
      icon: (
        <svg
          className={clsx(
            "w-5 aspect-square shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            pathname.includes(AppRoute.LeaderBoard) ? "text-gray-900" : ""
          )}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg "
          viewBox="0 0 640 512"
        >
          <path d="M353.8 54.1L330.2 6.3c-3.9-8.3-16.1-8.6-20.4 0L286.2 54.1l-52.3 7.5c-9.3 1.4-13.3 12.9-6.4 19.8l38 37-9 52.1c-1.4 9.3 8.2 16.5 16.8 12.2l46.9-24.8 46.6 24.4c8.6 4.3 18.3-2.9 16.8-12.2l-9-52.1 38-36.6c6.8-6.8 2.9-18.3-6.4-19.8l-52.3-7.5zM256 256c-17.7 0-32 14.3-32 32l0 192c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-192c0-17.7-14.3-32-32-32l-128 0zM32 320c-17.7 0-32 14.3-32 32L0 480c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L32 320zm416 96l0 64c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l-128 0c-17.7 0-32 14.3-32 32z" />
        </svg>
      ),
    },
    {
      navigateTo: AppRoute.ActivityLog,
      name: "Activity Log",
      type: NavBarOptionType.Route,
      icon: (
        <svg
          className={clsx(
            "w-5 aspect-square shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            pathname === AppRoute.ActivityLog ? "text-gray-900" : ""
          )}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
        </svg>
      ),
    },

    // {
    //   navigateTo: AppRoute.Transaction,
    //   name: "Transaction",
    //   type: NavBarOptionType.Route,
    //   icon: (
    //     <svg
    //       className={clsx(
    //         "w-5 aspect-square shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
    //         pathname.includes(AppRoute.Transaction) ? "text-gray-900" : ""
    //       )}
    //       aria-hidden="true"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="currentColor"
    //       viewBox="0 0 18 21"
    //     >
    //       <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
    //     </svg>
    //   ),
    // },
    // {
    //   navigateTo: AppRoute.Support,
    //   name: "Support",
    //   type: NavBarOptionType.Route,
    //   icon: (
    //     <svg
    //       className={clsx(
    //         "w-5 aspect-square shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
    //         pathname.includes(AppRoute.Support) ? "text-gray-900" : ""
    //       )}
    //       aria-hidden="true"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="currentColor"
    //       viewBox="0 0 18 20"
    //     >
    //       <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
    //     </svg>
    //   ),
    // },
  ];
};
