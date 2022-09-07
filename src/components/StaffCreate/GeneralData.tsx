import React, { FC, useContext, useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { AuthContext } from "../../context/AuthContext";
import {
  MultiModalContext,
  MultiModalContextType,
} from "../../context/MultiModalContext";
import request from "../../helpers/request";
import { IRole, IStaff } from "../../types";
import Dropdown from "../Dropdown";
import Form from "../Form";
import Textbox from "../Textbox";

export interface GeneralDataProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const GeneralData: FC<GeneralDataProps> = ({ onSubmit }) => {
  const [selectedRole, setSelectedRole] = useState<IRole>();
  const [roles, setRoles] = useState<IRole[]>([]);

  const { state, setState } =
    useContext<MultiModalContextType<IStaff>>(MultiModalContext);
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    if (!selectedRole) return;

    setState({
      ...state,
      role: selectedRole,
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
      setRoles(await response.json());
    }
  };

  const handleSelected = (value: string) => {
    setSelectedRole(roles.find((role) => role.id == value));
  };

  const handleStateChange = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  return (
    <Form onSubmit={onSubmit}>
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
      <button className="staff-component__submit">Create Staff</button>
      <ReactTooltip />
    </Form>
  );
};

export default GeneralData;
