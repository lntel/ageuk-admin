import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { FC, useEffect, useRef, useState } from "react";
import "./index.scss";
import { Table } from "../../components/Table";
import Template from "../../components/Template";
import { Patient } from "../../types";
import Paginator from "../../components/Paginator";
import { MdAddCircle, MdMoreVert, MdRemoveCircle } from "react-icons/md";
import ReactModal from "react-modal";
import Textbox from "../../components/Textbox";
import CanvasDraw from "react-canvas-draw";
import AnatomyImage from "../../assets/images/anatomy.jpg";
import WoundManager from "../../components/WoundManager";

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
  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const [createVisible, setCreateVisible] = useState<boolean>(false);
  const [nhsNumber, setNhsNumber] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [diagnoses, setDiagnoses] = useState<string[]>([]);

  let drawRef: CanvasDraw | null;

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

  const handleDiagnosisAdd = () => {
    // TODO add alert message
    if (!diagnosis.length) return;

    setDiagnoses([...diagnoses, diagnosis]);
    setDiagnosis("");
  };

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
      <ReactModal
        isOpen={createVisible}
        className="patient-component__create"
        overlayClassName="modal-overlay"
      >
        <h1 className="patient-component__create__title">
          Create a new patient {nhsNumber ? `- ${nhsNumber}` : null}
        </h1>
        <div className="patient-component__create__general">
          <Textbox
            className="patient-component__create__input"
            placeholder="NHS Number"
            onChange={(e) => setNhsNumber(e.target.value)}
          />
          <Textbox
            className="patient-component__create__input"
            placeholder="Patient First Name"
          />
          <Textbox
            className="patient-component__create__input"
            placeholder="Patient Middle Name(s)"
          />
          <Textbox
            className="patient-component__create__input"
            placeholder="Patient Surname"
          />
          <Textbox
            className="patient-component__create__input"
            placeholder="Prognosis"
          />
          <Textbox
            className="patient-component__create__input"
            placeholder="Address Line"
          />
          <Textbox
            className="patient-component__create__input"
            placeholder="City"
          />
          <Textbox
            className="patient-component__create__input"
            placeholder="County"
          />
          <Textbox
            className="patient-component__create__input"
            placeholder="Postcode"
          />
        </div>
        <div className="patient-component__create__diagnoses">
          <Textbox
            className="patient-component__create__input"
            placeholder="Enter Diagnosis"
            onChange={(e) => setDiagnosis(e.target.value)}
            value={diagnosis}
          />
          <div className="patient-component__create__diagnoses__actions">
            <button
              className="patient-component__create__button patient-component__create__button--add"
              onClick={() => handleDiagnosisAdd()}
            >
              <MdAddCircle />
              Add
            </button>
            <button className="patient-component__create__button patient-component__create__button--remove" onClick={() => console.log(drawRef!.getSaveData())}>
              <MdRemoveCircle />
              Remove
            </button>
          </div>
          <ul className="patient-component__create__diagnoses__list">
            <span>Patient Diagnoses</span>
            {diagnoses.length
              ? diagnoses.map((diagnosis) => (
                  <li key={diagnosis}>{diagnosis}</li>
                ))
              : null}
          </ul>
        </div>
        <div className="patient-component__create__wounds">
          <WoundManager isOpen={false} />
        </div>
      </ReactModal>
      <Table table={table} className="patient-component__table" maxRows={6} />
      <Paginator table={table} className="patient-component__paginator" />
    </Template>
  );
};

export default Patients;
