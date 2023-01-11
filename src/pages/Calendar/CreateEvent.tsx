import React, { useState } from "react";
import Textbox from "../../components/Textbox";
import Dropdown from "../../components/Dropdown";
import ReactTooltip from "react-tooltip";
import ItemList from "../../components/ItemList";

const CreateEvent = () => {
  const [time, setTime] = useState<string>();
  const [staffList, setStaffList] = useState<string[]>(["x", "y", "z"]);
  const [staff, setStaff] = useState<string[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<string>("");

    const removeStaff = () => {
        setStaff(staff.filter(s => s !== selectedStaff));
        setSelectedStaff("");
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
        options={[
          {
            key: "Don",
            value: "ss",
          },
        ]}
        selected={"Don"}
        data-tip="Please select a patient"
      />
      <ItemList
        items={staff}
        selectedItem={selectedStaff}
        onItemAdded={console.log}
        onItemRemoved={removeStaff}
        onItemSelected={setSelectedStaff}
        itemName="staff"
      >
        <Dropdown
        className="calendar__create__staff"
        options={[
          {
            key: "Su Brazell",
            value: "ss",
          },
        ]}
        selected={"ss"}
        data-tip="dssffds"
      />
      </ItemList>
      <ReactTooltip />
    </>
  );
};

export default CreateEvent;
