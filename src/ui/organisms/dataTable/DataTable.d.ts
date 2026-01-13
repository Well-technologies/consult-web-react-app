import { RowData, TableOptions } from "@tanstack/react-table";
export declare const DataTable: <TData extends RowData>({ columns, data, enableSorting, onRowClick, ...props }: Omit<TableOptions<TData>, "getCoreRowModel"> & {
    onRowClick?: (i: number) => void;
}) => import("react/jsx-runtime").JSX.Element;
