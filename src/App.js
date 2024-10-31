import React, { Component } from 'react';
import {
  HashRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Patients from './pages/Patients';
import PatientSingle from './pages/PatientSingle';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products';
import Roles from './pages/Roles';
import AddRole from './pages/AddRole';
import TeamMembers from './pages/TeamMembers';
import AddTeamMember from './pages/AddTeamMember';
import ForgotPassword from './pages/ForgotPassword';
import RestorePassword from './pages/RestorePassword';

class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/restore-password" element={<RestorePassword />} />
            <Route path="/logout" element={<Logout />} />

            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/orders" element={<Orders />} />

            <Route path="/products" element={<Products />} />

            <Route path="/settings" element={<Navigate to="/settings/account" />} />
            <Route path="/settings/:tab" element={<Settings />} />

            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:patientId" element={<PatientSingle />} />

            <Route path="/roles" element={<Roles />} />
            <Route path="/roles/create" element={<AddRole />} />
            <Route path="/roles/edit/:roleId" element={<AddRole />} />

            <Route path="/team-members" element={<TeamMembers />} />
            <Route path="/team-members/create" element={<AddTeamMember />} />
            <Route path="/team-members/:memberId" element={<AddTeamMember />} />

          </Routes>
        </HashRouter>
        <ToastContainer />

      </>

    );
  }
}

export default App;
