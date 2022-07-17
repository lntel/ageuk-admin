import classNames from 'classnames';
import React, { FC } from 'react'
import './index.scss'

type TextboxType = | 'text' | 'email' | 'password';

export interface TextboxProps {
    type?: TextboxType;
    placeholder?: string;
    required?: boolean;
    className?: string;
}

const Textbox: FC<TextboxProps> = ({ type = 'text', placeholder, className, required = false }) => {
  return (
    <>
    <input 
    type={type} 
    placeholder={placeholder}
    className={classNames("textbox", className)} 
    required={required} 
    />
    </>
  )
}

export default Textbox