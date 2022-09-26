import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CreateContext } from "../../context/CreateContext";
import { MultiModalContext } from "../../context/MultiModalContext";
import ItemList from "../ItemList";
import Textbox from "../Textbox";

const Diagnoses = () => {

  // Grab multimodal context
  const { state, dispatch } = useContext(CreateContext);

  // Diagnoses state
  const [diagnoses, setDiagnoses] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string>("");

  // Allergy state
  const [allergies, setAllergies] = useState<string[]>([]);
  const [allergy, setAllergy] = useState<string>("");
  const [selectedAllergy, setSelectedAllergy] = useState<string>("");

  useEffect(() => {

    setAllergies(state.data.allergies ?? []);
    setDiagnoses(state.data.diagnoses ?? []);

  }, []);

  useEffect(() => {

    dispatch({
      type: "SET_DATA",
      state: {
        ...state,
        data: {
          ...state.data,
          diagnoses,
          allergies
        }
      }
    })

  }, [allergies, diagnoses]);

  const addDiagnosis = () => {

    setDiagnosis("");

    const exists = diagnoses.find(d => d === diagnosis);

    if(exists) return toast.error("Diagnosis is already in the list");
    
    toast.success("Diagnosis Added");

    setDiagnoses([...diagnoses, diagnosis]);
  };

  const removeDiagnosis = () => {

    toast.success("Diagnosis removed from the list");

    setDiagnoses([...diagnoses.filter((d) => d !== selectedDiagnosis)]);
  };
  
  const addAllergy = () => {

    setAllergy("");

    const exists = allergies.find(a => a === allergy);

    if(exists) return toast.error("Allergy is already in the list");
    
    toast.success("Allergy Added");

    setAllergies([...allergies, allergy]);
  };

  const removeAllergy = () => {

    toast.success("Allergy removed from the list");

    setAllergies([...allergies.filter(a => a !== selectedAllergy)]);
  };

  return (
    <div className="patient-component__diagnoses">
      <ItemList
        listTitle="Patient Diagnoses"
        items={diagnoses}
        onItemAdded={() => addDiagnosis()}
        onItemRemoved={() => removeDiagnosis()}
        onItemSelected={(item) => setSelectedDiagnosis(item)}
        selectedItem={selectedDiagnosis}
        itemName="Diagnosis"
        className="patient-component__diagnoses__list"
      >
        <Textbox
          className="patient-component__diagnoses__input"
          value={diagnosis}
          placeholder="Diagnosis"
          onChange={(e) => setDiagnosis(e.target.value)}
        />
      </ItemList>
      <ItemList
        listTitle="Patient Allergies"
        items={allergies}
        onItemAdded={() => addAllergy()}
        onItemRemoved={() => removeAllergy()}
        onItemSelected={item => setSelectedAllergy(item)}
        selectedItem={selectedAllergy}
        itemName="Allergy"
        className="patient-component__diagnoses__list"
      >
        <Textbox
          className="patient-component__diagnoses__input"
          value={allergy}
          placeholder="Allergy"
          onChange={(e) => setAllergy(e.target.value)}
        />
      </ItemList>
    </div>
  );
};

export default Diagnoses;
