import React, { FormEvent, useContext, useEffect, useState } from "react";
import { FC } from "react";
import { GpContext } from "../../context/GpContext";
import { IGpSurgery } from "../../types";
import Form from "../Form";
import Textbox from "../Textbox";

export interface SubmissionData {
  surgeryName: string;
  phoneNumber: string;
  address: string;
}

export interface GeneralDataProps {
  data?: IGpSurgery;
  onSubmit: (data: SubmissionData) => void;
} 

const GeneralData: FC<GeneralDataProps> = ({ onSubmit, data }) => {

  const { state } = useContext(GpContext);

  const [name, setName] = useState<string>(state.selectedGp?.surgeryName || "");
  const [address, setAddress] = useState<string>(state.selectedGp?.address || "");
  const [number, setNumber] = useState<string>(state.selectedGp?.phoneNumber || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      surgeryName: name,
      phoneNumber: number,
      address
    });
  }

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Textbox
        type="text"
        placeholder="Surgery Name"
        className="gp-component__input"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <Textbox
        type="text"
        placeholder="Surgery Address"
        className="gp-component__input"
        value={address}
        onChange={e => setAddress(e.target.value)}
        required
      />
      <Textbox
        type="phone"
        placeholder="Telephone Number"
        className="gp-component__input"
        value={number}
        onChange={e => setNumber(e.target.value)}
        required
      />
      <button className="gp-component__submit" type="submit">
        Create GP Surgery
      </button>
    </Form>
  );
};

export default GeneralData;
