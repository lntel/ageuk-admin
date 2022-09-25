import classNames from "classnames";
import React, { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import Dropdown, { IDropdownOption } from "../Dropdown";
import Textbox from "../Textbox";
import request from "../../helpers/request";
import { MultiModalContext } from "../../context/MultiModalContext";
import ItemList from "../ItemList";
import { AuthContext } from "../../context/AuthContext";

export interface GeneralDataProps {}

const GeneralData: FC<GeneralDataProps> = ({}) => {
  const { state, setState } = useContext(MultiModalContext);
  const { state: authState } = useContext(AuthContext);

  const [contactName, setContactName] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [selectedContact, setSelectedContact] = useState<string>("");

  useEffect(() => {
    // Check if the context state is empty already and set contacts array as empty to avoid errors
    if (!Object.keys(state).length) {
      setState({
        contacts: [],
      });
    }

    getGpSurgeries();
  }, []);

  const getGpSurgeries = async () => {
    const response = await request({
      url: "/gp",
      headers: {
        Authorization: `Bearer ${authState.accessToken}`
      }
    });

    if (response.ok) {
      const data: any[] = await response.json();

      setGpOptions(data.map((gp) => ({ key: gp.surgeryName, value: gp.id })));
    }
  };

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
    if (!contactName.length || !contactNumber.length) return;

    const details = `${contactName} - ${contactNumber}`;

    const exists = state.contacts.find((c: string) => c == details);

    if (exists)
      return toast.error("This contact is already on the contact list");

    setContactName("");
    setContactNumber("");

    toast.success("Added contact to contact list");

    const tmpContacts = state.contacts || [];

    tmpContacts.push(details);

    setState({ ...state, contacts: tmpContacts });
    // setContacts([...contacts, details]);
  };

  const removeContact = () => {
    if (!selectedContact.length) return;

    toast.success("Removed contact from contact list");

    const tmpContacts = state.contacts.filter(
      (c: string) => c !== selectedContact
    );

    setState({ ...state, contacts: tmpContacts });
    // setContacts([...contacts.filter((contact) => contact != selectedContact)]);

    setSelectedContact("");
  };

  useEffect(() => {
    const lsName = "patientCreateData";
  }, []);

  return (
    <div className="patient-component__general">
      <div className="patient-component__general__textfields">
        {/* TODO find out exactly who can refer the service */}
        <Textbox
          type="text"
          className="patient-component__input"
          placeholder="Referred By"
          data-tip="E.g. District Nurse/Doctor"
          value={state.referredBy}
          onChange={(e) => setState({ ...state, referredBy: e.target.value })}
        />
        <Textbox
          type="date"
          className="patient-component__input"
          data-tip="Date of start of care provision"
          value={state.startDate ? state.startDate.toISOString().split('T')[0] : ""}
          onChange={(e) => setState({ ...state, startDate: new Date(e.target.value) })}
        />
        <Textbox
          className="patient-component__input"
          placeholder="Patient First Name"
          value={state.firstName}
          onChange={(e) => setState({ ...state, firstName: e.target.value })}
        />
        <Textbox
          className="patient-component__input"
          placeholder="Patient Middle Name(s)"
          value={state.middleNames}
          onChange={(e) => setState({ ...state, middleNames: e.target.value })}
        />
        <Textbox
          className="patient-component__input"
          placeholder="Patient Surname"
          value={state.surname}
          onChange={(e) => setState({ ...state, surname: e.target.value })}
        />
        <Textbox
          className="patient-component__input"
          placeholder="Address Line"
          value={state.addressLine}
          onChange={(e) => setState({ ...state, addressLine: e.target.value })}
        />
        <Textbox
          className="patient-component__input"
          placeholder="City"
          value={state.city}
          onChange={(e) => setState({ ...state, city: e.target.value })}
        />
        <Textbox
          className="patient-component__input"
          placeholder="County"
          value={state.county}
          onChange={(e) => setState({ ...state, county: e.target.value })}
        />
        <Textbox
          className="patient-component__input"
          placeholder="Postcode"
          value={state.postcode}
          onChange={(e) => setState({ ...state, postcode: e.target.value })}
        />
        <Textbox
          type="phone"
          className="patient-component__input"
          placeholder="Patient Telephone"
          value={state.telephoneNumber}
          onChange={(e) =>
            setState({ ...state, telephoneNumber: e.target.value })
          }
        />
        <Textbox
          type="date"
          className="patient-component__input"
          data-tip="Please enter the patients DOB<br /> (You may also type the date in here)"
          value={state.dob ? state.dob.toISOString().split('T')[0] : ""}
          onChange={(e) => setState({ ...state, dob: new Date(e.target.value) })}
        />
        <Textbox
          className="patient-component__input"
          placeholder="NHS Number"
          value={state.id}
          onChange={(e) => setState({ ...state, id: e.target.value })}
        />
        <Dropdown
          options={prognoses}
          placeholder="Select a prognosis"
          selected={state.prognosis}
          onSelect={(v) => setState({ ...state, prognosis: v })}
          data-tip="Setting the prognosis to auto uses<br /> machine learning to determine the patients prognosis"
        />
        <Dropdown
          options={gpOptions}
          placeholder="Select patient's GP surgery"
          selected={state.gpId}
          onSelect={v => setState({ ...state, gpId: Number(v) })}
        />
        <Textbox
          type="text"
          className="patient-component__input"
          placeholder="N.O.K Details"
          data-tip="Please enter the fullname and<br/> contact number of the patients next of kin<br/>e.g. (Tracy Exeter - 07836 738129)"
          value={state.nokDetails}
          onChange={(e) => setState({ ...state, nokDetails: e.target.value })}
        />
        <Textbox
          type="text"
          className="patient-component__input"
          placeholder="First point of contact"
          data-tip="This is only necessary if the first point<br/> of contact differs from the patients N.O.K"
          value={state.firstContact}
          onChange={(e) => setState({ ...state, firstContact: e.target.value })}
        />
      </div>
      <ItemList
        items={state.contacts}
        listTitle="Additional Contacts"
        itemName="Contact"
        onItemAdded={() => addContact()}
        onItemRemoved={() => removeContact()}
        onItemSelected={(item) => setSelectedContact(item)}
        selectedItem={selectedContact}
      >
        <Textbox
          type="text"
          className="patient-component__input"
          placeholder="Contact Name"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
        />
        <Textbox
          type="text"
          className="patient-component__input"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </ItemList>
      {/* <div className="patient-component__general__contacts">
        <h2 className="patient-component__general__contacts__header">
          Additional Contacts
        </h2>
        <div className="patient-component__general__contacts__inputs">
          <Textbox
            type="text"
            className="patient-component__input"
            placeholder="Contact Name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
          <Textbox
            type="text"
            className="patient-component__input"
            placeholder="Contact Number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          <button
            className="patient-component__button patient-component__button--success"
            onClick={() => addContact()}
          >
            Add Contact
          </button>
          <button
            className="patient-component__button patient-component__button--error"
            onClick={() => removeContact()}
          >
            Remove Contact
          </button>
        </div>
        <ul className="patient-component__general__contacts__list">
          {state.contacts && state.contacts.length
            ? state.contacts.map((contact: string) => (
                <li
                  onClick={() => setSelectedContact(contact)}
                  className={classNames(
                    "patient-component__general__contact",
                    contact == selectedContact
                      ? "patient-component__general__contact--selected"
                      : null
                  )}
                >
                  {contact}
                </li>
              ))
            : null}
        </ul>
      </div> */}
      <ReactTooltip effect="solid" multiline={true} />
    </div>
  );
};

export default GeneralData;
