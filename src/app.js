import React, { useState, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import UpdateProfile from './component/updateprofile';
import Signup from './component/signup';
import Dashboard from './component/dashboard';
import Login from './component/login';
import RequireAuth from './component/requireauth';
import ResetPassword from './component/resetpassword';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route
            path="/update-profile"
            element={
              <RequireAuth>
                <UpdateProfile />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
