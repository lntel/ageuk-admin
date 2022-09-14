import React, { FC, useContext, useEffect, useState } from "react";
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
  const [selectedRole, setSelectedRole] = useState<IRole>();
  const [roles, setRoles] = useState<IRole[]>([]);

  const { state, dispatch } = useContext(CreateContext);
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {

    getRoles();

  }, []);
  

  useEffect(() => {
    if (!selectedRole) return;

    dispatch({
      type: "SET_DATA",
      state: {
        ...state,
        data: {
          ...state.data,
          roleId: selectedRole.id,
        }
      }
    });
  }, [selectedRole]);

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

      setSelectedRole(data[0]);
    }
  };

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
    <Form onSubmit={onSubmit} autoComplete="off">
      <Textbox
        type="text"
        placeholder="First Name"
        className="staff-component__input"
        onChange={(e) => handleStateChange("forename", e.target.value)}
      />
      <Textbox
        type="text"
        placeholder="Surname"
        className="staff-component__input"
        onChange={(e) => handleStateChange("surname", e.target.value)}
      />
      <Textbox
        type="date"
        data-tip="Date of birth"
        className="staff-component__input"
        onChange={(e) => handleStateChange("dob", e.target.value)}
      />
      <Textbox
        type="text"
        placeholder="Email Address"
        className="staff-component__input"
        onChange={(e) => handleStateChange("emailAddress", e.target.value)}
      />
      <Textbox
        type="password"
        placeholder="Password"
        className="staff-component__input"
        
        onChange={(e) => handleStateChange("password", e.target.value)}
      />
      <Dropdown
        options={[
          ...roles.map((role) => ({
            key: role.name,
            value: role.id,
          })),
        ]}
        value={selectedRole ? selectedRole?.id : "0"}
        data-tip="Select an access role for this staff member"
        onSelect={handleSelected}
      />
      <button type="submit" className="staff-component__submit">{ state.mode === "UPDATE" ? "Update" : "Create" } Staff</button>
      <ReactTooltip />
    </Form>
  );
};

export default GeneralData;
