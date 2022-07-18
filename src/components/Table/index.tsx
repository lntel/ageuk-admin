import { flexRender, Table as TanTable } from '@tanstack/react-table'
import classNames from 'classnames';
import React, { FC, useEffect } from 'react'
import './index.scss'

export interface TableProps {
    table: TanTable<any>;
    className?: string;
    maxRows?: number;
}

export const Table: FC<TableProps> = ({ table, className, maxRows = 10 }) => {

    useEffect(() => {
        table.setPageSize(maxRows);

        console.log(`Max rows set to ${maxRows}`)
    }, []);

  return (
    <table className={classNames("table", className)}>
        <thead className="table__header">
        { table.getHeaderGroups().map(headerGroup => 
            <tr key={headerGroup.id}>
            { headerGroup.headers.map(header => 
                <th key={header.id}>
                { header.isPlaceholder 
                ? null 
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                ) }
                </th>  
            ) }
            </tr>  
        ) }
        </thead>
        <tbody>
        { table.getRowModel().rows.map(row => 
            <tr key={row.id}>
            { row.getVisibleCells().map(cell => 
                <td key={cell.id}>
                { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                </td>  
            ) }
            </tr>  
        ) }
        </tbody>
    </table>
  )
}
