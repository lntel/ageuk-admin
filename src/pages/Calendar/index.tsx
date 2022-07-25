import React from 'react'
import ReactCalendar from 'react-calendar'
import Template from '../../components/Template'
import 'react-calendar/dist/Calendar.css';
import './index.scss'

const Calendar = () => {
  return (
    <Template header="Manage Calendar">
        <ReactCalendar className="calendar" />
    </Template>
  )
}

export default Calendar