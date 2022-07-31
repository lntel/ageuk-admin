import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  RowSelectionState,
} from "@tanstack/react-table";
import { FC, useEffect, useRef, useState } from "react";
import "./index.scss";
import { Table } from "../../components/Table";
import Template from "../../components/Template";
import { IGpSurgery, Patient } from "../../types";
import TablePaginator from "../../components/TablePaginator";
import { MdAddCircle, MdMoreVert } from "react-icons/md";
import ActionModal from "../../components/ActionModal";
import SurgeryCreate from "../../components/SurgeryCreate";

export interface SurgeryActionsProps {
  onSurgeryCreate: () => void;
}

const SurgeryActions: FC<SurgeryActionsProps> = ({ onSurgeryCreate: onSurgeryCreate }) => {
  return (
    <button
      className="patient-component__new"
      onClick={() => onSurgeryCreate()}
    >
      <MdAddCircle />
      Add New Surgery
    </button>
  );
};

const Surgeries = () => {
  const [rowSelection, setSelectedRow] = useState<RowSelectionState>({});
  const [createVisible, setCreateVisible] = useState<boolean>(false);

  useEffect(() => {
    
    document.addEventListener('click', handleDeselection);

    return () => {
      document.removeEventListener('click', handleDeselection);
    }

  }, [])

  useEffect(() => {
    console.log(rowSelection)
  }, [rowSelection])

  // This handles deselection of the action modal with a global click event listener
  const handleDeselection = (e: MouseEvent) => {
    if((e.target as HTMLElement).parentElement?.tagName != "TD" && (e.target as HTMLElement).tagName != "svg" && (e.target as HTMLElement).tagName != "path")
      setSelectedRow({});
  }

  const [surgeries, setSurgeries] = useState<IGpSurgery[]>([
    {
      id: 2, 
      surgeryName: "Whitfields Surgery",
      phoneNumber: "01604760171",
      address: "Hunsbury Hill Rd, Camp Hill, Northampton NN4 9UW",
    },
    {
      id: 5, 
      surgeryName: "St Luke's Primary Care Centre",
      phoneNumber: "01604751832",
      address: "Hunsbury Hill Rd, Camp Hill, Northampton NN4 9UW",
    },
    {
      id: 6, 
      surgeryName: "The Mounts Medical Centre",
      phoneNumber: "01604632117",
      address: "Hunsbury Hill Rd, Camp Hill, Northampton NN4 9UW",
    },
  ]);

  // TODO query if NHS number is used as a search term

  const columns: ColumnDef<IGpSurgery>[] = [
    {
      accessorKey: "surgeryName",
      cell: (info) => info.getValue(),
      header: "Surgery Name",
    },
    {
      accessorKey: "phoneNumber",
      cell: (info) => info.getValue(),
      header: "Telephone Number",
    },
    {
      accessorKey: "address",
      cell: (info) => info.getValue(),
      header: "Address",
    },
    {
      id: "Actions",
      cell: ({ row, cell }) => [
        <MdMoreVert
          key={cell.id}
          onClick={(e) => row.toggleSelected()}
        />,
      ],
    },
  ];

  const table = useReactTable({
    data: surgeries,
    columns,
    state: {
      rowSelection
    },
    onRowSelectionChange: setSelectedRow,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: false
  });

  return (
    <Template
      header="Manage GP Surgeries"
      layout="none"
      className="patient-component"
      headerChildren={
        <SurgeryActions
          onSurgeryCreate={() => setCreateVisible(!createVisible)}
        />
      }
    >
      <SurgeryCreate visible={createVisible} />
      <Table table={table} className="patient-component__table" maxRows={6} />
      <TablePaginator table={table} className="patient-component__paginator" />
      <ActionModal visible={Boolean(Object.keys(rowSelection).length)} />
    </Template>
  );
};

export default Surgeries;
