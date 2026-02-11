import React, { useEffect, useState } from "react";
import "./student.css";

const StudentManagement = () => {
  const [studentName, setStudentName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //  Load from localStorage
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const savedBatches = JSON.parse(localStorage.getItem("batches")) || [];
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];

    setCourses(savedCourses);
    setBatches(savedBatches);
    setStudents(savedStudents);
  }, []);

  //  Save students
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  //  Filter batches based on selected course
  const filteredBatches = batches.filter(
    (batch) => batch.selectedCourse === selectedCourse
  );

  const handleAddStudent = () => {
    setError("");
    setSuccess("");

    if (!studentName.trim()) {
      setError("Student name is required");
      return;
    }

    if (!selectedCourse) {
      setError("Please select a course");
      return;
    }

    if (!selectedBatch) {
      setError("Please select a batch");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: studentName.trim(),
      course: selectedCourse,
      batch: selectedBatch,
    };

    setStudents([...students, newStudent]);

    setStudentName("");
    setSelectedCourse("");
    setSelectedBatch("");

    setSuccess("Student added successfully!");
    alert("Student added successfully!")
  };

  return (
    <div className="student-container">
      <h2>Student Management</h2>

      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="student-input"
      />

      {/* Course Dropdown */}
      <select
        value={selectedCourse}
        onChange={(e) => {
          setSelectedCourse(e.target.value);
          setSelectedBatch(""); // reset batch when course changes
        }}
        className="student-input"
      >
        <option value="">Select Course</option>
        {courses.map((course, index) => (
          <option key={index} value={course.name}>
            {course.name}
          </option>
        ))}
      </select>

      {/* Batch Dropdown */}
      <select
        value={selectedBatch}
        onChange={(e) => setSelectedBatch(e.target.value)}
        className="student-input"
        disabled={!selectedCourse}
      >
        <option value="">Select Batch</option>
        {filteredBatches.map((batch) => (
          <option key={batch.id} value={batch.batchName}>
            {batch.batchName} ({batch.startTime} - {batch.endTime})
          </option>
        ))}
      </select>

      <button className="add-btn" onClick={handleAddStudent}>
        Add Student
      </button>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="student-list">
        <h3>Student List</h3>

        {students.length === 0 ? (
          <p className="empty-text">No students added.</p>
        ) : (
          students.map((student) => (
            <div key={student.id} className="student-card">
              <strong>{student.name}</strong>
              <p>Course: {student.course}</p>
              <p>Batch: {student.batch}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentManagement;
