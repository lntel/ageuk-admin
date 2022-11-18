import classNames from "classnames";
import React, { FC } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import "./index.scss";

export interface SettingsModalProps {
    visible: boolean;
    onLogout: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({ visible, onLogout }) => {

  return (
    <div className={classNames("settings-modal", visible ? "settings-modal--visible" : null)}>
      <SettingMenuItem
        label="Profile"
        icon={<BsFillPersonFill />}
        onClick={() => console.log("test")}
      />
      <SettingMenuItem
        label="Settings"
        icon={<IoMdSettings />}
        onClick={() => console.log("test")}
      />
      <SettingMenuItem
        label="Logout"
        icon={<MdLogout />}
        onClick={onLogout}
      />
    </div>
  );
};

export interface SettingMenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export const SettingMenuItem: FC<SettingMenuItemProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <div className="settings-modal__item" onClick={() => onClick()}>
      <div className="settings-modal__item__icon">{icon}</div>
      <span className="settings-modal__item__label">{label}</span>
    </div>
  );
};

export default SettingsModal;
