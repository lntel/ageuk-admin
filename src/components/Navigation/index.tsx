import React, { FC, FunctionComponent, ReactElement } from 'react'
import './index.scss'
import { MdHome, MdPeopleAlt } from "react-icons/md";

import Logo from '../../assets/images/age-uk-logo-no-strap.png'
import { IconType } from 'react-icons';
import { Link, To } from 'react-router-dom';

const Navigation: FC = () => {
  return (
    <nav className="navigation">
        <img src={Logo} alt="Age UK logo" className="navigation__logo" />
        <div className="navigation__links">
            <NavLink label="Overview" icon={<MdHome />} to="/" />
            <NavLink label="Patients" icon={<MdPeopleAlt />} to="/patients" />
        </div>
    </nav>
  )
}

export interface NavLinkProps {
    label: string;
    icon: ReactElement<any, any>;
    to: To;
}

export const NavLink: FC<NavLinkProps> = ({ label, icon, to }) => {
    return (
        <Link to={to} className="navigation__link">
            <>
            { icon }
            <p className="navigation__link__text">{ label }</p>
            </>
        </Link>
    )
}

export default Navigation