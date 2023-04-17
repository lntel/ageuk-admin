import { FC, ReactElement, useContext, useEffect } from "react";
import "./index.scss";
import {
  MdCalendarToday,
  MdHome,
  MdMedicalServices,
  MdPeopleAlt,
  MdShield,
  MdStoreMallDirectory,
} from "react-icons/md";

import Logo from "../../assets/images/age-uk-logo-no-strap.png";
import { Link, To } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { PermissionTypeEnum } from "../../enums/permissions";

const Navigation: FC = () => {
  const { state: authState } = useContext(AuthContext);

  useEffect(() => {
    console.log(authState)
  }, [])
  
  const hasPermission = (permission: PermissionTypeEnum) => {
      return authState.permissions && authState.permissions.indexOf(permission) >= 0;
  }
  

  return (
    <nav className="navigation">
      <img src={Logo} alt="Age UK logo" className="navigation__logo" />
      <div className="navigation__links">
        <NavLink label="Overview" icon={<MdHome />} to="/dashboard" />
        <NavLink label="Calendar" icon={<MdCalendarToday />} to="/calendar" />
        <NavLink label="Patients" icon={<MdPeopleAlt />} to="/patients" />
        {hasPermission(PermissionTypeEnum.MANAGE_STAFF) ? (
          <>
            <NavLink label="Staff" icon={<MdMedicalServices />} to="/staff" />
            <NavLink
              label="GP Surgeries"
              icon={<MdStoreMallDirectory />}
              to="/surgeries"
            />
            <NavLink label="Access Roles" icon={<MdShield />} to="/roles" />
          </>
        ) : null}
      </div>
    </nav>
  );
};

export interface NavLinkProps {
  label: string;
  icon: ReactElement<any, any>;
  to: To;
}

export const NavLink: FC<NavLinkProps> = ({ label, icon, to }) => {
  return (
    <Link to={to} className="navigation__link">
      <>
        {icon}
        <p className="navigation__link__text">{label}</p>
      </>
    </Link>
  );
};

export default Navigation;
