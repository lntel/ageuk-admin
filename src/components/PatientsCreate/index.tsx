import React, { FC, useContext, useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { toast } from "react-toastify";
import MultiModal from "../MultiModal";
import GeneralData from "./GeneralData";
import { MultiModalContext, MultiModalProvider } from "../../context/MultiModalContext"
import Diagnoses from "./Diagnoses";
import Assessment from "./Assessment";
import request from "../../helpers/request";
import { AuthContext } from "../../context/AuthContext";
import { CreateContext } from "../../context/CreateContext";
export interface PatientsCreateProps {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const PatientsCreate: FC<PatientsCreateProps> = ({ visible, onClose, onCreated }) => {
  let drawRef: CanvasDraw | null;

  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>("");
  // const [dnacpr, setDnacpr] = useState<boolean>(false);

  const { state, dispatch } = useContext(CreateContext);
  const { state: authState } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log(state.data)
  // }, [state])
  

  const handleDiagnosisAdd = () => {
    if (!diagnosis.length) return toast.error("You must enter a diagnosis");

    const exists = diagnoses.find((d) => d == diagnosis);

    if (exists) {
      setDiagnosis("");

      return toast.error(`${diagnosis} is already within the diagnosis list`);
    }

    toast.success("Diagnosis added to list");

    setDiagnoses([...diagnoses, diagnosis]);
    setDiagnosis("");
  };

  const handleDiagnosisRemove = () => {
    if (!selectedDiagnosis)
      return toast.error("You must select a diagnosis to remove");
  };

  const handlePatientCreate = async () => {
    const { data } = state;

    console.log(data)

    const response = await request({
      type: 'POST',
      url: '/patients',
      data,
      headers: {
        Authorization: `Bearer ${authState.accessToken}`
      }
    });

    if(response.status === 409) {
      toast.error((await response.json()).message);
    }

    if(response.ok) {

      // Empty data for new insertion
      dispatch({
        type: "SET_DATA",
        state: {
          ...state,
          data: {}
        }
      });

      onCreated();

      onClose();

      toast.success("Patient has been added")
    } 
  }

  return (
      <MultiModal
        onClose={() => onClose()}
        onComplete={() => handlePatientCreate()}
        visible={visible}
        pages={[
          {
            header: "General Patient Information",
            component: <GeneralData />,
            className: "patient-component__general__modal"
          },
          {
            header: "Diagnoses and Allergies",
            component: <Diagnoses />,
            className: "patient-component__diagnoses__modal"
          },
          {
            header: "Patient Assessment",
            component: <Assessment />,
            className: "patient-component__assessment__modal"
          },
        ]}
      />
  );
};

export default PatientsCreate;
