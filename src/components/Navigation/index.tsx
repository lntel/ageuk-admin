import React, { FC, FunctionComponent, ReactElement } from 'react'
import './index.scss'
import { MdHome, MdPeopleAlt } from "react-icons/md";

import Logo from '../../assets/images/age-uk-logo-no-strap.png'
import { IconType } from 'react-icons';

const Navigation: FC = () => {
  return (
    <nav className="navigation">
        <img src={Logo} alt="Age UK logo" className="navigation__logo" />
        <div className="navigation__links">
            <NavLink label="Overview" icon={<MdHome />} />
            <NavLink label="Patients" icon={<MdPeopleAlt />} />
        </div>
    </nav>
  )
}

export interface NavLinkProps {
    label: string;
    icon: ReactElement<any, any>;
}

export const NavLink: FC<NavLinkProps> = ({ label, icon }) => {
    return (
        <div className="navigation__link">
            <>
            { icon }
            <p className="navigation__link__text">{ label }</p>
            </>
        </div>
    )
}

export default Navigation