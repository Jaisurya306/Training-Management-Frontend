import { useEffect, useState } from "react";
import "./SubjectManagement.css";

const SubjectManagement = () => {
  
  const [subjects, setSubjects] = useState(() => {
    const stored = localStorage.getItem("subjects");
    return stored ? JSON.parse(stored) : [];
  });

  const [subjectName, setSubjectName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

 
  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const handleAddSubject = () => {
    setMessage("");
    setError("");

    if (!subjectName.trim()) {
      setError("Subject name should not be empty");
      return;
    }

    const isDuplicate = subjects.some(
      (sub) => sub.toLowerCase() === subjectName.toLowerCase()
    );

    if (isDuplicate) {
      setError("Duplicate subject is not allowed");
      return;
    }

    setSubjects([...subjects, subjectName.trim()]);
    setSubjectName("");
    setMessage("Subject added successfully");
    alert("Subject added successfully")
  };

  const handleDeleteSubject = (subject) => {
    setSubjects(subjects.filter((sub) => sub !== subject));
    setMessage("Subject deleted successfully");
    setError("");
  };

  return (
    <div className="subject-container">
      <h2>Subject Management</h2>

      <div className="subject-input-box">
        <input
          type="text"
          placeholder="Enter subject name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <button onClick={handleAddSubject}>Add Subject</button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <ul className="subject-list">
        {subjects.length === 0 && (
          <p className="empty-text">No subjects added yet</p>
        )}

        {subjects.map((subject, index) => (
          <li key={index} className="subject-item">
            <span>{subject}</span>
            <button
              className="delete-btn"
              onClick={() => handleDeleteSubject(subject)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectManagement;
