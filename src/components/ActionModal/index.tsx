import React, { CSSProperties, FC, useEffect, useState } from 'react'
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
        const { clientX: x, clientY: y } = e;

        // TODO add check here to prevent every click event from triggering

        setCoords({
            x: x - 300,
            y
        });
    }

    const actionModalStyle: CSSProperties = {
        left: coords.x,
        top: coords.y
    }

  return (
    <div className="action-modal" style={actionModalStyle}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto possimus quibusdam facere officia nisi! Nulla et officia quis libero! Officia aliquid quaerat sequi ex ea quidem aut temporibus sit voluptatibus!
    </div>
    )
}

export default ActionModal