import { RowData, TableOptions } from "@tanstack/react-table";
export declare const DataTable: <TData extends RowData>({ columns, data, enableSorting, }: Pick<TableOptions<TData>, "columns" | "data" | "enableSorting">) => import("react/jsx-runtime").JSX.Element;
