import { ColumnDef } from "@tanstack/react-table";
import { FC, useContext, useEffect, useState } from "react";
import { IGpSurgery } from "../../types";
import { MdAddCircle, MdModeEdit, MdPersonRemove } from "react-icons/md";
import { TableData, TableDataAction } from "../../components/TableData";
import GpCreate from "../../components/GpCreate";
import "./index.scss";
import { GpContext, GpProvider } from "../../context/GpContext";
import request from "../../helpers/request";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

export interface SurgeryActionsProps {
  onSurgeryCreate: () => void;
}

const SurgeryActions: FC<SurgeryActionsProps> = ({ onSurgeryCreate }) => {
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

  const { state, dispatch } = useContext(GpContext);
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

  useEffect(() => {
    getSurgeries();
  }, []);

  const getSurgeries = async () => {
    const response = await request({
      url: "/gp",
      headers: {
        Authorization: `Bearer ${authState.accessToken}`
      }
    }, authState.refreshToken);

    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: "SET_SURGERIES",
        state: {
          ...state,
          surgeries: data,
        },
      });
    }
  };

  const handleCreated = async () => {
    dispatch({
      type: "SET_SURGERIES",
      state: {
        ...state,
        surgeries: [],
      },
    });

    await getSurgeries();

    setCreateVisible(false);
  };

  const handleDelete = async () => {
    if (!state.selectedGp) return;

    const response = await request({
      type: "DELETE",
      url: `/gp/${state.selectedGp.id}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`
      }
    });

    if (response.ok) {
      dispatch({
        type: "SET_SURGERIES",
        state: {
          ...state,
          surgeries: state.surgeries.filter(
            (s) => s.id !== state.selectedGp?.id
          ),
        },
      });

      toast.success("GP Surgery has been deleted");
    } else {
      // TODO add 400 message or something

      const { message } = await response.json();

      if (response.status === 409) {
        toast.warn(message);
      }
    }
  };

  const handleEdit = () => {
    dispatch({
      type: "SET_MODE",
      state: {
        ...state,
        mode: "UPDATE",
      },
    });

    setCreateVisible(true);
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
      onClicked: () => handleEdit(),
    },
    {
      action: "Delete GP",
      icon: <MdPersonRemove />,
      onClicked: () => handleDelete(),
    },
  ];

  return (
    <TableData
      columns={columns}
      data={state.surgeries}
      className="gp-component"
      entityName="GP Surgeries"
      actions={actions}
      onRowSelected={(r) =>
        dispatch({
          type: "SET_SELECTED",
          state: {
            ...state,
            selectedGp: r,
          },
        })
      }
      actionComponent={
        <SurgeryActions
          onSurgeryCreate={() => setCreateVisible(!createVisible)}
        />
      }
    >
      <GpCreate
        visible={createVisible}
        gpSurgery={state.selectedGp}
        onClose={() => setCreateVisible(!createVisible)}
        onCreated={() => handleCreated()}
      />
    </TableData>
  );
};

export default Surgeries;
