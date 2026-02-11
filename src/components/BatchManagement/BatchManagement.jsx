import React, { useEffect, useState } from "react";
import "./batch.css";

const BatchManagement = () => {
  const [batchName, setBatchName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load courses & batches
  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const savedBatches = JSON.parse(localStorage.getItem("batches")) || [];

    setCourses(savedCourses);
    setBatches(savedBatches);
  }, []);

  // Save batches to localStorage
  useEffect(() => {
    localStorage.setItem("batches", JSON.stringify(batches));
  }, [batches]);

  const handleAddBatch = () => {
    setError("");
    setSuccess("");

    if (!batchName.trim()) {
      setError("Batch name is required.");
      return;
    }

    if (!selectedCourse) {
      setError("Please select a course.");
      return;
    }

    if (!startTime || !endTime) {
      setError("Start and End time are required.");
      return;
    }

    if (startTime >= endTime) {
      setError("Start time must be before End time.");
      return;
    }

    const newBatch = {
      id: Date.now(),
      batchName,
      selectedCourse,
      startTime,
      endTime
    };

    setBatches([...batches, newBatch]);

    setBatchName("");
    setSelectedCourse("");
    setStartTime("");
    setEndTime("");
    setSuccess("Batch created successfully!");
    alert("Batch created successfully!")
  };

  return (
    <div className="batch-container">
      <h2>Batch Management</h2>

      <input
        type="text"
        placeholder="Batch Name"
        value={batchName}
        onChange={(e) => setBatchName(e.target.value)}
        className="batch-input"
      />

      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        className="batch-input"
      >
        <option value="">Select Course</option>
       {courses.map((course, index) => (
  <option key={index} value={course.name}>
    {course.name}
  </option>
))}

      </select>

      <div className="time-row">
        <div>
          <label>Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="batch-input"
          />
        </div>

        <div>
          <label>End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="batch-input"
          />
        </div>
      </div>

      <button className="add-btn" onClick={handleAddBatch}>
        Create Batch
      </button>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="batch-list">
        <h3>Batch List</h3>

        {batches.length === 0 ? (
          <p className="empty-text">No batches created.</p>
        ) : (
          batches.map((batch) => (
            <div key={batch.id} className="batch-card">
              <strong>{batch.batchName}</strong>
              <p>Course: {batch.selectedCourse}</p>
              <p>
                Timing: {batch.startTime} - {batch.endTime}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BatchManagement;
