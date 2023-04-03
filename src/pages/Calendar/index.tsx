import { useEffect, useState } from "react";
import ReactCalendar from "react-calendar";
import { toast } from "react-toastify";
import placeholderAvatar from "../../assets/images/avatar.svg";
import MultiModal from "../../components/MultiModal";
import Template from "../../components/Template";
import request from "../../helpers/request";
import ManageEvent from "./ManageEvent";
import "./calendar.scss";
import "./index.scss";
import classNames from "classnames";

const Calendar = () => {
  const [editEvent, setEditEvent] = useState<any>();
  const [date, setDate] = useState<Date>(new Date());
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    getEvents();
  }, [date]);

  const onModalClose = () => {
    setVisible(false);
    setEditEvent(undefined);
  };

  const getEvents = async () => {
    const response = await request({
      url: "/call",
      type: "GET",
    });

    if (!response.ok) {
      return toast.error("An error occurred");
    }

    setEvents(await response.json());
  };

  const onDateChange = (value: Date) => {
    setDate(value);
  };

  const onEventCreated = () => {
    setVisible(false);
    setEditEvent(null);
    getEvents();
  };

  const onEventDeleted = () => {
    setVisible(false);
    setEditEvent(null);
    setEvents(events.filter((event) => event.id !== editEvent.id));
  };

  // https://flaviocopes.com/how-to-check-dates-same-day-javascript/
  const datesAreOnSameDay = (first: Date, second: Date) =>
    new Date(first).getFullYear() === new Date(second).getFullYear() &&
    new Date(first).getMonth() === new Date(second).getMonth() &&
    new Date(first).getDate() === new Date(second).getDate();

  const getCallStatus = (e: any) => {

    console.log()

    if(Boolean(e.startTravelTime) && !Boolean(e.endTravelTime)) return "In-Transit";
    if((Boolean(e.startTime) || Boolean(e.endTravelTime)) && !Boolean(e.endTime)) return "In-Progress";
    if(Boolean(e.startTravelTime) && Boolean(e.endTravelTime) && Boolean(e.startTime) && Boolean(e.endTime)) return "Complete";
    return "Incomplete";
  }

  return (
    <Template className="calendar" header="Staff Calendar">
      <MultiModal
        visible={visible || editEvent}
        pages={[
          {
            header: !editEvent ? "Create a new event" : "Update an event",
            component: (
              <ManageEvent
                id={editEvent && editEvent.id}
                date={date}
                defaultPatient={editEvent && editEvent?.patient.id}
                defaultStaff={
                  editEvent && [...editEvent.staff.map((s: any) => s.id)]
                }
                defaultTime={editEvent && editEvent.time}
                onCreated={onEventCreated}
                onDeleted={onEventDeleted}
              />
            ),
            className: "calendar__create",
          },
        ]}
        onClose={onModalClose}
      />
      <div className="calendar__events">
        <div className="calendar__events__topbar">
          <h1 className="calendar__events__title">Events</h1>
          <button
            className="calendar__events__create"
            onClick={() => setVisible(!visible)}
          >
            Create Event
          </button>
        </div>
        {Boolean(events.length) &&
          events
            .filter((e) => datesAreOnSameDay(e.date, date))
            .map((event) => (
              <div
                className="calendar__event"
                key={event.id}
                onClick={() => setEditEvent(event)}
              >
                <time className="calendar__event__date">
                  {new Date(event.date).toDateString()} / {event.time}
                </time>
                <h1 className="calendar__event__title">
                  {event.patient.firstName} {event.patient.surname}
                </h1>
                <p className={classNames(`calendar__event__card calendar__event__card--${getCallStatus(event)?.toLocaleLowerCase()}`)}>{getCallStatus(event)}</p>
                <div className="calendar__event__avatars">
                  {Boolean(event.staff.length) &&
                    event.staff.map((staff: any) => (
                      <img
                        src={
                          staff.avatarFilename
                            ? `http://localhost:5000/uploads/${staff.avatarFilename}`
                            : placeholderAvatar
                        }
                        crossOrigin="anonymous"
                        alt="profile avatar"
                        key={staff.id}
                        className="calendar__event__avatar"
                      />
                    ))}
                </div>
              </div>
            ))}
      </div>
      <ReactCalendar onChange={(v: any, e: any) => onDateChange(v)} />
    </Template>
  );
};

export default Calendar;
