import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import "./index.scss";
import React, { FC, ReactElement, useEffect, useState } from "react";
import ActionModal from "../ActionModal";
import { Table } from "../Table";
import TablePaginator from "../TablePaginator";
import Template from "../Template";
import { MdMoreVert } from "react-icons/md";

export interface TableDataAction {
  action: string;
  icon: ReactElement;
  onClicked?: () => void;
}
export interface TableDataProps {
  entityName: string;
  data: any[];
  actions: TableDataAction[];
  columns: ColumnDef<any>[];
  actionComponent?: ReactElement<any>;
  createComponent?: ReactElement<any>;
  onRowSelected: (record: any) => void;
  className?: string;
  children?: any;
}

export const TableData: FC<TableDataProps> = ({
  createComponent,
  actionComponent,
  data,
  columns,
  onRowSelected,
  entityName,
  className,
  actions,
  children
}) => {
  const [rowSelection, setSelectedRow] = useState<RowSelectionState>({});

  useEffect(() => {
    const keys = Object.keys(rowSelection);

    if (!keys.length) return;

    const recordId: number = parseInt(keys[0]);
    const record = data[recordId];

    onRowSelected(record);
  }, [rowSelection]);

  useEffect(() => {
    document.addEventListener("click", handleDeselection);

    return () => {
      document.removeEventListener("click", handleDeselection);
    };
  }, []);

  const handleDeselection = (e: MouseEvent) => {
    if (
      (e.target as HTMLElement).parentElement?.tagName != "TD" &&
      (e.target as HTMLElement).tagName != "svg" &&
      (e.target as HTMLElement).tagName != "path"
    )
      setSelectedRow({});
  };

  const table = useReactTable({
    data,
    columns: [
      ...columns,
      {
        id: "Actions",
        cell: ({ row, cell }) => [
          <MdMoreVert key={cell.id} onClick={(e) => row.toggleSelected()} />,
        ],
      },
    ],
    state: {
      rowSelection,
    },
    onRowSelectionChange: setSelectedRow,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: false,
  });

  return (
    <Template
      header={`Manage ${entityName}`}
      layout="none"
      className={className}
      headerChildren={actionComponent}
    >
      {children}
      <Table table={table} className="table-component__table" maxRows={6} />
      <TablePaginator table={table} className="table-component__paginator" />
      <ActionModal visible={Boolean(Object.keys(rowSelection).length)} actions={actions} />
    </Template>
  );
};
