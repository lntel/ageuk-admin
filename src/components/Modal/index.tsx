import classNames from 'classnames'
import './index.scss'
import React, { FC } from 'react'

export interface ModalProps {
    className?: string;
    visible: boolean;
    title?: string;
}

export const Modal: FC<ModalProps> = ({ className, visible, title }) => {
  return (
    <div className={classNames(visible ? "modal modal--visible" : "modal", className)}>
        <h1 className="modal__title">
            { title }
        </h1>
    </div>
  )
}
