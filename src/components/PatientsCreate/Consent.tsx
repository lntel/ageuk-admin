import React, { useState } from "react";
import Checkbox from "../Checkbox";
import Textbox from "../Textbox";

const Consent = () => {
  const [personal, setPersonal] = useState<boolean>(false);
  const [pressure, setPressure] = useState<boolean>(false);
  const [continence, setContinence] = useState<boolean>(false);
  const [oral, setOral] = useState<boolean>(false);
  const [equipment, setEquipment] = useState<boolean>(false);
  const [medication, setMedication] = useState<boolean>(false);

  return (
    <div className="patient-component__consent">
      <ul className="patient-component__consent__checklist">
          <Checkbox
            text="Personal Care"
            checked={personal}
            onClick={() => setPersonal(!personal)}
          />
          <Checkbox
            text="Pressure Care"
            checked={pressure}
            onClick={() => setPressure(!pressure)}
          />
          <Checkbox
            text="Continence Care"
            checked={continence}
            onClick={() => setContinence(!continence)}
          />
          <Checkbox
            text="Mouth/oral Care"
            checked={oral}
            onClick={() => setOral(!oral)}
          />
          <Checkbox
            text="Equipment to aid personal Care"
            checked={equipment}
            onClick={() => setEquipment(!equipment)}
          />
          <Checkbox
            text="Administration of medication"
            checked={medication}
            onClick={() => setMedication(!medication)}
          />
        <Textbox type="text" placeholder="Additional care requirement proposals" className="patient-component__consent__input" />
      </ul>
    </div>
  );
};

export default Consent;
