import React, { FC, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import ReactModal from "react-modal";
import Dropdown, { IDropdownOption } from "../Dropdown";
import Textbox from "../Textbox";

export interface SurgeryCreateProps {
  visible: boolean;
}

const SurgeryCreate: FC<SurgeryCreateProps> = ({ visible }) => {
  let drawRef: CanvasDraw | null;

  // * Prognosis is weeks by default
  const [prognosis, setPrognosis] = useState<string>("weeks");

  return (
    <ReactModal
      isOpen={visible}
      className="patient-component__create"
      overlayClassName="modal-overlay"
    >
      <h1 className="patient-component__create__title">
        Create a new GP surgery
      </h1>
      <div className="patient-component__create__general">
        <Textbox
          className="patient-component__create__input"
          placeholder="NHS Number"
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
        <Textbox
          className="patient-component__create__input"
          placeholder="Nurse Name"
        />
        <Textbox
          type="phone"
          className="patient-component__create__input"
          placeholder="Nurse Phone Number"
        />
      </div>
    </ReactModal>
  );
};

export default SurgeryCreate;
