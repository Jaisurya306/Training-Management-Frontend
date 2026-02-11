import React, { useState, useEffect } from "react";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import { Route, Routes, Navigate } from "react-router-dom";
import SubjectManagement from "./components/SubjectManagement/SubjectManagement";
import CourseManagement from "./components/CourseManagement/CourseManagement";
import BatchManagement from "./components/BatchManagement/BatchManagement";
import StudentManagement from "./components/StudentManagement/StudentManagement";
import Dashboard from "./components/Dashboard/Dashboard";

function Display() {
  const [isslogin, setIsslogin] = useState(false);

 
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsslogin(true);
    }
  }, []);

  return (
    <Routes>
      {/* Login Page */}
      <Route
        path="/"
        element={
          isslogin ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login setIsslogin={setIsslogin} />
          )
        }
      />

      
      {isslogin && (
        <Route path="/" element={<Home />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="subjects" element={<SubjectManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="batchs" element={<BatchManagement />} />
          <Route path="students" element={<StudentManagement />} />
        </Route>
      )}

    
      {!isslogin && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  );
}

export default Display;
