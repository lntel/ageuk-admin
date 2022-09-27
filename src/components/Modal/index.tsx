import classNames from 'classnames'
import './index.scss'
import React, { FC } from 'react'
import { INotification, NotificationVerbEnum } from '../../types';

export interface ModalProps {
    className?: string;
    visible: boolean;
    title?: string;
    notifications: INotification[];
}

export const Modal: FC<ModalProps> = ({ className, visible, title, notifications }) => {

  const resolveVerb = (verb: NotificationVerbEnum) => {
    switch(verb) {
      case NotificationVerbEnum.CREATE:
        return "added a"

      case NotificationVerbEnum.UPDATE:
        return "updated a";

      case NotificationVerbEnum.DELETE:
        return "deleted a";
    }
  }
  
  // https://stackoverflow.com/a/3177838
  const resolveTimestamp = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

    let interval = seconds / 31536000;

    if(interval > 1) 
      return `${Math.floor(interval)} years`;
      
      interval = seconds / 2592000;

      if(interval > 1) 
        return `${Math.floor(interval)} months`;
      
      interval = seconds / 86400;

      if(interval > 1) 
        return `${Math.floor(interval)} days`;

      interval = seconds / 3600;

      if(interval > 1) 
        return `${Math.floor(interval)} hours`;
      
      interval = seconds / 60;

      if(interval > 1) 
        return `${Math.floor(interval)} minutes`;
      
      return `${Math.floor(seconds)} seconds`;
  }
  
  return (
    <div className={classNames(visible ? "modal modal--visible" : "modal", className)}>
        <div className="modal__header">
          <h1 className="modal__title">
              { title }
          </h1>
          <button className="modal__mark-button">
            Mark all as read
          </button>
        </div>
        <div className="modal__notifications">
          { notifications && notifications.length ? notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(notification => 
          <div className="modal__notification" key={notification.id}>
            <img src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000" alt="" className="modal__notification__avatar" />
            <div className="modal__notification__divider">
              <p className="modal__notification__message">
                { !notification.system && notification.performedBy ? (
                  <>
                  <span className="modal__notification__message__important">{ notification.performedBy.forename } { notification.performedBy.surname }</span> { resolveVerb(notification.verb!) } <span className="modal__notification__message__important">{ notification.entityName }</span>
                  </>
                ) : null }
              </p>
              <p className="modal__notification__timestamp">
                { resolveTimestamp(notification.createdAt) } ago
              </p>
            </div>
          </div>
          ) : null }
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
  )
}
