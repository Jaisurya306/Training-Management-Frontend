import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalBatches, setTotalBatches] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const batches = JSON.parse(localStorage.getItem("batches")) || [];
    const students = JSON.parse(localStorage.getItem("students")) || [];

    setTotalSubjects(subjects.length);
    setTotalCourses(courses.length);
    setTotalBatches(batches.length);
    setTotalStudents(students.length);
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate("/subjects")}>
          <h3>Total Subjects</h3>
          <p>{totalSubjects}</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/courses")}>
          <h3>Total Courses</h3>
          <p>{totalCourses}</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/batches")}>
          <h3>Total Batches</h3>
          <p>{totalBatches}</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate("/students")}>
          <h3>Total Students</h3>
          <p>{totalStudents}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
