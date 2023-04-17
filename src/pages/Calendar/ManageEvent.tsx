import React, { FC, useContext, useEffect, useState } from "react";
import Textbox from "../../components/Textbox";
import Dropdown from "../../components/Dropdown";
import ReactTooltip from "react-tooltip";
import ItemList from "../../components/ItemList";
import request from "../../helpers/request";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { PermissionTypeEnum } from "../../enums/permissions";

export type ManageEventProps = {
  date: Date;
  id?: string;
  defaultTime?: string;
  defaultPatient?: any;
  defaultStaff?: number[];
  onCreated: () => void;
  onDeleted: () => void;
  startTime: Date;
  startTravelTime: Date;
  endTime: Date;
  endTravelTime: Date;
} 

const ManageEvent: FC<ManageEventProps> = ({ date, id, defaultTime, defaultStaff, defaultPatient, onCreated, onDeleted, startTime, startTravelTime, endTime, endTravelTime }) => {
  const [time, setTime] = useState<string>(defaultTime || '');
  const [callTime, setCallTime] = useState<string>('');
  const [travelTime, setTravelTime] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<any>(defaultPatient || '');
  const [staffList, setStaffList] = useState<number[]>(defaultStaff || []);
  const [patients, setPatients] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [selectedDropdown, setSelectedDropdown] = useState<string>("");

  const { state } = useContext(AuthContext);

  const hasPermission = (permission: PermissionTypeEnum) => {
      return state.permissions && state.permissions.indexOf(permission) >= 0;
  }

  useEffect(() => {
    getStaff();
    getPatients();

    if(defaultTime) {
      setCallTime(compareDates(new Date(startTime), new Date(endTime)));
      setTravelTime(compareDates(new Date(startTravelTime), new Date(endTravelTime)));
    }

  }, [])

  const compareDates = (a: Date, b: Date) => {
    const ms = Math.abs(a.getTime() - b.getTime());
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms / (1000 * 60)) % 60);

    return `${hours} hours and ${minutes} minutes`;
  }

    const removeStaff = () => {

      console.log(selectedStaff)

      const { id } = staff.find(s => selectedStaff === `${s.forename} ${s.surname}`);

        setStaffList(staffList.filter(s => s !== id));
        setSelectedStaff("");
    }

    const getStaff = async () => {
      const response = await request({
        url: '/staff',
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        },
        shouldRefresh: true
      });

      if(!response.ok)
        return toast.error('An error has occurred');

      setStaff(await response.json());
    }
    
    const getPatients = async () => {
      const response = await request({
        url: '/patients',
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        },
        shouldRefresh: true
      });

      if(!response.ok)
        return toast.error('An error has occurred');

      setPatients(await response.json());
    }

    const addStaff = () => {

      const { id } = staff.find(s => s.id == selectedDropdown);

      setStaffList(list => [
        ...list,
        id
      ])
    }

    const createEvent = async () => {
      const response = await request({
        type: 'POST',
        url: '/call',
        data: {
          date,
          time, 
          patientId: selectedPatient,
          staff: staffList
        },
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        },
        shouldRefresh: true
      });

      if(!response.ok)
        return;

      onCreated();

      toast.success('Call has been created and staff have been notified');
    }
    
    const updateEvent = async () => {
      const response = await request({
        type: 'PATCH',
        url: `/call/${id}`,
        data: {
          date,
          time, 
          patientId: selectedPatient,
          staff: staffList
        },
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        },
        shouldRefresh: true
      });

      if(!response.ok)
        return;

      onCreated();

      toast.success('Call has been updated and staff have been notified');
    }

    const handleDeletion = async () => {
      const response = await request({
        type: 'DELETE',
        url: `/call/${id}`,
        data: {
          date,
          time, 
          patientId: selectedPatient,
          staff: staffList
        },
        headers: {
          Authorization: `Bearer ${state.accessToken}`
        },
        shouldRefresh: true
      });

      if(!response.ok)
        return;

      toast.success('Call has been deleted and staff have been notified');

      onDeleted();
    }

    const handleSubmission = () => {

      if(defaultTime) {
        // * This is when it is being updated
        updateEvent();
      } else {
        // * This is when it's being created
        createEvent();
      }

      console.log({
        time,
        patient: parseInt(selectedPatient),
        staff: staffList
      })
    }

  return (
    <>
      <Textbox
        type="time"
        className="calendar__create__date"
        data-tip="Please select a time for the call"
        label="Call Time"
        value={time}
        disabled={!hasPermission(PermissionTypeEnum.MANAGE_STAFF)}
        onChange={(v) => setTime(v.target.value)}
      />
      {Boolean(defaultTime) && (
        <>
        <Textbox
        type="text"
        disabled={true}
        className="calendar__create__date"
        data-tip="This is how long was spent travelling to the call"
        label="Travel Time"
        value={travelTime}
        onChange={(v) => setTravelTime(v.target.value)}
      />
        <Textbox
        type="text"
        disabled={true}
        className="calendar__create__date"
        data-tip="This is how long was spent in the call"
        label="Time Spent in Call"
        value={callTime}
        onChange={(v) => setCallTime(v.target.value)}
      />
        </>
      )}
      <Dropdown
        className="calendar__create__patient"
        options={[...patients.map(patient => ({
          key: `${patient.firstName} ${patient.surname}`,
          value: patient.id
        }))]}
        onSelect={setSelectedPatient}
        selected={selectedPatient}
        placeholder="Select a patient"
        data-tip="Please select a patient"
      />
      {hasPermission(PermissionTypeEnum.MANAGE_STAFF) ? (
        <>
        <ItemList
          items={staff.filter(s => staffList.indexOf(s.id) >= 0).map(staff => {
            return `${staff.forename} ${staff.surname}`
          })}
          selectedItem={selectedStaff}
          onItemAdded={addStaff}
          onItemRemoved={removeStaff}
          onItemSelected={setSelectedStaff}
          itemName="staff"
        >
          <Dropdown
          className="calendar__create__staff"
          options={[...staff.map(s => {
            return {
              key: `${s.forename} ${s.surname}`,
              value: s.id
            }
          })]}
          selected={selectedDropdown}
          onSelect={setSelectedDropdown}
          placeholder="Select a staff member"
          data-tip="Please select a staff member for this call"
        />
        </ItemList>
        <button className="calendar__create__submit" onClick={handleSubmission}>
          {`${!defaultTime ? 'Create' : 'Update'} Event`}
        </button>
        {Boolean(defaultTime) && (
          <button className="calendar__create__delete" onClick={handleDeletion}>
            Delete Event
          </button>
        )}
        </>
      ) : null}
      <ReactTooltip />
    </>
  );
};

export default ManageEvent;
