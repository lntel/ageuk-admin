import React, { useContext, useEffect, useMemo, useState } from 'react'
import Template from '../../components/Template'
import { AxisOptions, Chart } from 'react-charts';
import './index.scss'
import request from '../../helpers/request';
import { toast } from 'react-toastify';
import groupBy from '../../helpers/groupBy'
import { AuthContext } from '../../context/AuthContext';

type DailyCalls = {
  date: Date;
  calls: number;
}

type Series = {
  label: string;
  data: DailyCalls[];
}

const Dashboard = () => {

  const { state: authState } = useContext(AuthContext);

  const [events, setEvents] = useState<Series[]>([{
    label: 'test',
    data: [{
      date: new Date(),
      calls: 0
    }]
  }]);

  useEffect(() => {
    getEvents();
  }, [])

  useEffect(() => {
    console.log(events)
  }, [events])
  
  
  const getEvents = async () => {
    const response = await request({
      url: "/call",
      type: "GET",
      headers: {
        Authorization: `Bearer ${authState.accessToken}`
      }
    });

    if (!response.ok) {
      return toast.error("An error occurred");
    }

    const calls = await response.json();

    const groupedCalls = groupBy(calls, (call: any) => new Date(call.date).toLocaleDateString());

    console.log(Array.from(groupedCalls))

    setEvents([...Array.from(groupedCalls).map((event: any) => ({
      label: event[0],
      data: [
        {
          date: new Date(event[1][0].date),
          calls: 0
        },
        {
          date: new Date(event[1][0].date),
          calls: event[1].length
        },
      ]
    }))])
  };

  const primaryAxis = useMemo(
    (): AxisOptions<DailyCalls> => ({
    getValue: datum => datum.date.toDateString(),
  }),
  []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<DailyCalls>[] => [
      {
        getValue: datum => datum.calls,
        elementType: 'bar'
      },
    ],
    []
  )
  
  return (
    <Template header="Dashboard" className="dashboard-container">

      { events ? (
        <Chart 
        options={{
          data: events,
          primaryAxis,
          secondaryAxes,
        }}
        />
      ) : null }
    </Template>
  )
}

export default Dashboard