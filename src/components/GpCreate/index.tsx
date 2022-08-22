import React, { FC, useEffect } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { GpContext } from "../../context/GpContext";
import request from "../../helpers/request";
import { IGpSurgery } from "../../types";
import MultiModal from "../MultiModal";
import GeneralData, { SubmissionData } from "./GeneralData";

export type GpCreateMode = | 'create' | 'update'; 
export interface GpCreateProps {
  visible: boolean;
  onCreated: () => void;
  onClose: () => void;
  gpSurgery?: IGpSurgery;
  mode: GpCreateMode;
}

const GpCreate: FC<GpCreateProps> = ({ visible, onClose, onCreated, gpSurgery }) => {

  const { state, dispatch } = useContext(GpContext);

  const handleClose = () => {
    onClose();

    dispatch({
      type: "SET_SELECTED",
      state: {
        ...state,
        selectedGp: undefined
      }
    })
  }

  const handleSubmit = async (data: SubmissionData) => {

    const response = await request({
      type: 'POST',
      url: '/gp',
      data
    });
    
    if(response.ok) {

      onCreated();

      toast.success("GP Surgery Created");
    }
  }

  return (
    <MultiModal
      onClose={() => handleClose()}
      overlayClassName="gp-component__modal"
      className="gp-component__general"
      pages={[
        {
            header: "General GP Information",
            component: <GeneralData onSubmit={e => handleSubmit(e)} data={gpSurgery}  />
        }
      ]}
      visible={visible}
    />
  );
};

export default GpCreate;
