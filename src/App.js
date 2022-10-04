import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
