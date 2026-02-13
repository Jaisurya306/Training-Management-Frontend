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
   const [islogin, setIslogin] = useState(false);

   useEffect(() => {
    let loginStatus = localStorage.getItem("isLoggedIn");

    if (!loginStatus) {
      localStorage.setItem("isLoggedIn", "false");
      setIslogin(false);
    } else {
      setIslogin(loginStatus === "true");
    }
  }, []); 
  return (
    <Routes>
      {/* Login Page */}
      <Route
        path="/"
        element={
          islogin ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login setIslogin={setIslogin} />
          )
        }
      />

      
      {islogin && (
        <Route path="/" element={<Home setIslogin={setIslogin} />}>

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="subjects" element={<SubjectManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="batchs" element={<BatchManagement />} />
          <Route path="students" element={<StudentManagement />} />
        </Route>
      )}

    
      {!islogin && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  );
}

export default Display;
