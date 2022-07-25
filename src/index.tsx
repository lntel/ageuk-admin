import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Surgeries from './pages/Surgeries';
import Calendar from './pages/Calendar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/patients' element={<Patients />} />
        <Route path='/surgeries' element={<Surgeries />} />
        <Route path='/calendar' element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);