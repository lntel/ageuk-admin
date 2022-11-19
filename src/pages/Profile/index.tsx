import React, { useContext, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Form from "../../components/Form";
import Template from "../../components/Template";
import Textbox from "../../components/Textbox";
import { AuthContext } from "../../context/AuthContext";
import request from "../../helpers/request";
import "./index.scss";

const Profile = () => {
  const [forename, setForename] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const { state } = useContext(AuthContext);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    const response = await request({
      url: "/auth/profile",
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
    });

    if (response.ok) {
      const { forename, surname, emailAddress, lastUpdated } =
        await response.json();

      setForename(forename);
      setSurname(surname);
      setEmailAddress(emailAddress);
      setLastUpdated(new Date(lastUpdated).toLocaleString());
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await request({
      url: '/auth/profile',
      type: 'PATCH',
      data: {
        forename,
        surname,
        emailAddress,
        password
      },
      headers: {
        Authorization: `Bearer ${state.accessToken}`
      }
    });

    if(response.ok) {

      const { lastUpdated } = await response.json();

      setLastUpdated(new Date(lastUpdated).toLocaleString());

      toast.success("Your profile has been updated");
    } else {
      if(response.status === 403) {
        const { message } = await response.json();

        return toast.error(message);
      }
    }

    // TODO handle error
  };

  return (
    <Template
      header="View and modify your profile details"
      className="profile-page"
      layout="none"
    >
      <div className="profile-page__badge">
        <h2 className="profile-page__badge__name">{forename} {surname}</h2>
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
          Last Updated: <span>{lastUpdated}</span>
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
            type="email"
            className="profile-page__details__field"
            label="Email Address"
            value={emailAddress}
            onChange={(v) => setEmailAddress(v.target.value)}
          />
          <Textbox
            autoComplete="off"
            type="password"
            className="profile-page__details__field"
            label="Password"
            data-tip="Please enter your current password to update your profile"
            value={password}
            onChange={(v) => setPassword(v.target.value)}
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
