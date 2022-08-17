import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import React, { FC, useEffect, useState } from "react";
import "./index.scss";
import { Patient } from "../../types";
import { MdAddCircle, MdModeEdit, MdPersonRemove } from "react-icons/md";
import { TableData, TableDataAction } from "../../components/TableData";
import PatientsCreate from "../../components/PatientsCreate";
import { get } from "../../helpers/request";

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
  const [rowSelection, setSelectedRow] = useState<RowSelectionState>({});
  const [createVisible, setCreateVisible] = useState<boolean>(false);
  const [nhsNumber, setNhsNumber] = useState<string>("");

  useEffect(() => {
    getPatients();
  }, []);

  const getPatients = async () => {
    const request = await get({
      url: '/patients'
    });

    
    if(request.ok) {
      const data = await request.json();

      console.log(data)

      setPatients(data)
    }
  }

  // * Weeks by default
  const [prognosis, setPrognosis] = useState<string>("weeks");

  const [patients, setPatients] = useState<Patient[]>([
    // {
    //   surname: "Smith",
    //   addressLine: "38 Windingbrook Lane",
    //   county: "Northamptonshire",
    //   postcode: "CH5 7GB",
    //   firstName: "John",
    //   middleNames: "",
    //   startDate: new Date("2022-10-14 00:00:00"),
    //   prognosis: "Weeks",
    //   city: "Northampton",
    //   id: "4501277104",
    //   diagnoses: ["Stage 4 Leukemia"],
    //   generalPractionerId: 6,
    //   eightWeekReview: new Date("2022-12-02 00:00:00"),
    //   sixWeekReview: new Date("2022-11-22 00:00:00"),
    //   telephoneNumber: "01604700660",
    //   dob: new Date("1965-06-14 00:00:00"),
    //   gpFullname: "Unknown",
    // },
    // {
    //   surname: "Smith",
    //   addressLine: "38 Windingbrook Lane",
    //   county: "Northamptonshire",
    //   postcode: "CH5 7GB",
    //   firstName: "John",
    //   middleNames: "",
    //   startDate: new Date("2022-10-14 00:00:00"),
    //   prognosis: "Weeks",
    //   city: "Northampton",
    //   id: "4501277104",
    //   diagnoses: ["Stage 4 Leukemia"],
    //   generalPractionerId: 6,
    //   eightWeekReview: new Date("2022-12-02 00:00:00"),
    //   sixWeekReview: new Date("2022-11-22 00:00:00"),
    //   telephoneNumber: "01604700660",
    //   dob: new Date("1965-06-14 00:00:00"),
    //   gpFullname: "Unknown",
    // },
    // {
    //   surname: "Smith",
    //   addressLine: "38 Windingbrook Lane",
    //   county: "Northamptonshire",
    //   postcode: "CH5 7GB",
    //   firstName: "John",
    //   middleNames: "",
    //   startDate: new Date("2022-10-14 00:00:00"),
    //   prognosis: "Weeks",
    //   city: "Northampton",
    //   id: "4501277104",
    //   diagnoses: ["Stage 4 Leukemia"],
    //   generalPractionerId: 6,
    //   eightWeekReview: new Date("2022-12-02 00:00:00"),
    //   sixWeekReview: new Date("2022-11-22 00:00:00"),
    //   telephoneNumber: "01604700660",
    //   dob: new Date("1965-06-14 00:00:00"),
    //   gpFullname: "Unknown",
    // },
    // {
    //   surname: "Smith",
    //   addressLine: "38 Windingbrook Lane",
    //   county: "Northamptonshire",
    //   postcode: "CH5 7GB",
    //   firstName: "John",
    //   middleNames: "",
    //   startDate: new Date("2022-10-14 00:00:00"),
    //   prognosis: "Weeks",
    //   city: "Northampton",
    //   id: "4501277104",
    //   diagnoses: ["Stage 4 Leukemia"],
    //   generalPractionerId: 6,
    //   eightWeekReview: new Date("2022-12-02 00:00:00"),
    //   sixWeekReview: new Date("2022-11-22 00:00:00"),
    //   telephoneNumber: "01604700660",
    //   dob: new Date("1965-06-14 00:00:00"),
    //   gpFullname: "Unknown",
    // },
    // {
    //   surname: "Smith",
    //   addressLine: "38 Windingbrook Lane",
    //   county: "Northamptonshire",
    //   postcode: "CH5 7GB",
    //   firstName: "John",
    //   middleNames: "",
    //   startDate: new Date("2022-10-14 00:00:00"),
    //   prognosis: "Weeks",
    //   city: "Northampton",
    //   id: "4501277104",
    //   diagnoses: ["Stage 4 Leukemia"],
    //   generalPractionerId: 6,
    //   eightWeekReview: new Date("2022-12-02 00:00:00"),
    //   sixWeekReview: new Date("2022-11-22 00:00:00"),
    //   telephoneNumber: "01604700660",
    //   dob: new Date("1965-06-14 00:00:00"),
    //   gpFullname: "Unknown",
    // },
    // {
    //   surname: "Smith",
    //   addressLine: "38 Windingbrook Lane",
    //   county: "Northamptonshire",
    //   postcode: "CH5 7GB",
    //   firstName: "John",
    //   middleNames: "",
    //   startDate: new Date("2022-10-14 00:00:00"),
    //   prognosis: "Weeks",
    //   city: "Northampton",
    //   id: "4501277104",
    //   diagnoses: ["Stage 4 Leukemia"],
    //   generalPractionerId: 6,
    //   eightWeekReview: new Date("2022-12-02 00:00:00"),
    //   sixWeekReview: new Date("2022-11-22 00:00:00"),
    //   telephoneNumber: "01604700660",
    //   dob: new Date("1965-06-14 00:00:00"),
    //   gpFullname: "Unknown",
    // },
    // {
    //   surname: "Smith",
    //   addressLine: "38 Windingbrook Lane",
    //   county: "Northamptonshire",
    //   postcode: "CH5 7GB",
    //   firstName: "John",
    //   middleNames: "",
    //   startDate: new Date("2022-10-14 00:00:00"),
    //   prognosis: "Weeks",
    //   city: "Northampton",
    //   id: "4501277104",
    //   diagnoses: ["Stage 4 Leukemia"],
    //   generalPractionerId: 6,
    //   eightWeekReview: new Date("2022-12-02 00:00:00"),
    //   sixWeekReview: new Date("2022-11-22 00:00:00"),
    //   telephoneNumber: "01604700660",
    //   dob: new Date("1965-06-14 00:00:00"),
    //   gpFullname: "Unknown",
    // },
    // {
    //   surname: "Smith",
    //   addressLine: "38 Windingbrook Lane",
    //   county: "Northamptonshire",
    //   postcode: "CH5 7GB",
    //   firstName: "John",
    //   middleNames: "",
    //   startDate: new Date("2022-10-14 00:00:00"),
    //   prognosis: "Weeks",
    //   city: "Northampton",
    //   id: "4501277104",
    //   diagnoses: ["Stage 4 Leukemia"],
    //   generalPractionerId: 6,
    //   eightWeekReview: new Date("2022-12-02 00:00:00"),
    //   sixWeekReview: new Date("2022-11-22 00:00:00"),
    //   telephoneNumber: "01604700660",
    //   dob: new Date("1965-06-14 00:00:00"),
    //   gpFullname: "Unknown",
    // },
  ]);

  const handleModalClose = () => {
    setCreateVisible(!createVisible);
  }

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
    }
  ];

  const handleDelete = () => {

  }

  const handleEdit = () => {

  }

  const actions: TableDataAction[] = [
    {
      action: "Edit Patient",
      icon: <MdModeEdit />,
      onClicked: handleEdit
    },
    {
      action: "Delete Patient",
      icon: <MdPersonRemove />,
      onClicked: handleDelete
    }
  ]

  return (
    <TableData
      actionComponent={
        <PatientActions
          onPatientCreate={() => setCreateVisible(!createVisible)}
        />
      }
      createComponent={<PatientsCreate visible={createVisible} onClose={() => handleModalClose()} />}
      columns={columns}
      data={patients}
      actions={actions}
      entityName="Patients"
      onRowSelected={(r) => setSelectedRow(r)}
      className="patient-component"
    />
  );
};

export default Patients;
