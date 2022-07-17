import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);