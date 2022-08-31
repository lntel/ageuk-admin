import React, { FC, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import ReactModal from "react-modal";
import Dropdown, { IDropdownOption } from "../Dropdown";
import Textbox from "../Textbox";

export interface RoleCreateProps {
  visible: boolean;
}

const RoleCreate: FC<RoleCreateProps> = ({ visible }) => {
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
        Create a new role
      </h1>

    </ReactModal>
  );
};

export default RoleCreate;
