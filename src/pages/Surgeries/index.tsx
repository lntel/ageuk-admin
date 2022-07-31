import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FC, useEffect, useState } from "react";
import { IGpSurgery } from "../../types";
import { MdAddCircle, MdModeEdit, MdPersonRemove } from "react-icons/md";
import { TableData, TableDataAction } from "../../components/TableData";

export interface SurgeryActionsProps {
  onSurgeryCreate: () => void;
}

const SurgeryActions: FC<SurgeryActionsProps> = ({
  onSurgeryCreate: onSurgeryCreate,
}) => {
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
  const [selectedGp, setSelectedGp] = useState<IGpSurgery>();
  const [createVisible, setCreateVisible] = useState<boolean>(false);

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
  ];

  const actions: TableDataAction[] = [
    {
      action: "Edit GP",
      icon: <MdModeEdit />,
    },
    {
      action: "Delete GP",
      icon: <MdPersonRemove />,
    },
  ];

  return (
    <TableData
      columns={columns}
      data={surgeries}
      entityName="GP Surgeries"
      actions={actions}
      onRowSelected={(r) => setSelectedGp(r)}
    />
  );
};

export default Surgeries;
