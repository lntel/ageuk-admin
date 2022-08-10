import React, { FC, useState } from "react";
import ReactTooltip from "react-tooltip";
import Dropdown, { IDropdownOption } from "../Dropdown";
import Textbox from "../Textbox";

export interface GeneralDataProps {}

const GeneralData: FC<GeneralDataProps> = ({}) => {
  // * Prognosis is weeks by default
  const [prognosis, setPrognosis] = useState<string>("weeks");
  const [nhsNumber, setNhsNumber] = useState<string | null>(null);
  const [contactName, setContactName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [contacts, setContacts] = useState<string[]>([]);

  const [gpOptions, setGpOptions] = useState<IDropdownOption[]>([
    {
      key: "Whitefields Surgery",
      value: "2",
    },
    {
      key: "St Luke's Primary Care Centre",
      value: "5",
    },
  ]);

  const [prognoses, setPrognoses] = useState<IDropdownOption[]>([
    {
      key: "Weeks",
      value: "weeks",
    },
    {
      key: "Months",
      value: "months",
    },
    {
      key: "Years",
      value: "years",
    },
  ]);

  const addContact = () => {

    const details = `${contactName} - ${contactNumber}`;

    setContacts([
      ...contacts,
      details
    ]);
  }
  
  const removeContact = () => {

  }

  return (
    <div className="patient-component__general">
      <div className="patient-component__general__textfields">
        {/* TODO find out exactly who can refer the service */}
        <Textbox
          type="text"
          className="patient-component__input"
          placeholder="Referred By"
          data-tip="E.g. District Nurse/Doctor"
        />
        <Textbox
          type="date"
          className="patient-component__input"
          data-tip="Date of start of care provision"
        />
        <Textbox
          className="patient-component__input"
          placeholder="Patient First Name"
        />
        <Textbox
          className="patient-component__input"
          placeholder="Patient Middle Name(s)"
        />
        <Textbox
          className="patient-component__input"
          placeholder="Patient Surname"
        />
        <Textbox
          className="patient-component__input"
          placeholder="Address Line"
        />
        <Textbox className="patient-component__input" placeholder="City" />
        <Textbox className="patient-component__input" placeholder="County" />
        <Textbox className="patient-component__input" placeholder="Postcode" />
        <Textbox
          type="phone"
          className="patient-component__input"
          placeholder="Patient Telephone"
        />
        <Textbox
          type="date"
          className="patient-component__input"
          data-tip="Please enter the patients DOB<br /> (You may also type the date in here)"
        />
        <Textbox
          className="patient-component__input"
          placeholder="NHS Number"
          onChange={(e) => setNhsNumber(e.target.value)}
        />
        <Dropdown
          options={prognoses}
          placeholder="Select a prognosis"
          onSelect={(v) => setPrognosis(v)}
          data-tip="Setting the prognosis to auto uses<br /> machine learning to determine the patients prognosis"
        />
        <Dropdown
          options={gpOptions}
          placeholder="Select patient's GP surgery"
          onSelect={console.log}
        />
        <Textbox
          className="patient-component__input"
          placeholder="Nurse Name"
        />
        <Textbox
          type="phone"
          className="patient-component__input"
          placeholder="Nurse Phone Number"
        />
        <Textbox
          type="text"
          className="patient-component__input"
          placeholder="N.O.K Details"
          data-tip="Please enter the fullname and<br/> contact number of the patients next of kin<br/>e.g. (Tracy Exeter - 07836 738129)"
        />
        <Textbox
          type="text"
          className="patient-component__input"
          placeholder="First point of contact"
          data-tip="This is only necessary if the first point<br/> of contact differs from the patients N.O.K"
        />
      </div>
      <div className="patient-component__general__contacts">
        <h2 className="patient-component__general__contacts__header">
          Additional Contacts
        </h2>
        <div className="patient-component__general__contacts__inputs">
          <Textbox
            type="text"
            className="patient-component__input"
            placeholder="Contact Name"
            onChange={(e) => setContactName(e.target.value)}
          />
          <Textbox
            type="text"
            className="patient-component__input"
            placeholder="Contact Number"
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <button className="patient-component__button patient-component__button--success" onClick={() => addContact()}>
            Add Contact
          </button>
          <button className="patient-component__button patient-component__button--error" onClick={() => removeContact()}>
            Remove Contact
          </button>
        </div>
        <ul className="patient-component__general__contacts__list">
          { contacts.length ? contacts.map(contact => 
            <li>
              { contact }
            </li>
          ) : null }
        </ul>
      </div>
      <ReactTooltip effect="solid" multiline={true} />
    </div>
  );
};

export default GeneralData;
