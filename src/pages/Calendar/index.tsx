import { useEffect, useState } from 'react';
import ReactCalendar from 'react-calendar';
import Template from '../../components/Template';
import './calendar.scss';
import './index.scss';
import MultiModal from '../../components/MultiModal';
import ManageEvent from './ManageEvent';
import ReactTooltip from 'react-tooltip';

const Calendar = () => {
    
    const [editEvent, setEditEvent] = useState<any>();
    const [date, setDate] = useState<Date>(new Date());
    const [visible, setVisible] = useState<boolean>(false);
    const [selectedEvent, setSelectedEvent] = useState<any>();
    const [events, setEvents] = useState<any[]>([
        {
            date: new Date(),
            patient: {
                firstName: 'John',
                lastName: 'Doe'
            },
            staff: [
                {
                    id: '1',
                    forename: 't',
                    dob: new Date(),
                    emailAddress: 't@t.com',
                    surname: 't',
                    avatarFilename: 'https://i.guim.co.uk/img/media/4fdec73d03d5e50abff22ed5afea103cf854162e/0_22_7360_4417/master/7360.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=0c4163a67cfa0e5631d1cf284a975dba',
                    role: {
                        id: '1',
                        created: new Date(),
                        lastUpdated: new Date(),
                        name: 't',
                        permissions: []
                    }
                },
                {
                    id: '2',
                    forename: 't',
                    dob: new Date(),
                    emailAddress: 't@t.com',
                    surname: 't',
                    avatarFilename: 'https://yt3.googleusercontent.com/ytc/AMLnZu-JoSK-o_4HZm9LEX7fR-SHEzA6wUtJ9jHm53k1=s900-c-k-c0x00ffffff-no-rj',
                    role: {
                        id: '1',
                        created: new Date(),
                        lastUpdated: new Date(),
                        name: 't',
                        permissions: []
                    }
                },
                {
                    id: '3',
                    forename: 't',
                    dob: new Date(),
                    emailAddress: 't@t.com',
                    surname: 't',
                    avatarFilename: 'https://www.securicaremedical.co.uk/images/nurse_visit_aur_nursepage.jpg',
                    role: {
                        id: '1',
                        created: new Date(),
                        lastUpdated: new Date(),
                        name: 't',
                        permissions: []
                    }
                },
            ]
        },
    ]);

    useEffect(() => {
        getEvents();
    }, [date]);
    
    const onModalClose = () => {
        setVisible(false);
        setEditEvent(undefined);
    }

    const getEvents = async () => {

    }

    const onDateChange = (value: Date) => {
        setDate(value);
    }

    // https://flaviocopes.com/how-to-check-dates-same-day-javascript/
    const datesAreOnSameDay = (first: Date, second: Date) =>
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate();

  return (
    <Template className="calendar" header="Staff Calendar">
        <MultiModal visible={visible || editEvent} pages={[
            {
                header: !editEvent ? 'Create a new event' : 'Update an event',
                component: <ManageEvent />,
                className: 'calendar__create'
            }
        ]} onClose={onModalClose} />
        <div className="calendar__events">
            <div className="calendar__events__topbar">
                <h1 className="calendar__events__title">
                    Events
                </h1>
                <button className="calendar__events__create" onClick={() => setVisible(!visible)}>
                    Create Event
                </button>
            </div>
            { Boolean(events.length) && events.filter(e => datesAreOnSameDay(e.date, date)).map(event => 
            <div className="calendar__event" key={event.id} onClick={() => setEditEvent(event)}>
                <time className="calendar__event__date">
                    { new Date(event.date).toDateString() }
                </time>
                <h1 className="calendar__event__title">
                    { event.patient.firstName } { event.patient.lastName }
                </h1>
                <div className="calendar__event__avatars">
                    { Boolean(event.staff.length) && event.staff.map((staff: any) => 
                        <img src={staff.avatarFilename} alt="" key={staff.id} className="calendar__event__avatar" />
                    ) }
                </div>
            </div>
            ) }
        </div>
      <ReactCalendar onChange={(v: any, e: any) => onDateChange(v)} />
    </Template>
  )
}

export default Calendar