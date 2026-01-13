import { ReactNode } from "react";
import { AppRoute } from "@/routing/AppRoute.enum";
export declare enum NavBarOptionType {
    Route = "Route",
    Menu = "Menu",
    SubRoute = "SubRoute"
}
export type SidebarProps = {
    children: ReactNode;
};
export type NavigationOption = {
    navigateTo: AppRoute;
    name: string;
    type: NavBarOptionType;
    icon: ReactNode | null;
    subRoutes?: NavigationOption[];
};
