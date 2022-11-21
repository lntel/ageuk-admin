import { useContext, useEffect, useState } from "react";
import { MdNotificationsNone, MdOutlineArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import placeholderAvatar from "../../assets/images/avatar.svg";
import { AuthContext } from "../../context/AuthContext";
import errorHandler from "../../helpers/errorHandler";
import request, { Sse } from "../../helpers/request";
import { INotification } from "../../types";
import { Modal } from "../Modal";
import SettingsModal from "../SettingsModal";
import Textbox from "../Textbox";
import "./index.scss";

export const Topbar = () => {
  const [notifyCount, setNotifyCount] = useState<number>(12);
  const [notifyVisible, setNotifyVisible] = useState<boolean>(false);
  const [profileVisible, setProfileVisible] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [firstname, setFirstname] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const { state, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  let eventSource;

  useEffect(() => {
    getProfileDetails();
    getNotifications();
  }, []);

  // ! Due to how react behaves, there doesn't seem to be a better way to do this
  useEffect(() => {
    const eventSource = Sse("/notifications/sse", state.accessToken!);

    eventSource.onopen = () => {
      console.log("connected");
    };

    eventSource.onmessage = ({ data }) => {
      if (!notifications.length) return;

      const newNotifications = JSON.parse(data);

      const result: INotification[] = newNotifications.filter((d: any) => {
        return !notifications.some((n) => n.id == d.id);
      });

      if (!result.length) return;

      setNotifications([...notifications, ...result]);

      setNotifyCount(notifyCount + result.filter((r) => r.read != null).length);
    };

    eventSource.onerror = (event) => {
      console.log(event);
    };

    return () => {
      eventSource.close();
    };
  }, [notifications]);

  const getProfileDetails = async () => {

    const response = await request({
      url: '/auth/profile',
      headers: {
        Authorization: `Bearer ${state.accessToken}`
      }
    });

    if(response.ok) {

      const { forename, surname, avatarFilename } = await response.json();

      setFirstname(forename);
      setSurname(surname);
      setAvatar(avatarFilename);
    }

  }

  const handleLogout = () => {
    toast.success("Signing out, see you next time");

    const timeout = setTimeout(() => {
      dispatch({
        type: "LOGOUT",
        state: {},
      });

      navigate("/");

      clearTimeout(timeout);
    }, 1000);
  };

  const getNotifications = async () => {
    const response = await request({
      url: "/notifications",
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
    });

    if (!response.ok) {
      return errorHandler(response);
    }

    const result = await response.json();

    const unread = (result as INotification[]).filter(
      (n) => !n.read && n.read != null
    ).length;

    setNotifications(result);
    setNotifyCount(unread);
  };

  // ? try to achieve this with actual reads
  // useEffect(() => {
  //   if (!notifyVisible && notifyCount) return;

  //   setNotifyCount(0);
  // }, [notifyVisible]);

  const markAsRead = (id: string) => {
    setNotifyCount((count) => count - 1);

    setNotifications((messages) => [
      ...messages.filter((m) => m.id !== id),
      {
        ...messages.find((m) => m.id === id)!,
        read: true,
      },
    ]);
  };

  return (
    <div className="topbar">
      <Textbox
        type="text"
        placeholder="Search patients"
        className="topbar__search"
        data-tip="Enter some information about the patient you<br /> want to find (e.g. first name, surname, dob)"
      />
      <div className="topbar__actions">
        <div className="topbar__actions__notifications">
          <MdNotificationsNone
            className="topbar__actions__notification"
            onClick={() => setNotifyVisible(!notifyVisible)}
          />
          {notifyCount ? (
            <span className="topbar__actions__notifications__count">
              {notifyCount}
            </span>
          ) : null}
        </div>
        <Modal
          visible={notifyVisible}
          title="Notifications"
          notifications={notifications}
          onRead={markAsRead}
        />
        <div
          className="topbar__actions__profile"
          onClick={() => setProfileVisible(!profileVisible)}
        >
          <img
            src={avatar ? `http://localhost:5000/uploads/${avatar}` : placeholderAvatar}
            crossOrigin="anonymous"
            alt=""
          />
          <span className="topbar__actions__profile__name">{firstname} {surname}</span>
          <MdOutlineArrowDropDown />
        </div>
        <SettingsModal visible={profileVisible} onLogout={handleLogout} />
      </div>
    </div>
  );
};
