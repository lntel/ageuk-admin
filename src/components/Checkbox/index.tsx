import classNames from 'classnames';
import React, { FC } from 'react'
import { MdCheck } from 'react-icons/md';
import './index.scss'

export interface CheckboxProps {
  text: string;
  checked: boolean;
  onClick: () => void;
}

const Checkbox: FC<CheckboxProps> = ({ text, checked, onClick }) => {
  return (
    <div className="checkbox" onClick={() => onClick()}>
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