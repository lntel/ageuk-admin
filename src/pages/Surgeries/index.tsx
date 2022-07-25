import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import { FC, useEffect, useState } from "react";
  import "./index.scss";
  import { Table } from "../../components/Table";
  import Template from "../../components/Template";
  import { IGpSurgery, Patient } from "../../types";
  import TablePaginator from "../../components/TablePaginator";
  import { MdAddCircle, MdMoreVert, MdRemoveCircle } from "react-icons/md";
  import PatientsCreate from "../../components/PatientsCreate";
  
  export interface SurgeryActionProps {
    onPatientCreate: () => void;
  }
  
  const SurgeryActions: FC<SurgeryActionProps> = ({ onPatientCreate }) => {
    return (
      <button
        className="patient-component__new"
        onClick={() => onPatientCreate()}
      >
        <MdAddCircle />
        Add New Surgery
      </button>
    );
  };
  
  const Surgeries = () => {
    const [selectedPatient, setSelectedPatient] = useState<Patient>();
    const [createVisible, setCreateVisible] = useState<boolean>(false);
    const [nhsNumber, setNhsNumber] = useState<string>("");
    
  
    // * Weeks by default
    const [prognosis, setPrognosis] = useState<string>("weeks");
  
    useEffect(() => {
      console.log(selectedPatient);
    }, [selectedPatient]);
  
    const [patients, setPatients] = useState<IGpSurgery[]>([
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
        cell: (props) => [
          <MdMoreVert
            key={props.cell.id}
            onClick={() => setSelectedPatient(props.getValue())}
          />,
        ],
      },
    ];
  
    const table = useReactTable({
      data: patients,
      columns,
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getCoreRowModel: getCoreRowModel(),
    });
  
    return (
      <Template
        header="Manage GP Surgeries"
        layout="none"
        className="patient-component"
        headerChildren={
          <SurgeryActions
            onPatientCreate={() => setCreateVisible(!createVisible)}
          />
        }
      >
        <PatientsCreate visible={createVisible} />
        <Table table={table} className="patient-component__table" maxRows={6} />
        <TablePaginator table={table} className="patient-component__paginator" />
      </Template>
    );
  };
  
  export default Surgeries;
  