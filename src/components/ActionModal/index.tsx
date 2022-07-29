import React, { CSSProperties, FC } from 'react'
import './index.scss'

export interface ActionModalProps {
    x: number;
    y: number;
}

const ActionModal: FC<ActionModalProps> = ({ x, y }) => {

    const actionModalStyle: CSSProperties = {
        left: x,
        top: y
    }

  return (
    <div className="action-modal" style={actionModalStyle}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto possimus quibusdam facere officia nisi! Nulla et officia quis libero! Officia aliquid quaerat sequi ex ea quidem aut temporibus sit voluptatibus!
    </div>
    )
}

export default ActionModal