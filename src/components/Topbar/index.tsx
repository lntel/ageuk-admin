import React from 'react'
import { MdNotificationsNone, MdOutlineArrowDropDown } from 'react-icons/md'
import Textbox from '../Textbox'

import './index.scss'

export const Topbar = () => {
  return (
    <div className="topbar">
        <Textbox type="text" placeholder="Search patients" className="topbar__search" />
        <div className="topbar__actions">
            <div className="topbar__actions__notifications">
                <MdNotificationsNone className="topbar__actions__notification" />
                <span className="topbar__actions__notifications__count">
                    12
                </span>
            </div>
            <div className="topbar__actions__profile">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
                <span className="topbar__actions__profile__name">
                    Sarah Downs
                </span>
                <MdOutlineArrowDropDown />
            </div>
        </div>
    </div>
  )
}
