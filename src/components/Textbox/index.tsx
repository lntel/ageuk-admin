import classNames from 'classnames';
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import './index.scss'

type TextboxType = | 'text' | 'email' | 'password' | 'phone' | 'date';

export interface TextboxProps {
    type?: TextboxType;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    autoComplete?: string;
    className?: string;
    value?: string;
    "data-tip"?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Textbox: FC<TextboxProps> = ({ type = 'text', placeholder, className, value, required = false, onChange, "data-tip": dataTip, disabled, autoComplete = "off" }) => {
  
  // https://stackoverflow.com/a/69600390
  const convertToDate = (date: string) => {

    const dateObj = new Date(date);

    const day = ("0" + dateObj.getDate()).slice(-2);
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);

    return dateObj.getFullYear()+"-"+(month)+"-"+(day) ;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(!onChange) return;

    onChange(e);
  }

  return (
    <>
    <input 
    type={type} 
    placeholder={placeholder}
    className={classNames("textbox", className)} 
    value={value ? type === "date" ? convertToDate(value) : value : ""}
    onChange={(e) => handleChange(e)}
    required={required} 
    data-tip={dataTip}
    disabled={disabled}
    autoComplete={autoComplete}
    />
    </>
  )
}

export default Textbox