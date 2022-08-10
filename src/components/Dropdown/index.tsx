import React, { FC } from 'react'
import classNames from 'classnames'
import './index.scss'

export interface IDropdownOption {
    key: string;
    value: string;
}

export interface DropdownProps {
    className?: string;
    placeholder?: string;
    options: IDropdownOption[];
    "data-tip"?: string;
    onSelect?: (value: string) => void;
}

const Dropdown: FC<DropdownProps> = ({ className, options, placeholder, onSelect, "data-tip": dataTip }) => {

    const handleSelect = (value: string) => {
        if(!onSelect || value == "DROPDOWN_COMP_PLACEHOLDER") return;

        onSelect(value);
    }

  return (
    <select className={classNames("dropdown-component", className)} onChange={(e) => handleSelect(e.target.value)} data-tip={dataTip}>
        { placeholder ? <option value="DROPDOWN_COMP_PLACEHOLDER">{ placeholder }</option> : null }
        
        { options.length ? options.map(({ key, value }) => 
            <option value={value} key={value}>{ key }</option>
        ) : null }
    </select>
  )
}

export default Dropdown