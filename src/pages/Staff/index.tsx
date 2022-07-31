import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import { MdModeEdit, MdMoreVert, MdPersonRemove } from "react-icons/md";
import { Table } from "../../components/Table";
import { TableData, TableDataAction } from "../../components/TableData";
import TablePaginator from "../../components/TablePaginator";
import Template from "../../components/Template";
import { IStaff } from "../../types";

const Staff = () => {
  const [selectedStaff, setSelectedStaff] = useState<IStaff>();

  const [staff, setStaff] = useState<IStaff[]>([
    {
      firstName: "Joseph",
      surname: "Harris",
      addressLine: "64 Zoo Lane",
      dob: new Date("17/10/2000"),
      postcode: "NN4 8SW",
    },
  ]);

  const columns: ColumnDef<IStaff>[] = [
    {
      accessorKey: "firstName",
      cell: (info) => info.getValue(),
      header: "First Name",
    },
    {
      accessorKey: "surname",
      cell: (info) => info.getValue(),
      header: "Surname",
    },
    {
      accessorKey: "addressLine",
      cell: (info) => info.getValue(),
      header: "Address Line",
    },
    {
      accessorKey: "postcode",
      cell: (info) => info.getValue(),
      header: "Postcode",
    },
    {
      accessorKey: "dob",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      header: "DOB",
    },
  ];

  const actions: TableDataAction[] = [
    {
      action: "Edit Staff",
      icon: <MdModeEdit />
    },
    {
      action: "Delete Staff",
      icon: <MdPersonRemove />
    },
  ]

  return (
    <TableData
      columns={columns}
      data={staff}
      entityName="Staff"
      onRowSelected={(r) => setSelectedStaff(r)}
      actions={actions}
    />
  );
};

export default Staff;
