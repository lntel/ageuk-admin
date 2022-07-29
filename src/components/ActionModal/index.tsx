import React, { CSSProperties, FC, useEffect, useState } from 'react'
import { MdModeEdit, MdPersonRemove } from 'react-icons/md';
import './index.scss'

export interface ActionModalCoords {
    x: number;
    y: number;
}
export interface ActionModalProps {
    
}

const ActionModal: FC<ActionModalProps> = () => {

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

        console.log(parentElement)

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
    <div className="action-modal" style={actionModalStyle}>
        <div className="action-modal__action">
            <MdModeEdit />
            Edit Patient
        </div>
        <div className="action-modal__action">
            <MdPersonRemove />
            Delete Patient
        </div>
    </div>
    )
}

export default ActionModal