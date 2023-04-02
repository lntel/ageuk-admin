import React, { FC, useContext, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { CreateContext } from "../../context/CreateContext";
import Checkbox from "../Checkbox";
import Textbox from "../Textbox";

export interface AssessmentData {
  dnacpr: boolean;
  personalCare: boolean;
  riskOfPressure: boolean;
  pressureSore: boolean;
  reducedMobility: boolean;
  weightBear: boolean;
  careAssistant: boolean;
  painSymptom: boolean;
  marChart: boolean;
  medication: boolean;
  syringeDriver: boolean;
  syringeDriverSetupDate?: Date;
}

export interface AssessmentProps {
}

const Assessment: FC<AssessmentProps> = () => {
  const [data, setData] = useState<AssessmentData>({
    dnacpr: false,
    personalCare: false,
    riskOfPressure: false,
    pressureSore: false,
    reducedMobility: false,
    weightBear: false,
    careAssistant: false,
    painSymptom: false,
    marChart: false,
    medication: false,
    syringeDriver: false,
  });

  const { state, dispatch } = useContext(CreateContext);

  useEffect(() => {
    if(!state.data.assessment) return;

    setData(state.data.assessment);

  }, []);

  useEffect(() => {
    dispatch({
      type: "SET_DATA",
      state: {
        ...state,
        data: {
          ...state.data,
          assessment: data
        }
      }
    })
  }, [data]);

  return (
    <div className="patient-component__assessment">
      <Checkbox
        checked={data.dnacpr}
        text="Patient has DNACPR in place"
        onClick={() => setData({ ...data, dnacpr: !data.dnacpr })}
      />
      <Checkbox
        checked={data.personalCare}
        text="Need for assistance with personal care"
        tooltip="(always follow Infection Control procedures)"
        onClick={() => setData({ ...data, personalCare: !data.personalCare })}
      />
      <Checkbox
        checked={data.riskOfPressure}
        text="Risk of pressure sores"
        onClick={() =>
          setData({ ...data, riskOfPressure: !data.riskOfPressure })
        }
      />
      <Checkbox
        checked={data.pressureSore}
        text="Pressure sore(s)"
        tooltip="Please document this on page 5"
        onClick={() => setData({ ...data, pressureSore: !data.pressureSore })}
      />
      <Checkbox
        checked={data.reducedMobility}
        text="Reduced Mobility/Assistance needed with transfers"
        tooltip="(poor balance, weakness, breathlessness)"
        onClick={() => setData({ ...data, reducedMobility: !data.reducedMobility })}
      />
      <Checkbox
        checked={data.weightBear}
        text="Reduced Mobility"
        tooltip="no longer able to weight bear"
        onClick={() => setData({ ...data, weightBear: !data.weightBear })}
      />
      <Checkbox
        checked={data.careAssistant}
        text="Support from care Care Assistant needed with regular medication"
        onClick={() => setData({ ...data, careAssistant: !data.careAssistant })}
      />
      <Checkbox
        checked={data.painSymptom}
        text="Support needed with Pain and Symptom Control"
        onClick={() => setData({ ...data, painSymptom: !data.painSymptom })}
      />
      <Checkbox
        checked={data.marChart}
        text="MAR chart in place"
        onClick={() => setData({ ...data, marChart: !data.marChart })}
      />
      <Checkbox
        checked={data.medication}
        text="Medication"
        onClick={() => setData({ ...data, medication: !data.medication })}
      />
      <Checkbox
        checked={data.syringeDriver}
        text="Syringe driver"
        tooltip="If checked, please select the date the driver was set up"
        onClick={() => setData({ ...data, syringeDriver: !data.syringeDriver })}
      />
      {data.syringeDriver ? (
        <Textbox
          type="date"
          data-tip="Date of syringe driver setup"
          // https://stackoverflow.com/questions/12346381/set-date-in-input-type-date
          value={
            data.syringeDriverSetupDate
              ? new Date(data.syringeDriverSetupDate).toISOString().split("T")[0]
              : ""
          }
          onChange={(e) =>
            setData({
              ...data,
              syringeDriverSetupDate: new Date(e.target.value),
            })
          }
        />
      ) : null}
      <ReactTooltip effect="solid" multiline={true} />
    </div>
  );
};

export default Assessment;
