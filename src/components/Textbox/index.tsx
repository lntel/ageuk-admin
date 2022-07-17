import React, { FC } from 'react'
import './index.scss'

type TextboxType = | 'text' | 'email' | 'password';

export interface TextboxProps {
    type?: TextboxType;
    placeholder?: string;
    required?: boolean;
}

const Textbox: FC<TextboxProps> = ({ type = 'text', placeholder, required = false }) => {
  return (
    <>
    <input 
    type={type} 
    placeholder={placeholder}
    className="textbox" 
    required={required} />
    </>
  )
}

export default Textbox