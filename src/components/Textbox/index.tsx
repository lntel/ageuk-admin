import classNames from 'classnames';
import React, { ChangeEvent, FC, useState } from 'react'
import './index.scss'

type TextboxType = | 'text' | 'email' | 'password' | 'phone' | 'date';

export interface TextboxProps {
    type?: TextboxType;
    placeholder?: string;
    required?: boolean;
    className?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Textbox: FC<TextboxProps> = ({ type = 'text', placeholder, className, value, required = false, onChange }) => {
  
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
    />
    </>
  )
}

export default Textbox