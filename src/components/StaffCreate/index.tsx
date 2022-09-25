import React, { FC, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { CreateContext } from "../../context/CreateContext";
import { MultiModalContext, MultiModalContextType } from "../../context/MultiModalContext";
import request from "../../helpers/request";
import { StaffFormData } from "../../pages/Staff";
import { IStaff } from "../../types";
import MultiModal from "../MultiModal";
import GeneralData from "./GeneralData";

export interface StaffCreateProps {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const StaffCreate: FC<StaffCreateProps> = ({ visible, onClose, onCreated }) => {
  const { state: authState } = useContext(AuthContext);
  const { state } = useContext(CreateContext);

  const handleClose = () => {
    onClose();
  };

  const handleCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!state.data) return;

    if(state.mode === "CREATE") {
      const response = await request({
        type: "POST",
        url: "/staff",
        data: {
          ...state.data
        },
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      });
  
      if(response.ok) {
        toast.success("Staff member has been created");
  
        onCreated();
      }
    } else {
      const response = await request({
        type: "PATCH",
        url: `/staff/${state.selected.id}`,
        data: {
          ...state.data
        },
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      });
  
      if(response.ok) {
        toast.success("Staff member has been created");
  
        onCreated();
      }
    }

  };

  return (
    <MultiModal
      onClose={() => handleClose()}
      overlayClassName="staff-component__modal"
      className="staff-component__general"
      pages={[
        {
          header: state.mode === "CREATE" ? "Staff Member Information" : `Editing ${state.selected.emailAddress}`,
          component: <GeneralData onSubmit={handleCreation} />, // onSubmitted={handleCreate}
        },
      ]}
      visible={visible}
    />
  );
};

export default StaffCreate;
