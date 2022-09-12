import React, { FC, FormEvent } from 'react'

export interface FormProps {
    children?: any;
    className?: string;
    autoComplete?: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Form: FC<FormProps> = ({ children, onSubmit, className, autoComplete = "off" }) => {

  return (
    <form className={className} onSubmit={onSubmit} autoComplete={autoComplete}>
        { children }
    </form>
  )
}

export default Form