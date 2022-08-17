import React, { FC, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { toast } from "react-toastify";
import MultiModal from "../MultiModal";
import GeneralData from "./GeneralData";
import { MultiModalProvider } from "../../context/MultiModalContext"
import Diagnoses from "./Diagnoses";
export interface PatientsCreateProps {
  visible: boolean;
  onClose: () => void;
}

const PatientsCreate: FC<PatientsCreateProps> = ({ visible, onClose }) => {
  let drawRef: CanvasDraw | null;

  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>("");
  // const [dnacpr, setDnacpr] = useState<boolean>(false);

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

  return (
    // <ReactModal
    //   isOpen={visible}
    //   className="patient-component__create"
    //   overlayClassName="modal-overlay"
    // >
    //   <div className="patient-component__header">
    //     <h1 className="patient-component__create__title">
    //       Create a new patient {nhsNumber ? `- ${nhsNumber}` : null}
    //     </h1>
    //     <MdClose
    //       className="patient-component__create__close"
    //       onClick={() => onClose()}
    //     />
    //   </div>
    //   <div className="patient-component__create__general">
    //     <Textbox
    //       className="patient-component__create__input"
    //       placeholder="NHS Number"
    //       onChange={(e) => setNhsNumber(e.target.value)}
    //     />
    //     <Textbox
    //       className="patient-component__create__input"
    //       placeholder="Patient First Name"
    //     />
    //     <Textbox
    //       className="patient-component__create__input"
    //       placeholder="Patient Middle Name(s)"
    //     />
    //     <Textbox
    //       className="patient-component__create__input"
    //       placeholder="Patient Surname"
    //     />
    //     <Textbox
    //       type="phone"
    //       className="patient-component__create__input"
    //       placeholder="Patient Telephone"
    //     />
    //     {/* TODO add tooltip to this so it makes more sense */}
    //     <Textbox
    //       type="date"
    //       className="patient-component__create__input"
    //       data-tip="Please enter the patients DOB<br /> (You may also type the date in here)"
    //     />
    //     <Dropdown
    //       options={prognoses}
    //       placeholder="Select a prognosis"
    //       onSelect={(v) => setPrognosis(v)}
    //       data-tip="Setting the prognosis to auto uses<br /> machine learning to determine the patients prognosis"
    //     />
    //     <Textbox
    //       className="patient-component__create__input"
    //       placeholder="Address Line"
    //     />
    //     <Textbox
    //       className="patient-component__create__input"
    //       placeholder="City"
    //     />
    //     <Textbox
    //       className="patient-component__create__input"
    //       placeholder="County"
    //     />
    //     <Textbox
    //       className="patient-component__create__input"
    //       placeholder="Postcode"
    //     />
    //     <Dropdown
    //       options={gpOptions}
    //       placeholder="Select patient's GP surgery"
    //       onSelect={console.log}
    //     />
    //     <Textbox
    //       className="patient-component__create__input"
    //       placeholder="Nurse Name"
    //     />
    //     <Textbox
    //       type="phone"
    //       className="patient-component__create__input"
    //       placeholder="Nurse Phone Number"
    //     />
    //     <Textbox
    //       type="text"
    //       className="patient-component__create__input"
    //       placeholder="Referred By"
    //     />
    //   </div>
    //   <div className="patient-component__create__assessment">
    //     <h2 className="patient-component__create__assessment__title">
    //       Assessment Area
    //     </h2>
    //     <Checkbox
    //       text="Patient has DNACPR in place"
    //       checked={dnacpr}
    //       onClick={() => setDnacpr(!dnacpr)}
    //       tooltip="If the patient has a Do not attempt cardiopulmonary<br /> resuscitation (DNACPR) in place, check this box"
    //       className="patient-component__create__assessment__checkbox"
    //     />
    //     <Checkbox
    //       text="Need for assistance with personal care"
    //       checked={dnacpr}
    //       onClick={() => setDnacpr(!dnacpr)}
    //       tooltip="(Always follow Infection Control procedures)"
    //       className="patient-component__create__assessment__checkbox"
    //     />
    //     <Checkbox
    //       text="Risk of pressure sores"
    //       checked={dnacpr}
    //       onClick={() => setDnacpr(!dnacpr)}
    //       tooltip="(Skin integrity may be compromised)"
    //       className="patient-component__create__assessment__checkbox"
    //     />
    //     <Checkbox
    //       text="Reduced mobility"
    //       checked={dnacpr}
    //       onClick={() => setDnacpr(!dnacpr)}
    //       tooltip="(poor balance, weakness, breathlessness)<br />Assistance needed with transfers<br />(Walking, toileting, in/out of bed)"
    //       className="patient-component__create__assessment__checkbox"
    //     />
    //     <Checkbox
    //       text="No longer able to weight bear"
    //       checked={dnacpr}
    //       onClick={() => setDnacpr(!dnacpr)}
    //       className="patient-component__create__assessment__checkbox"
    //     />
    //     <Checkbox
    //       text="Support from Care Assistant needed with regular medication"
    //       checked={dnacpr}
    //       onClick={() => setDnacpr(!dnacpr)}
    //       className="patient-component__create__assessment__checkbox"
    //     />
    //   </div>
    //   <div className="patient-component__create__diagnoses">
    //     <Textbox
    //       className="patient-component__create__input"
    //       placeholder="Enter Diagnosis"
    //       onChange={(e) => setDiagnosis(e.target.value)}
    //       value={diagnosis}
    //     />
    //     <div className="patient-component__create__diagnoses__actions">
    //       <button
    //         className="patient-component__create__button patient-component__create__button--add"
    //         onClick={() => handleDiagnosisAdd()}
    //       >
    //         <MdAddCircle />
    //         Add
    //       </button>
    //       <button
    //         className="patient-component__create__button patient-component__create__button--remove"
    //         onClick={() => handleDiagnosisRemove()}
    //       >
    //         <MdRemoveCircle />
    //         Remove
    //       </button>
    //     </div>
    //     <ul className="patient-component__create__diagnoses__list">
    //       <span>Patient Diagnoses</span>
    //       {diagnoses.length
    //         ? diagnoses.map((diagnosis) => (
    //             <li
    //               key={diagnosis}
    //               onClick={() => setSelectedDiagnosis(diagnosis)}
    //             >
    //               {diagnosis}
    //             </li>
    //           ))
    //         : null}
    //     </ul>
    //   </div>
    //   <ReactTooltip effect="solid" multiline={true} />
    // </ReactModal>

    <MultiModalProvider>
      <MultiModal
        overlayClassName="patient-component__modal"
        onClose={() => onClose()}
        visible={visible}
        pages={[
          {
            header: "General Patient Information",
            component: <GeneralData />
          },
          {
            header: "Diagnoses and Allergies",
            component: <Diagnoses />
          },
        ]}
      />
    </MultiModalProvider>

  );
};

export default PatientsCreate;
