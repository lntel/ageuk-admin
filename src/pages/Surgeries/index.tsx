import { ColumnDef } from "@tanstack/react-table";
import { FC, useContext, useEffect, useState } from "react";
import { IGpSurgery } from "../../types";
import { MdAddCircle, MdModeEdit, MdPersonRemove } from "react-icons/md";
import { TableData, TableDataAction } from "../../components/TableData";
import GpCreate, { GpCreateMode } from "../../components/GpCreate";
import "./index.scss";
import { GpContext } from "../../context/GpContext";
import request from "../../helpers/request";
import { toast } from "react-toastify";

export interface SurgeryActionsProps {
  onSurgeryCreate: () => void;
}

const SurgeryActions: FC<SurgeryActionsProps> = ({
  onSurgeryCreate,
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
  const [createVisible, setCreateVisible] = useState<boolean>(false);
  const [mode, setMode] = useState<GpCreateMode>("create");

  const { state, dispatch } = useContext(GpContext);

  useEffect(() => {
    getSurgeries();
  }, []);

  const getSurgeries = async () => {
    const response = await request({
      url: "/gp",
    });

    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: "SET_SURGERIES",
        state: {
          ...state,
          surgeries: data
        }
      });
    }
  };

  const handleCreated = async () => {
    dispatch({
      type: "SET_SURGERIES",
      state: {
        ...state,
        surgeries: []
      }
    });

    await getSurgeries();

    setCreateVisible(false);
  };

  const handleDelete = async () => {

    if(!state.selectedGp) return;

    const response = await request({
      type: 'DELETE',
      url: `/gp/${state.selectedGp.id}`
    });

    
    if(response.ok) {
      
      dispatch({
        type: "SET_SURGERIES",
        state: {
          ...state,
          surgeries: state.surgeries.filter(s => s.id !== state.selectedGp?.id)
        }
      });
      
      toast.success("GP Surgery has been deleted")
    } else {

      // TODO add 400 message or something

      const { message } = await response.json();

      if(response.status === 409) {
        toast.warn(message);
      }
    }
  }

  const handleEdit = () => {
    setMode("update");
    setCreateVisible(true);

  }

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
      onClicked: () => handleEdit()
    },
    {
      action: "Delete GP",
      icon: <MdPersonRemove />,
      onClicked: () => handleDelete()
    },
  ];

  return (
    <TableData
      columns={columns}
      data={state.surgeries}
      className="gp-component"
      entityName="GP Surgeries"
      createComponent={
        <GpCreate
          visible={createVisible}
          gpSurgery={state.selectedGp}
          mode={mode}
          onClose={() => setCreateVisible(!createVisible)}
          onCreated={() => handleCreated()}
        />
      }
      actions={actions}
      onRowSelected={(r) => dispatch({
        type: "SET_SELECTED",
        state: {
          ...state,
          selectedGp: r
        }
      })}
      actionComponent={
        <SurgeryActions
          onSurgeryCreate={() => setCreateVisible(!createVisible)}
        />
      }
    />
  );
};

export default Surgeries;
