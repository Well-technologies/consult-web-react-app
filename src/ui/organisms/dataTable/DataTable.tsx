import {
  RowData,
  TableOptions,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/atoms/table/table";

export const DataTable = <TData extends RowData>({
  columns,
  data,
  enableSorting,
  onRowClick,
  ...props
}: Omit<TableOptions<TData>, "getCoreRowModel"> & { onRowClick?: (i: number) => void; }) => {
  const table = useReactTable<TData>({
    data,
    columns,
    filterFns: {},
    state: {},
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    enableHiding: true,
    ...props,
  });

  return (
    <Table>
      <TableHeader className="bg-gray-50">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        {...{
                          onClick: enableSorting
                            ? header.column.getToggleSortingHandler()
                            : undefined,
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    </>
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row, i) => {
          return (
            <TableRow
              key={row.id}
              className={
                row.getIsSelected()
                  ? "bg-gray-200 hover:bg-gray-200 border-b-gray-300"
                  : ""
              }
              onClick={() => onRowClick?.(i)}
            >
              {row.getVisibleCells().map((cell) => {
                return (
                  <TableCell key={cell.id} className="text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
