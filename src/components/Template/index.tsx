import React, { FC } from 'react'
import './index.scss'

import Navigation from '../Navigation'
import { Topbar } from '../Topbar';
import classNames from 'classnames';

export type TemplateLayout = | 'grid' | 'none';
export interface TemplateProps {
    children?: any;
    header?: string;
    layout?: TemplateLayout;
    className?: string;
}

const Template: FC<TemplateProps> = ({ children, header, layout = 'grid', className }) => {
  return (
    <main className={classNames("template", className)}>
        <Navigation />
        <Topbar />
        <h1 className="template__header">
          { header }
        </h1>
        <div className={classNames("template__main", layout == 'grid' ? "template__main--grid" : null)}>
            { children }
        </div>
    </main>
  )
}

export default Template