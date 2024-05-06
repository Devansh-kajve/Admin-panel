import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import InstanceList from "./components/Instance/InstanceList";
import AddInstance from "./components/Instance/AddInstance";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/instances" element={<InstanceList />} />
      <Route path="/add-instance" element={<AddInstance />} />
    </Routes>
  );
};

export default AppRoutes;
