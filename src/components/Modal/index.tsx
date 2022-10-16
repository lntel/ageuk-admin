import classNames from "classnames";
import { FC, useContext } from "react";
import { InView } from "react-intersection-observer";
import { AuthContext } from "../../context/AuthContext";
import request from "../../helpers/request";
import { INotification, NotificationVerbEnum } from "../../types";
import "./index.scss";

// https://www.npmjs.com/package/react-intersection-observer

export interface ModalProps {
  className?: string;
  visible: boolean;
  title?: string;
  notifications: INotification[];
  onRead: (id: string) => void;
}

export const Modal: FC<ModalProps> = ({
  className,
  visible,
  title,
  notifications,
  onRead,
}) => {
  const { state } = useContext(AuthContext);

  const resolveVerb = (verb: NotificationVerbEnum) => {
    switch (verb) {
      case NotificationVerbEnum.CREATE:
        return "added a";

      case NotificationVerbEnum.UPDATE:
        return "updated a";

      case NotificationVerbEnum.DELETE:
        return "deleted a";
    }
  };

  // https://stackoverflow.com/a/3177838
  const resolveTimestamp = (date: Date) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );

    let interval = seconds / 31536000;

    if (interval > 1) return `${Math.floor(interval)} years`;

    interval = seconds / 2592000;

    if (interval > 1) return `${Math.floor(interval)} months`;

    interval = seconds / 86400;

    if (interval > 1) return `${Math.floor(interval)} days`;

    interval = seconds / 3600;

    if (interval > 1) return `${Math.floor(interval)} hours`;

    interval = seconds / 60;

    if (interval > 1) return `${Math.floor(interval)} minutes`;

    return `${Math.floor(seconds)} seconds`;
  };

  const markAsRead = async (id: string) => {
    const response = await request({
      type: "PATCH",
      url: `/notifications/${id}`,
      headers: {
        Authorization: `Bearer ${state.accessToken}`,
      },
    });

    if (response.ok) {
      onRead(id);
    }
  };

  return (
    <div
      className={classNames(
        visible ? "modal modal--visible" : "modal",
        className
      )}
    >
      <div className="modal__header">
        <h1 className="modal__title">{title}</h1>
        <button className="modal__mark-button">Mark all as read</button>
      </div>
      <div className="modal__notifications">
        {notifications && notifications.length
          ? notifications
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map(
                (notification) => (
                  <InView
                    as="div"
                    delay={2500}
                    className="modal__notification"
                    onChange={(inview, entry) =>
                      inview && !notification.read
                        ? markAsRead(notification.id)
                        : null
                    }
                    key={notification.id}
                    initialInView={true}
                    triggerOnce={true}
                  >
                    {!notification.read ? (
                      <div className="modal__notification__dot"></div>
                    ) : null}
                    {/* <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="" className="modal__notification__avatar" /> */}
                    <div className="modal__notification__divider">
                      <p className="modal__notification__message">
                        {notification.content}
                      </p>
                      <p className="modal__notification__timestamp">
                        {resolveTimestamp(notification.createdAt)} ago
                      </p>
                    </div>
                  </InView>
                )
                // <div className="modal__notification" key={notification.id}>
                // </div>
              )
          : null}
        {/* <div className="modal__notification">
            <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="" className="modal__notification__avatar" />
            <div className="modal__notification__divider">
              <p className="modal__notification__message">
                <span className="modal__notification__message__important">Sue Brazell</span> added a new <span className="modal__notification__message__important">patient</span>
              </p>
              <p className="modal__notification__timestamp">
                12m ago
              </p>
            </div>
          </div>
          <div className="modal__notification">
            <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="" className="modal__notification__avatar" />
            <div className="modal__notification__divider">
              <p className="modal__notification__message">
                <span className="modal__notification__message__important">Sue Brazell</span> added a new <span className="modal__notification__message__important">patient</span>
              </p>
              <p className="modal__notification__timestamp">
                12m ago
              </p>
            </div>
          </div> */}
      </div>
    </div>
  );
};
