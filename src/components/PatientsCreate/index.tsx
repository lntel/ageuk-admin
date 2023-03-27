import { FC, useContext, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { CreateContext } from "../../context/CreateContext";
import request from "../../helpers/request";
import MultiModal from "../MultiModal";
import Assessment from "./Assessment";
import Consent from "./Consent";
import Diagnoses from "./Diagnoses";
import GeneralData from "./GeneralData";
export interface PatientsCreateProps {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const PatientsCreate: FC<PatientsCreateProps> = ({
  visible,
  onClose,
  onCreated,
}) => {
  let drawRef: CanvasDraw | null;

  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>("");
  // const [dnacpr, setDnacpr] = useState<boolean>(false);

  const { state, dispatch } = useContext(CreateContext);
  const { state: authState } = useContext(AuthContext);

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

  const handlePatientSubmit = async () => {
    const { data } = state;

    console.log(data);

    if (state.mode === "CREATE") {
      const response = await request({
        type: "POST",
        url: "/patients",
        data,
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
        },
      });

      if (response.status === 409) {
        toast.error((await response.json()).message);
      }

      if (response.ok) {
        // Empty data for new insertion
        dispatch({
          type: "SET_DATA",
          state: {
            ...state,
            data: {},
          },
        });

        onCreated();

        onClose();

        toast.success("Patient has been added");
      }
    } else {
      const response = await request({
        type: "PATCH",
        url: `/patients/${state.selected.id}`,
        data,
        headers: {
          Authorization: `Bearer ${authState.accessToken}`,
        },
      });

      if (response.status === 409) {
        toast.error((await response.json()).message);
      }

      if (response.ok) {
        // Empty data for new insertion
        dispatch({
          type: "SET_DATA",
          state: {
            ...state,
            data: {},
          },
        });

        onCreated();

        onClose();

        toast.success("Patient has been updated");
      }
    }
  };

  return (
    <MultiModal
      onClose={() => onClose()}
      onComplete={() => handlePatientSubmit()}
      visible={visible}
      pages={[
        {
          header: "General Patient Information",
          component: <GeneralData />,
          className: "patient-component__general__modal",
        },
        {
          header: "Diagnoses and Allergies",
          component: <Diagnoses />,
          className: "patient-component__diagnoses__modal",
        },
        {
          header: "Patient Assessment",
          component: <Assessment />,
          className: "patient-component__assessment__modal",
        },
      ]}
    />
  );
};

export default PatientsCreate;
