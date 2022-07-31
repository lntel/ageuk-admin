import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react'
import { MdMoreVert } from 'react-icons/md';
import { Table } from '../../components/Table';
import TablePaginator from '../../components/TablePaginator';
import Template from '../../components/Template';
import { IStaff } from '../../types';

const Staff = () => {

    const [staff, setStaff] = useState<IStaff[]>([
        {
            firstName: "Joseph",
            surname: "Harris",
            addressLine: "64 Zoo Lane",
            dob: new Date("17/10/2000"),
            postcode: "NN4 8SW",
        }
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

    const table = useReactTable({
        data: staff,
        columns,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
      });

    return (
        <Template
          header="Manage Staff"
          layout="none">
          <Table table={table} className="patient-component__table" maxRows={6} />
          <TablePaginator table={table} className="patient-component__paginator" />
        </Template>
      );
}

export default Staff