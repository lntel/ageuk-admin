import React, { FC, FormEvent } from 'react'

export interface FormProps {
    children?: any;
    className?: string;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Form: FC<FormProps> = ({ children, onSubmit, className }) => {

  return (
    <form className={className} onSubmit={(e) => onSubmit(e)}>
        { children }
    </form>
  )
}

export default Form