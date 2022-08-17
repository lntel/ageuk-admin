import classNames from 'classnames';
import React, { FC } from 'react'
import { MdCheck } from 'react-icons/md';
import './index.scss'

export interface CheckboxProps {
  text: string;
  checked: boolean;
  onClick: () => void;
  tooltip?: string;
  className?: string;
}

const Checkbox: FC<CheckboxProps> = ({ text, checked, onClick, tooltip, className }) => {
  return (
    <div className={classNames("checkbox", className ? className : null)} onClick={() => onClick()} data-tip={tooltip ? tooltip : null}>
      <div className={classNames("checkbox__checkmark", checked ? "checkbox__checkmark--checked" : null)}>
        { checked ? <MdCheck /> : null }
      </div>
      <p className="checkbox__text">
        { text }
      </p>
    </div>
  )
}

export default Checkbox