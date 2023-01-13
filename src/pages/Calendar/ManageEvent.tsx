import React, { useState } from "react";
import Textbox from "../../components/Textbox";
import Dropdown from "../../components/Dropdown";
import ReactTooltip from "react-tooltip";
import ItemList from "../../components/ItemList";

const ManageEvent = () => {
  const [time, setTime] = useState<string>();
  const [selectedPatient, setSelectedPatient] = useState<any>();
  const [staffList, setStaffList] = useState<number[]>([]);
  const [patients, setPatients] = useState<any[]>([
    {
      id: 12,
      firstName: 'Don',
      lastName: 'Cross'
    }
  ]);
  const [staff, setStaff] = useState<any[]>([
    {
      id: 1,
      firstName: 'Su',
      lastName: 'Brazell'
    }
  ]);
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [selectedDropdown, setSelectedDropdown] = useState<string>("");

    const removeStaff = () => {

      const { id } = staff.find(s => selectedStaff === `${s.firstName} ${s.lastName}`);

        setStaffList(staffList.filter(s => s !== id));
        setSelectedStaff("");
    }

    const addStaff = () => {

      const { id } = staff.find(s => s.id == selectedDropdown);

      setStaffList(list => [
        ...list,
        id
      ])
    }

    const handleSubmission = () => {
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
        onChange={(v) => setTime(v.target.value)}
      />
      <Dropdown
        className="calendar__create__patient"
        options={[...patients.map(patient => ({
          key: `${patient.firstName} ${patient.lastName}`,
          value: patient.id
        }))]}
        onSelect={setSelectedPatient}
        selected={selectedPatient}
        placeholder="Select a patient"
        data-tip="Please select a patient"
      />
      <ItemList
        items={staff.filter(s => staffList.indexOf(s.id) >= 0).map(staff => {
          return `${staff.firstName} ${staff.lastName}`
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
            key: `${s.firstName} ${s.lastName}`,
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
        Create Event
      </button>
      <ReactTooltip />
    </>
  );
};

export default ManageEvent;
