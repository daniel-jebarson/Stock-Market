import "./App.css";
import { useState } from "react";
import React from "react";

import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import MainPage from "./pages/MainPage";
import AdminP from "./pages/AdminPage";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Registration";

const App = () => {
  const [active, setActive] = useState(sessionStorage.getItem("active"));

  if (new Date().getTime() - active > 100 * 60 * 1000 || !active) {
    sessionStorage.clear();
    // alert("Session expired!");
    //x*60*1000 = x minutes
  } else {
    // setActive(new Date().getTime());
    sessionStorage.setItem("active", new Date().getTime());
  }
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route
          path="/dashboard"
          element={
            !username ? (
              <Navigate to="/registration?logout=true" />
            ) : (
              <Dashboard />
            )
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/MainPage"
          element={
            !username ? (
              <Navigate to="/registration?logout=true" />
            ) : (
              <MainPage />
            )
          }
        />

        <Route
          path="/profile"
          element={
            !username ? (
              <Navigate to="/registration?logout=true" />
            ) : (
              <Profile />
            )
          }
        />
        <Route
          path="/admin"
          element={
            !username ? <Navigate to="/registration?logout=true" /> : <AdminP />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
