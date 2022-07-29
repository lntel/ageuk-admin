import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  Table as TanTable,
  RowSelectionState,
} from "@tanstack/react-table";
import React, { FC, useEffect, useRef, useState } from "react";
import "./index.scss";
import { Table } from "../../components/Table";
import Template from "../../components/Template";
import { Patient } from "../../types";
import TablePaginator from "../../components/TablePaginator";
import { MdAddCircle, MdMoreVert } from "react-icons/md";
import PatientsCreate from "../../components/PatientsCreate";
import ActionModal from "../../components/ActionModal";

export interface PatientActionsProps {
  onPatientCreate: () => void;
}

const PatientActions: FC<PatientActionsProps> = ({ onPatientCreate }) => {
  return (
    <button
      className="patient-component__new"
      onClick={() => onPatientCreate()}
    >
      <MdAddCircle />
      Add New Patient
    </button>
  );
};

const Patients = () => {
  const [rowSelection, setSelectedRow] = useState({});
  const [createVisible, setCreateVisible] = useState<boolean>(false);
  const [nhsNumber, setNhsNumber] = useState<string>("");

  useEffect(() => {
    console.log(rowSelection)
  }, [rowSelection])

  // * Weeks by default
  const [prognosis, setPrognosis] = useState<string>("weeks");

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

  // TODO query if NHS number is used as a search term

  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "id",
      cell: (info) => info.getValue(),
      header: "NHS Number",
    },
    {
      header: "Patient Name",
      accessorFn: (row) => `${row.firstName} ${row.surname}`,
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
      accessorKey: "addressLine",
      cell: (info) => info.getValue(),
      header: "Address Line",
    },
    {
      accessorKey: "postcode",
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
      cell: ({ row, cell }) => [
        <MdMoreVert
          key={cell.id}
          onClick={(e) => row.toggleSelected()}
        />,
      ],
    },
  ];

  const table = useReactTable({
    data: patients,
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
      header="Manage Patients"
      layout="none"
      className="patient-component"
      headerChildren={
        <PatientActions
          onPatientCreate={() => setCreateVisible(!createVisible)}
        />
      }
    >
      <PatientsCreate visible={createVisible} />
      <Table table={table} className="patient-component__table" maxRows={6} />
      <TablePaginator table={table} className="patient-component__paginator" />
      <ActionModal />
    </Template>
  );
};

export default Patients;
