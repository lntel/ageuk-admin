import React, { FC } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { GpContext } from "../../context/GpContext";
import request from "../../helpers/request";
import MultiModal from "../MultiModal";
import GeneralData, { SubmissionData } from "./GeneralData";

export interface GpCreateProps {
  visible: boolean;
  onCreated: () => void;
  onClose: () => void;
}

const GpCreate: FC<GpCreateProps> = ({ visible, onClose, onCreated }) => {

  const { surgeries, setSurgeries } = useContext(GpContext);

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
      onClose={() => onClose()}
      overlayClassName="gp-component__modal"
      className="gp-component__general"
      pages={[
        {
            header: "General GP Information",
            component: <GeneralData onSubmit={e => handleSubmit(e)} />
        }
      ]}
      visible={visible}
    />
  );
};

export default GpCreate;
