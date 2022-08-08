import classNames from 'classnames';
import React, { ChangeEvent, FC, useState } from 'react'
import './index.scss'

type TextboxType = | 'text' | 'email' | 'password' | 'phone';

export interface TextboxProps {
    type?: TextboxType;
    placeholder?: string;
    required?: boolean;
    className?: string;
    value?: string;
    "data-tip"?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Textbox: FC<TextboxProps> = ({ type = 'text', placeholder, className, value, required = false, onChange, "data-tip": dataTip }) => {
  
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
    value={value}
    onChange={(e) => handleChange(e)}
    required={required} 
    data-tip={dataTip}
    />
    </>
  )
}

export default Textbox