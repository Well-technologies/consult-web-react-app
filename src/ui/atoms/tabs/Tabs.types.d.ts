import { ReactNode } from "react";
export type TabType<T> = {
    label: string;
    value: T;
    component: ReactNode;
    submitted?: number;
    isHide?: boolean;
};
export type TabsProps<T> = {
    tabs: TabType<T>[];
    activeTab: T;
    setTab: (tab: T) => void;
    containerClassName?: string;
};
