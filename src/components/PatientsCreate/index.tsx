import React, { FC, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { MdAddCircle, MdClose, MdRemoveCircle } from "react-icons/md";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import Checkbox from "../Checkbox";
import Dropdown, { IDropdownOption } from "../Dropdown";
import Textbox from "../Textbox";
import WoundManager from "../WoundManager";

export interface PatientsCreateProps {
  visible: boolean;
  onClose: () => void;
}

const PatientsCreate: FC<PatientsCreateProps> = ({ visible, onClose }) => {
  let drawRef: CanvasDraw | null;

  // * Prognosis is weeks by default
  const [prognosis, setPrognosis] = useState<string>("weeks");
  const [nhsNumber, setNhsNumber] = useState<string | null>(null);
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>("");
  const [dnacpr, setDnacpr] = useState<boolean>(false);

  const [gpOptions, setGpOptions] = useState<IDropdownOption[]>([
    {
      key: "Whitefields Surgery",
      value: "2",
    },
    {
      key: "St Luke's Primary Care Centre",
      value: "5",
    },
  ]);

  const [prognoses, setPrognoses] = useState<IDropdownOption[]>([
    {
      key: "Weeks",
      value: "weeks",
    },
    {
      key: "Months",
      value: "months",
    },
    {
      key: "Years",
      value: "years",
    },
  ]);

  const handleDiagnosisAdd = () => {
    if (!diagnosis.length) return toast.error("You must enter a diagnosis");

    const exists = diagnoses.find(d => d == diagnosis);

    if(exists) {
      
      setDiagnosis("");

      return toast.error(`${diagnosis} is already within the diagnosis list`);
    }

    toast.success("Diagnosis added to list")

    setDiagnoses([...diagnoses, diagnosis]);
    setDiagnosis("");
  };

  const handleDiagnosisRemove = () => {

    if(!selectedDiagnosis)
      return toast.error("You must select a diagnosis to remove");

    };

  return (
    <ReactModal
      isOpen={visible}
      className="patient-component__create"
      overlayClassName="modal-overlay"
    >
      <div className="patient-component__header">
        <h1 className="patient-component__create__title">
          Create a new patient {nhsNumber ? `- ${nhsNumber}` : null}
        </h1>
        <MdClose
          className="patient-component__create__close"
          onClick={() => onClose()}
        />
      </div>
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
          type="phone"
          className="patient-component__create__input"
          placeholder="Patient Telephone"
        />
        {/* TODO add tooltip to this so it makes more sense */}
        <Textbox
          type="date"
          className="patient-component__create__input"
        />
        <Dropdown
          options={prognoses}
          placeholder="Select a prognosis"
          onSelect={(v) => setPrognosis(v)}
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
        <Dropdown
          options={gpOptions}
          placeholder="Select patient's GP surgery"
          onSelect={console.log}
        />
        <Textbox
          className="patient-component__create__input"
          placeholder="Nurse Name"
        />
        <Textbox
          type="phone"
          className="patient-component__create__input"
          placeholder="Nurse Phone Number"
        />
        <Textbox
          type="text"
          className="patient-component__create__input"
          placeholder="Referred By"
        />
        <Checkbox text="DNACPR" checked={dnacpr} onClick={() => setDnacpr(!dnacpr)} />
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
          <button
            className="patient-component__create__button patient-component__create__button--remove"
            onClick={() => handleDiagnosisRemove()}
          >
            <MdRemoveCircle />
            Remove
          </button>
        </div>
        <ul className="patient-component__create__diagnoses__list">
          <span>Patient Diagnoses</span>
          {diagnoses.length
            ? diagnoses.map((diagnosis) => (
                <li
                  key={diagnosis}
                  onClick={() => setSelectedDiagnosis(diagnosis)}
                >
                  {diagnosis}
                </li>
              ))
            : null}
        </ul>
      </div>
      <div className="patient-component__create__wounds">
        <WoundManager isOpen={false} />
      </div>
    </ReactModal>
  );
};

export default PatientsCreate;
