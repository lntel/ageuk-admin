import { ColumnDef } from "@tanstack/react-table";
import { FC, useState } from "react";
import { MdAddCircle, MdModeEdit, MdPersonRemove } from "react-icons/md";
import StaffCreate from "../../components/StaffCreate";
import { TableData, TableDataAction } from "../../components/TableData";
import { MultiModalProvider } from "../../context/MultiModalContext";
import { PermissionTypeEnum } from "../../enums/permissions";
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

const Staff = () => {
  const [selectedStaff, setSelectedStaff] = useState<IStaff>();
  const [createVisible, setCreateVisible] = useState<boolean>(false);

  const [staff, setStaff] = useState<IStaff[]>([
    {
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

  const actions: TableDataAction[] = [
    {
      action: "Edit Staff",
      icon: <MdModeEdit />,
    },
    {
      action: "Delete Staff",
      icon: <MdPersonRemove />,
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
        />
      </TableData>
    </MultiModalProvider>
  );
};

export default Staff;
