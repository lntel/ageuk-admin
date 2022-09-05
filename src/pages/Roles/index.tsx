import { ColumnDef } from "@tanstack/react-table";
import { FC, useContext, useEffect, useState } from "react";
import { IGpSurgery, IRole } from "../../types";
import {
  MdAddCircle,
  MdAddModerator,
  MdModeEdit,
  MdPersonRemove,
  MdRemoveModerator,
} from "react-icons/md";
import { TableData, TableDataAction } from "../../components/TableData";
import GpCreate from "../../components/GpCreate";
import "./index.scss";
import { GpContext, GpProvider } from "../../context/GpContext";
import request from "../../helpers/request";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { RoleContext } from "../../context/RoleContext";
import RoleCreate from "../../components/RoleCreate";
import { MultiModalProvider } from "../../context/MultiModalContext";

export interface RoleActionsProps {
  onRoleCreate: () => void;
}

const SurgeryActions: FC<RoleActionsProps> = ({ onRoleCreate }) => {
  return (
    <button className="patient-component__new" onClick={() => onRoleCreate()}>
      <MdAddCircle />
      Add Role
    </button>
  );
};

const Roles = () => {
  const [createVisible, setCreateVisible] = useState<boolean>(false);

  const { state, dispatch } = useContext(RoleContext);
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    const response = await request({
      url: "/roles",
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: "SET_ROLES",
        state: {
          ...state,
          roles: data,
        },
      });
    }
  };

  const handleCreated = async () => {
    dispatch({
      type: "SET_ROLES",
      state: {
        ...state,
        roles: [],
      },
    });

    await getRoles();

    setCreateVisible(false);
  };

  const handleDelete = async () => {
    if (!state.selectedRole) return;

    const response = await request({
      type: "DELETE",
      url: `/roles/${state.selectedRole.id}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    });

    if (response.ok) {
      dispatch({
        type: "SET_ROLES",
        state: {
          ...state,
          roles: state.roles.filter((s) => s.id !== state.selectedRole?.id),
        },
      });

      toast.success("Access role has been deleted");
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

  const columns: ColumnDef<IRole>[] = [
    {
      accessorKey: "name",
      cell: (info) => info.getValue(),
      header: "Role Name",
    },
    {
      accessorKey: "created",
      cell: (info) => new Date(info.getValue()).toLocaleString(),
      header: "Created",
    },
    {
      accessorKey: "lastUpdated",
      cell: (info) => new Date(info.getValue()).toLocaleString(),
      header: "Last Updated",
    },
  ];

  const actions: TableDataAction[] = [
    {
      action: "Edit Role",
      icon: <MdAddModerator />,
      onClicked: () => handleEdit(),
    },
    {
      action: "Delete Role",
      icon: <MdRemoveModerator />,
      onClicked: () => handleDelete(),
    },
  ];

  return (
    <MultiModalProvider>
      <TableData
        columns={columns}
        data={state.roles}
        className="roles-component"
        entityName="roles and permissions"
        actions={actions}
        onRowSelected={(r) =>
          dispatch({
            type: "SET_SELECTED",
            state: {
              ...state,
              selectedRole: r,
            },
          })
        }
        actionComponent={
          <SurgeryActions
            onRoleCreate={() => setCreateVisible(!createVisible)}
          />
        }
      >
        <RoleCreate
          visible={createVisible}
          onClose={() => setCreateVisible(!createVisible)}
          onCreated={handleCreated}
        />
      </TableData>
    </MultiModalProvider>
  );
};

export default Roles;
