import React, { useContext, useEffect, useState } from "react";
import { MdNotificationsNone, MdOutlineArrowDropDown } from "react-icons/md";
import Textbox from "../Textbox";

import "./index.scss";
import { Modal } from "../Modal";
import { INotification } from "../../types";
import request, { Sse } from "../../helpers/request";
import errorHandler from "../../helpers/errorHandler";
import { AuthContext } from "../../context/AuthContext";

export const Topbar = () => {
  const [notifyCount, setNotifyCount] = useState<number>(12);
  const [notifyVisible, setNotifyVisible] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const { state } =  useContext(AuthContext);

  let eventSource;

  useEffect(() => {
    getNotifications();
  }, []);

  // ! Due to how react behaves, there doesn't seem to be a better way to do this
  useEffect(() => {
    const eventSource = Sse("/notifications/sse", state.accessToken!);

    eventSource.onopen = () => {
      console.log("connected")
    }
  
    eventSource.onmessage = ({ data }) => {
    
      if(!notifications.length) return;
  
      const newNotifications = JSON.parse(data);
  
      const result: INotification[] = newNotifications.filter((d: any) => {
        return !notifications.some(n => n.id == d.id);
      });
        
      if(!result.length) return;
  
      setNotifications([
        ...notifications,
        ...result
      ]);
  
      setNotifyCount(notifyCount + result.filter(r => r.read != null).length);
    };

    eventSource.onerror = (event) => {
      console.log(event)
    }
  
    return () => {
      eventSource.close();
    };
  }, [notifications])
  
  
  const getNotifications = async () => {
    const response = await request({
      url: "/notifications",
      headers: {
        Authorization: `Bearer ${state.accessToken}`
      }
    });

    if (!response.ok) {
      return errorHandler(response);
    }

    const result = await response.json();

    const unread = (result as INotification[]).filter(n => !n.read && n.read != null).length;

    setNotifications(result);
    setNotifyCount(unread);
  };

  // ? try to achieve this with actual reads
  // useEffect(() => {
  //   if (!notifyVisible && notifyCount) return;

  //   setNotifyCount(0);
  // }, [notifyVisible]);

  const markAsRead = (id: string) => {

    setNotifyCount(count => count - 1);

    setNotifications(messages => [
      ...messages.filter(m => m.id !== id),
      {
        ...messages.find(m => m.id === id)!,
        read: true
      }
    ])
  }

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
        <div className="topbar__actions__profile">
          <img
            src="https://cdn-prod.medicalnewstoday.com/content/images/articles/147/147142/nursing-is-a-varied-and-respected-profession.jpg"
            alt=""
          />
          <span className="topbar__actions__profile__name">Sue Brazell</span>
          <MdOutlineArrowDropDown />
        </div>
      </div>
    </div>
  );
};
