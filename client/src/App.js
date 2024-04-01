import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AdminLeaveRequests from "./components/admin-components/AdminLeaveRequests";
import EmployeeLeaveRequests from "./components/employee-components/EmployeeLeaveRequests";
import AdminDashboard from "./components/admin-components/AdminDashboard";
import EmployeeDashboard from "./components/employee-components/EmployeeDashboard";
import AdminTimesheets from "./components/admin-components/AdminTimesheets";
import EmployeeTimesheet from "./components/employee-components/EmployeeTimesheet";
import Employees from "./components/admin-components/Employees";
import Profile from "./components/Profile";
import Reset from "./components/Reset";
import { auth } from "./firebase";
import { UserProvider } from "./UserContext";
import TeamList from "./components/admin-components/Teams";
import Employee from "./components/admin-components/TeamEmployee";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/reset" element={<Reset />} />
          {loggedIn ? (
            <>
              <Route path="/" element={<AdminLeaveRequests />} />
              <Route path="/leave-requests" element={<AdminLeaveRequests />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/timesheets" element={<AdminTimesheets />} />
              <Route path="/teams" element={<TeamList />} />

              <Route
                path="/employee-dashboard"
                element={<EmployeeDashboard />}
              />
              <Route path="/employees" element={<Employees />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/timesheet" element={<EmployeeTimesheet />} />
              <Route
                path="/employee-leave-requests"
                element={<EmployeeLeaveRequests />}
              />
              <Route path="/teams/:team" element={<Employee />} />
            </>
          ) : (
            <Route
              path="/"
              element={<Login onLogin={() => setLoggedIn(true)} />}
            />
          )}
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
