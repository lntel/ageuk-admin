import React, { FC } from 'react'
import './index.scss'

import Navigation from '../Navigation'
import { Topbar } from '../Topbar';

export interface TemplateProps {
    children?: any;
}

const Template: FC<TemplateProps> = ({ children }) => {
  return (
    <main className="template">
        <Navigation />
        <Topbar />
        <div className="template__main">
            { children }
        </div>
    </main>
  )
}

export default Template