import {
  flexRender,
  Table as TanTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { FC, MouseEvent, useEffect, useState } from "react";
import { MdMoreVert } from "react-icons/md";
import ActionModal from "../ActionModal";
import "./index.scss";

export interface TableProps {
  table: TanTable<any>;
  className?: string;
  maxRows?: number;
  onActionClicked?: (x: number, y: number) => void;
}

export const Table: FC<TableProps> = ({
  table,
  className,
  onActionClicked,
  maxRows = 10,
}) => {
  const [actionsVisible, setActionsVisible] = useState<boolean>(false);

  const handleActionClick = (e: MouseEvent<SVGAElement, MouseEvent>) => {
    if (!onActionClicked) return;

    onActionClicked(e.clientX, e.clientY);
  };

  useEffect(() => {
    table.setPageSize(maxRows);

    table.setOptions({
      ...table.options,
      columns: [
        ...table.options.columns,
        {
          id: "Actions",
          cell: (props) => [<MdMoreVert key={props.cell.id} onClick={() => console.log("test")} />],
        },
      ],
    })
    // table = useReactTable({
    //   ...table.options,
    //   columns: [
    //     ...table.options.columns,
    //     {
    //       id: "Actions",
    //       cell: (props) => [<MdMoreVert key={props.cell.id} />],
    //     },
    //   ],
    // });

    console.log(`Max rows set to ${maxRows}`);
  }, []);

  return (
    <>
      <table className={classNames("table", className)}>
        <thead className="table__header">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
