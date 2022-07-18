import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Table } from "../../components/Table";
import Template from "../../components/Template";
import { Patient } from "../../types";
import Paginator from "../../components/Paginator";
import { MdAddCircle, MdMoreVert } from "react-icons/md";

const PatientActions = () => {

  return (
    <button className="patient-component__new">
      <MdAddCircle />
      Add New Patient
    </button>
  );
}

const Patients = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>();

  useEffect(() => {
    console.log(selectedPatient);
  }, [selectedPatient]);

  const [patients, setPatients] = useState<Patient[]>([
    {
      surname: "Smith",
      addressLine: "38 Windingbrook Lane",
      county: "Northamptonshire",
      postcode: "CH5 7GB",
      firstName: "John",
      middleNames: "",
      startDate: new Date("2022-10-14 00:00:00"),
      prognosis: "Weeks",
      city: "Northampton",
      id: "4501277104",
      diagnoses: ["Stage 4 Leukemia"],
      generalPractionerId: 6,
      eightWeekReview: new Date("2022-12-02 00:00:00"),
      sixWeekReview: new Date("2022-11-22 00:00:00"),
      telephoneNumber: "01604700660",
      dob: new Date("1965-06-14 00:00:00"),
      gpFullname: "Unknown",
    },
  ]);

  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "id",
      cell: (info) => info.getValue(),
      header: "NHS Number",
    },
    {
      header: "Patient Name",
      accessorFn: row => `${row.firstName} ${row.surname}`
    },
    {
      accessorKey: "diagnoses",
      cell: (info) => info.getValue(),
      header: "Diagnoses",
    },
    {
      accessorKey: "prognosis",
      cell: (info) => info.getValue(),
      header: "Prognosis",
    },
    {
      accessorKey: 'addressLine',
      cell: (info) => info.getValue(),
      header: "Address Line",
    },
    {
      accessorKey: 'postcode',
      cell: (info) => info.getValue(),
      header: "Postcode",
    },
    {
      accessorKey: "dob",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      header: "DOB",
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
      header="Manage Patients"
      layout="none"
      className="patient-component"
      headerChildren={<PatientActions />}
    >
      <Table table={table} className="patient-component__table" maxRows={6} />
      <Paginator table={table} className="patient-component__paginator" />
    </Template>
  );
};

export default Patients;
