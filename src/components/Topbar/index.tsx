import React, { useEffect, useState } from 'react'
import { MdNotificationsNone, MdOutlineArrowDropDown } from 'react-icons/md'
import Textbox from '../Textbox'
import ReactModal from 'react-modal'

import './index.scss'
import { Modal } from '../Modal'

export const Topbar = () => {

    const [notifyCount, setNotifyCount] = useState<number>(12);
    const [notifyVisible, setNotifyVisible] = useState<boolean>(false);

    useEffect(() => {

        if(!notifyVisible && notifyCount) return;
        
        setNotifyCount(0);

    }, [notifyVisible]);

  return (
    <div className="topbar">
        <Textbox type="text" placeholder="Search patients" className="topbar__search" />
        <div className="topbar__actions">
            <div className="topbar__actions__notifications">
                <MdNotificationsNone 
                className="topbar__actions__notification"
                onClick={() => setNotifyVisible(!notifyVisible)}
                />
                { notifyCount ? (
                    <span className="topbar__actions__notifications__count">
                        { notifyCount }
                    </span>
                ) : null }
            </div>
            <Modal visible={notifyVisible} title="Notifications" />
            <div className="topbar__actions__profile">
                <img src="https://cdn-prod.medicalnewstoday.com/content/images/articles/147/147142/nursing-is-a-varied-and-respected-profession.jpg" alt="" />
                <span className="topbar__actions__profile__name">
                    Sue Brazell
                </span>
                <MdOutlineArrowDropDown />
            </div>
        </div>
    </div>
  )
}
