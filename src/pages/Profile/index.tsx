import React, { useState } from "react";
import "./index.scss";
import Template from "../../components/Template";
import { MdDeleteForever } from "react-icons/md";
import Textbox from "../../components/Textbox";
import Form from "../../components/Form";

const Profile = () => {
  const [forename, setForename] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


  }

  return (
    <Template
      header="View and modify your profile details"
      className="profile-page"
      layout="none"
    >
      <div className="profile-page__badge">
        <h2 className="profile-page__badge__name">Sue Brazell</h2>
        <div className="profile-page__badge__photo">
          <img
            src="https://media.istockphoto.com/id/1346124946/photo/portrait-of-friendly-nurse-smiling-at-hospital.jpg?b=1&s=170667a&w=0&k=20&c=rDzH0QDk5frP7T_MB2Gf3Ga71s9xLlvRS-KalrVtgbs="
            alt=""
          />
          <button className="profile-page__badge__photo__remove">
            <MdDeleteForever />
          </button>
        </div>
        <button className="profile-page__badge__upload">
          Upload a new photo
        </button>
        <span className="profile-page__badge__last-update">
          Last Updated: <span>09/10/2022, 19:25:27</span>
        </span>
      </div>
      <Form className="profile-page__details" onSubmit={handleProfileUpdate}>
        <h2 className="profile-page__details__title">Edit Profile Details</h2>
        <div className="profile-page__details__fields">
          <Textbox  
            autoComplete="off"
            type="text"
            className="profile-page__details__field"
            label="First Name"
            value={forename}
            onChange={(v) => setForename(v.target.value)}
          />
          <Textbox  
            autoComplete="off"
            type="text"
            className="profile-page__details__field"
            label="Last Name"
            value={surname}
            onChange={(v) => setSurname(v.target.value)}
          />
          <Textbox  
            autoComplete="off"
            type="password"
            className="profile-page__details__field"
            label="Password"
            value={password}
            onChange={(v) => setPassword(v.target.value)}
          />
          <Textbox  
            autoComplete="off"
            type="password"
            className="profile-page__details__field"
            label="Confirm Password"
            value={confirm}
            onChange={(v) => setConfirm(v.target.value)}
          />
          <Textbox  
            autoComplete="off"
            type="email"
            className="profile-page__details__field"
            label="Email Address"
            value={emailAddress}
            onChange={(v) => setEmailAddress(v.target.value)}
          />
        </div>
        <button className="profile-page__details__update">
          Update profile
        </button>
      </Form>
    </Template>
  );
};

export default Profile;
