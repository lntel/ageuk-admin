import React, { FC, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { MultiModalContext, MultiModalContextType } from "../../context/MultiModalContext";
import request from "../../helpers/request";
import { StaffFormData } from "../../pages/Staff";
import { IStaff } from "../../types";
import MultiModal from "../MultiModal";
import GeneralData from "./GeneralData";

export interface StaffCreateProps {
  visible: boolean;
  onClose: () => void;
}

const StaffCreate: FC<StaffCreateProps> = ({ visible, onClose }) => {
  const { state: authState } = useContext(AuthContext);
  const { state } = useContext<MultiModalContextType<StaffFormData>>(MultiModalContext);

  const handleClose = () => {
    onClose();
  };

  const handleCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // return console.log({
    //   ...state,
    //   role: undefined,
    //   roleId: state.role.id,
    //   password: "testing123"
    // })

    const response = await request({
      type: "POST",
      url: "/staff",
      data: {
        ...state,
        role: undefined,
        roleId: state.data.role.id,
        password: "testing123"
      },
      headers: {
        Authorization: `Bearer ${authState.accessToken}`
      }
    });

    if(response.ok) {
      toast.success("Staff member has been created");
    }
  };

  return (
    <MultiModal
      onClose={() => handleClose()}
      overlayClassName="staff-component__modal"
      className="staff-component__general"
      pages={[
        {
          header: "Staff Member Information",
          component: <GeneralData onSubmit={handleCreation} />, // onSubmitted={handleCreate}
        },
      ]}
      visible={visible}
    />
  );
};

export default StaffCreate;
