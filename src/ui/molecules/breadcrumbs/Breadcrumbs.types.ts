import { ReactNode } from "react";

import { AppRoute } from "@/routing/AppRoute.enum";

export type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
};

export type Breadcrumb = {
  name: string;
  icon?: ReactNode;
  navigateTo?: AppRoute;
  isSeparator?: boolean;
};
