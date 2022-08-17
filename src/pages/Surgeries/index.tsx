import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { FC, useContext, useEffect, useState } from "react";
import { IGpSurgery } from "../../types";
import { MdAddCircle, MdModeEdit, MdPersonRemove } from "react-icons/md";
import { TableData, TableDataAction } from "../../components/TableData";
import { get } from "../../helpers/request";
import GpCreate from "../../components/GpCreate";
import "./index.scss";
import { GpContext, GpContextType } from "../../context/GpContext";

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
      Add GP Surgery
    </button>
  );
};

const Surgeries = () => {
  const [selectedGp, setSelectedGp] = useState<IGpSurgery>();
  const [createVisible, setCreateVisible] = useState<boolean>(false);

  const { surgeries, setSurgeries } = useContext(GpContext);

  useEffect(() => {
    getSurgeries();
  }, []);

  const getSurgeries = async () => {
    const request = await get({
      url: "/gp",
    });

    if (request.ok) {
      const data = await request.json();

      setSurgeries(data);
    }
  };

  const handleCreated = async () => {
    setSurgeries([]);

    await getSurgeries();

    setCreateVisible(false);
  };

  // const [surgeries, setSurgeries] = useState<IGpSurgery[]>([
  //   // {
  //   //   id: 2,
  //   //   surgeryName: "Whitfields Surgery",
  //   //   phoneNumber: "01604760171",
  //   //   address: "Hunsbury Hill Rd, Camp Hill, Northampton NN4 9UW",
  //   // },
  //   // {
  //   //   id: 5,
  //   //   surgeryName: "St Luke's Primary Care Centre",
  //   //   phoneNumber: "01604751832",
  //   //   address: "Hunsbury Hill Rd, Camp Hill, Northampton NN4 9UW",
  //   // },
  //   // {
  //   //   id: 6,
  //   //   surgeryName: "The Mounts Medical Centre",
  //   //   phoneNumber: "01604632117",
  //   //   address: "Hunsbury Hill Rd, Camp Hill, Northampton NN4 9UW",
  //   // },
  // ]);

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
      className="gp-component"
      entityName="GP Surgeries"
      createComponent={
        <GpCreate
          visible={createVisible}
          onClose={() => setCreateVisible(!createVisible)}
          onCreated={() => handleCreated()}
        />
      }
      actions={actions}
      onRowSelected={(r) => setSelectedGp(r)}
      actionComponent={
        <SurgeryActions
          onSurgeryCreate={() => setCreateVisible(!createVisible)}
        />
      }
    />
  );
};

export default Surgeries;
