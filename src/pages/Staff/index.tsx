import { ColumnDef } from "@tanstack/react-table";
import { FC, useContext, useEffect, useState } from "react";
import { MdAddCircle, MdModeEdit, MdPersonRemove } from "react-icons/md";
import { toast } from "react-toastify";
import StaffCreate from "../../components/StaffCreate";
import { TableData, TableDataAction } from "../../components/TableData";
import { AuthContext } from "../../context/AuthContext";
import { MultiModalContext, MultiModalContextType, MultiModalProvider } from "../../context/MultiModalContext";
import { PermissionTypeEnum } from "../../enums/permissions";
import request from "../../helpers/request";
import { IStaff } from "../../types";
import "./index.scss";

export interface StaffActionsProps {
  onPatientCreate: () => void;
}

const StaffActions: FC<StaffActionsProps> = ({
  onPatientCreate: onStaffCreate,
}) => {
  return (
    <button className="patient-component__new" onClick={() => onStaffCreate()}>
      <MdAddCircle />
      Add Staff Member
    </button>
  );
};

export type StaffFormData = {
  editMode: boolean;
  data?: IStaff;
}

const Staff = () => {
  const [selectedStaff, setSelectedStaff] = useState<IStaff>();
  const [createVisible, setCreateVisible] = useState<boolean>(false);

  const { state: authState } = useContext(AuthContext);
  const { state, setState } = useContext<MultiModalContextType<StaffFormData>>(MultiModalContext);

  // useEffect(() => {
  //   console.log(selectedStaff)
  // }, [selectedStaff])
  

  const [staff, setStaff] = useState<IStaff[]>([
    {
      id: "1",
      forename: "Joseph",
      surname: "Harris",
      // addressLine: "64 Zoo Lane",
      dob: new Date("17/10/2000"),
      emailAddress: "test@t.com",
      role: {
        id: "1",
        created: new Date(),
        lastUpdated: new Date(),
        name: "test",
        permissions: [PermissionTypeEnum.MANAGE_STAFF]
      }
      // postcode: "NN4 8SW",
    },
  ]);

  const getStaff = async () => {

    const response = await request({
      type: "GET",
      url: "/staff",
      headers: {
        Authorization: `Bearer ${authState.accessToken}`
      }
    });

    if(!response.ok) 
      return;

    const data = await response.json();

    setStaff(data);
  }

  useEffect(() => {
    getStaff();
  }, []);
  

  const columns: ColumnDef<IStaff>[] = [
    {
      accessorKey: "forename",
      cell: (info) => info.getValue(),
      header: "First Name",
    },
    {
      accessorKey: "surname",
      cell: (info) => info.getValue(),
      header: "Surname",
    },
    {
      accessorFn: staff => staff.role.name,
      cell: (info) => info.getValue(),
      header: "Role",
    },
    // {
    //   accessorKey: "addressLine",
    //   cell: (info) => info.getValue(),
    //   header: "Address Line",
    // },
    // {
    //   accessorKey: "postcode",
    //   cell: (info) => info.getValue(),
    //   header: "Postcode",
    // },
    {
      accessorKey: "dob",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      header: "DOB",
    },
  ];

  const handleDelete = async () => {
  
    if(!selectedStaff)
      return;

    const response = await request({
      type: "DELETE",
      url: `/staff/${selectedStaff.id}`,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`
      }
    });

    if(!response.ok)
      return;

    // Remove it from the current state
    setStaff([
      ...staff.filter(s => s.id !== selectedStaff.id)
    ]);

    toast.success("Staff member has been removed");
  }

  const handleCreation = () => {
    getStaff();

    setCreateVisible(!createVisible)
  }

  const handleEdit = () => {

    if(!selectedStaff) 
      return;

    setCreateVisible(!createVisible);

    setState({
      editMode: true,
      data: selectedStaff
    });
  }

  const actions: TableDataAction[] = [
    {
      action: "Edit Staff",
      icon: <MdModeEdit />,
      onClicked: () => handleEdit()
    },
    {
      action: "Delete Staff",
      icon: <MdPersonRemove />,
      onClicked: () => handleDelete()
    },
  ];

  return (
    <MultiModalProvider>
      <TableData
        columns={columns}
        data={staff}
        entityName="Staff"
        onRowSelected={(r) => setSelectedStaff(r)}
        actions={actions}
        actionComponent={
          <StaffActions
            onPatientCreate={() => setCreateVisible(!createVisible)}
          />
        }
      >
        <StaffCreate
          visible={createVisible}
          onClose={() => setCreateVisible(!createVisible)}
          onCreated={handleCreation}
        />
      </TableData>
    </MultiModalProvider>
  );
};

export default Staff;
