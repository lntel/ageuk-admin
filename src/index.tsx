import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Surgeries from './pages/Surgeries';
// import Dates from './pages/Dates';
import Staff from './pages/Staff';
import { ToastContainer } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
  <ToastContainer />
    <ReactTooltip effect="solid" multiline={true} />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/patients' element={<Patients />} />
        <Route path='/staff' element={<Staff />} />
        <Route path='/surgeries' element={<Surgeries />} />
        {/* <Route path='/calendar' element={<Dates />} /> */}
      </Routes>
    </BrowserRouter>
  </>
);