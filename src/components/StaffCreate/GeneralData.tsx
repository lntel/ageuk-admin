import React, { FC, FormEvent, useContext, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { AuthContext } from "../../context/AuthContext";
import { CreateContext } from "../../context/CreateContext";
import request from "../../helpers/request";
import { IRole } from "../../types";
import Dropdown from "../Dropdown";
import Form from "../Form";
import Textbox from "../Textbox";

export interface GeneralDataProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const GeneralData: FC<GeneralDataProps> = ({ onSubmit }) => {
  const [forename, setForename] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<IRole>();
  const [roles, setRoles] = useState<IRole[]>([]);

  const { state, dispatch } = useContext(CreateContext);
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {

    if(state.mode === "UPDATE") {  
      setForename(state.selected.forename)
      setSurname(state.selected.surname)
      setDob(state.selected.dob)
      setEmailAddress(state.selected.emailAddress)
      setSelectedRole(state.selected.role);
    }

    getRoles();
  }, []);

  useEffect(() => {

    dispatch({
      type: "SET_DATA",
      state: {
        ...state,
        data: {
          ...state.data,
          forename,
          surname,
          dob,
          emailAddress,
          password,
          roleId: selectedRole?.id
        }
      }
    });
    
  }, [forename, surname, dob, emailAddress, password, selectedRole])
  
  const getRoles = async () => {
    const response = await request({
      type: "GET",
      url: "/roles",
      headers: {
        Authorization: `Bearer ${authState.accessToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();

      setRoles(data);

      if(state.mode === "CREATE")
        setSelectedRole(data[0])
    }
  };

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {

    dispatch({
      type: "SET_DATA",
      state: {
        ...state,
        data: {
          forename,
          surname,
          dob,
          emailAddress,
          password,
          roleId: selectedRole?.id
        }
      }
    })

    onSubmit(e);
  }

  const handleSelected = (value: string) => {
    setSelectedRole(roles.find((role) => role.id == value));
  };

  const handleStateChange = (key: string, value: string) => {
    dispatch({
      type: "SET_DATA",
      state: {
        ...state,
        data: {
          ...state.data,
          [key]: value
        }
      }
    })
  };

  return (
    <Form onSubmit={handleSumbit} autoComplete="off">
      <Textbox
        type="text"
        placeholder="First Name"
        className="staff-component__input"
        onChange={(e) => setForename(e.target.value)}
        value={forename}
        autoComplete="off"
      />
      <Textbox
        type="text"
        placeholder="Surname"
        className="staff-component__input"
        onChange={(e) => setSurname(e.target.value)}
        value={surname}
      />
      <Textbox
        type="date"
        data-tip="Date of birth"
        className="staff-component__input"
        onChange={(e) => setDob(e.target.value)}
        value={dob}
      />
      <Textbox
        type="text"
        placeholder="Email Address"
        className="staff-component__input"
        onChange={(e) => setEmailAddress(e.target.value)}
        value={emailAddress}
      />
      <Textbox
        type="password"
        placeholder="Password"
        className="staff-component__input"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <Dropdown
        options={[
          ...roles.map((role) => ({
            key: role.name,
            value: role.id,
          })),
        ]}
        selected={selectedRole ? selectedRole.id : "0"}
        // selected={"7"}
        data-tip="Select an access role for this staff member"
        onSelect={handleSelected}
      />
      <button type="submit" className="staff-component__submit">{ state.mode === "UPDATE" ? "Update" : "Create" } Staff</button>
      <ReactTooltip />
    </Form>
  );
};

export default GeneralData;
