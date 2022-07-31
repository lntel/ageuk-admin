import classNames from 'classnames';
import React, { CSSProperties, FC, useEffect, useState } from 'react'
import { MdModeEdit, MdPersonRemove } from 'react-icons/md';
import { TableDataAction } from '../TableData';
import './index.scss'

export interface ActionModalCoords {
    x: number;
    y: number;
}
export interface ActionModalProps {
    visible: boolean;
    actions: TableDataAction[];
}

const ActionModal: FC<ActionModalProps> = ({ visible, actions }) => {

    const [coords, setCoords] = useState<ActionModalCoords>({
        x: 0,
        y: 0
    });

    // ? A global click listener is required for the X/Y screen positions for the modal since using table would be complicated
    useEffect(() => {
      document.addEventListener('click', handleClick);
    
      return () => {
          // Freeing up the listener after the component is removed
        document.removeEventListener('click', handleClick);
      }
    }, [])
    
    const handleClick = (e: MouseEvent) => {
        const { clientX: x, clientY: y, target } = e;

        // TODO add check here to prevent every click event from triggering

        const {
            tagName,
            parentElement
        } = (target as HTMLElement);

        // if(tagName != "svg" && tagName != "path" || !parentElement || parentElement.tagName != "TD")
        //     return;

        setCoords({
            x: x - 250,
            y
        });
    }

    const actionModalStyle: CSSProperties = {
        left: coords.x,
        top: coords.y
    }

  return (
    <div className={classNames("action-modal", visible ? "action-modal--visible" : null)} style={actionModalStyle}>
        { actions.length ? actions.map(({ action, icon, onClicked }) =>
            <div className="action-modal__action" onClick={() => onClicked ? onClicked() : null}>
                { icon }
                { action }
            </div>
        ) : null }
    </div>
    )
}

export default ActionModal