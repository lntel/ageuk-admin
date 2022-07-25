import { Table } from "@tanstack/react-table";
import { FC } from "react";
import "./index.scss";

import Paginator from "../Paginator";

export interface PaginatorProps {
  table: Table<any>;
  className?: string;
}

const TablePaginator: FC<PaginatorProps> = ({ table, className }) => {
  return (
    <Paginator
      className={className}
      totalPages={table.getPageCount()}
      currentPage={table.getState().pagination.pageIndex + 1}
      onBack={() => table.previousPage()}
      onForward={() => table.nextPage()}
    />
  );
};

export default TablePaginator;
