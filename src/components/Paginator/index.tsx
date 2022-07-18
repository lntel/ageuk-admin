import { Table } from '@tanstack/react-table';
import classNames from 'classnames'
import React, { FC, useEffect } from 'react'
import './index.scss'

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export interface PaginatorProps {
    table: Table<any>;
    className?: string;
}

const Paginator: FC<PaginatorProps> = ({ table, className }) => {

  return (
    <div className={classNames("paginator-component", className)}>
        <button className="paginator-component__button" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
            <MdChevronLeft />
            <p className="paginator-component__button__text">
                Prev
            </p>
        </button>
        <p className="paginator-component__pages">
            { table.getState().pagination.pageIndex + 1 } of { table.getPageCount() }
        </p>
        <button className="paginator-component__button" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
            <p className="paginator-component__button__text">
                Next
            </p>
            <MdChevronRight />
        </button>
    </div>
  )
}

export default Paginator