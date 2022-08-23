import React, { FC, useEffect } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { GpContext } from "../../context/GpContext";
import request from "../../helpers/request";
import { IGpSurgery } from "../../types";
import MultiModal from "../MultiModal";
import GeneralData, { SubmissionData } from "./GeneralData";
export interface GpCreateProps {
  visible: boolean;
  onCreated: () => void;
  onClose: () => void;
  gpSurgery?: IGpSurgery;
}

/**
 * This component handles the creation/updating of GP surgeries
 * @param param0
 * @returns
 */
const GpCreate: FC<GpCreateProps> = ({
  visible,
  onClose,
  onCreated,
  gpSurgery,
}) => {
  const { state, dispatch } = useContext(GpContext);

  const handleClose = () => {
    onClose();

    // Clear the GP selection
    dispatch({
      type: "SET_SELECTED",
      state: {
        ...state,
        selectedGp: undefined,
      },
    });

    // If mode is currently update, set it to create mode
    if (state.mode === "UPDATE") {
      dispatch({
        type: "SET_MODE",
        state: {
          ...state,
          mode: "CREATE",
        },
      });
    }
  };

  /**
   * This method handles the creation/updating of GP surgeries
   * @param data GP surgery data
   */
  const handleSubmit = async (data: SubmissionData) => {

    if (state.mode === "CREATE") {
      const response = await request({
        type: "POST",
        url: "/gp",
        data,
      });

      if (response.ok) {
        onCreated();

        toast.success("GP Surgery Created");
      }
    } else {
      const response = await request({
        type: "PATCH",
        url: `/gp/${state.selectedGp?.id}`,
        data,
      });

      if(response.ok) {

        toast.success("Surgery has been updated");

        if(!state.selectedGp) return;

        const gp = {
          id: state.surgeries.find(gp => gp.id === state.selectedGp!.id)!.id,
          ...data
        };

        dispatch({
          type: "SET_SURGERIES",
          state: {
            ...state,
            surgeries: [
              ...state.surgeries.filter(gp => gp.id !== state.selectedGp!.id),
              gp
            ]
          }
        });

        onClose();

      }
    }
  };

  return (
    <MultiModal
      onClose={() => handleClose()}
      overlayClassName="gp-component__modal"
      className="gp-component__general"
      pages={[
        {
          header: "General GP Information",
          component: <GeneralData onSubmit={(e) => handleSubmit(e)} />,
        },
      ]}
      visible={visible}
    />
  );
};

export default GpCreate;
