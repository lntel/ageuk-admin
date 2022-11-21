import React, { createRef, useContext, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import placeholderAvatar from "../../assets/images/avatar.svg";
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
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const { state } = useContext(AuthContext);
  
  const fileInput = createRef<HTMLInputElement>();

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
      const { forename, surname, emailAddress, lastUpdated, avatarFilename } =
        await response.json();

        console.log(avatarFilename)

      setForename(forename);
      setSurname(surname);
      setEmailAddress(emailAddress);
      setAvatar(avatarFilename);
      setLastUpdated(new Date(lastUpdated).toLocaleString());
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const files = e.target.files;

    if(!files || !files.length) return;

    const avatar = files[0];

    formData.append('avatar', avatar);

    const response = await request({
      url: '/staff/avatar/upload',
      type: 'POST',
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
      formData,
      disableDefaultHeaders: true
    });

    if(response.ok) {
      const { filename } = await response.json();

      setAvatar(filename);

      toast.success("Your profile picture has been updated");
    }
  }

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

  const deleteProfileAvatar = async () => {

    const response = await request({
      type: 'DELETE',
      url: '/staff/avatar',
      headers: {
        Authorization: `Bearer ${state.accessToken}`
      },
      shouldRefresh: true
    });

    if(response.ok) {

      const { lastUpdated } = await response.json();

      setLastUpdated(new Date(lastUpdated).toLocaleString());
      setAvatar("");

      toast.success('Your profile picture has been removed');
    }

    // TODO handle error
  }

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
            src={avatar ? `http://localhost:5000/uploads/${avatar}` : placeholderAvatar}
            crossOrigin="anonymous"
            alt="profile avatar"
          />
          <button className="profile-page__badge__photo__remove" onClick={() => deleteProfileAvatar()}>
            <MdDeleteForever />
          </button>
        </div>
        <button className="profile-page__badge__upload" onClick={() => fileInput.current?.click()}>
          Upload a new photo
        </button>
        <input type="file" ref={fileInput} style={{ display: 'none' }} accept="image/jpeg, image/jpg, image/png" onChange={handleAvatarUpload} />
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
