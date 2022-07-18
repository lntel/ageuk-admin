import React, { useState } from 'react'
import { MdNotificationsNone, MdOutlineArrowDropDown } from 'react-icons/md'
import { Modal } from '../Modal'
import Textbox from '../Textbox'

import './index.scss'

export const Topbar = () => {

    const [notifyVisible, setNotifyVisible] = useState<boolean>(false);

  return (
    <div className="topbar">
        <Textbox type="text" placeholder="Search patients" className="topbar__search" />
        <div className="topbar__actions">
            <div className="topbar__actions__notifications">
                <MdNotificationsNone 
                className="topbar__actions__notification"
                onClick={() => setNotifyVisible(!notifyVisible)}
                />
                <span className="topbar__actions__notifications__count">
                    12
                </span>
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
