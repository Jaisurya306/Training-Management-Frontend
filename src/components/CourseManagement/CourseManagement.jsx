import { useState, useEffect } from "react";
import "./CourseManagement.css";

const CourseManagement = () => {
  //  Load subjects from localStorage (created in Subject module)
  const [subjects] = useState(() => {
    const stored = localStorage.getItem("subjects");
    return stored ? JSON.parse(stored) : [];
  });

  //  Load courses from localStorage
  const [courses, setCourses] = useState(() => {
    const stored = localStorage.getItem("courses");
    return stored ? JSON.parse(stored) : [];
  });

  const [courseName, setCourseName] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  //  Save courses to localStorage
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const handleSubjectChange = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleAddCourse = () => {
    setError("");
    setMessage("");

    if (!courseName.trim()) {
      setError("Course name is mandatory");
      return;
    }

    if (selectedSubjects.length < 2) {
      setError("A course must have at least 2 subjects");
      return;
    }

    const isDuplicate = courses.some(
      (course) =>
        course.name.toLowerCase() === courseName.toLowerCase()
    );

    if (isDuplicate) {
      setError("Duplicate course not allowed");
      return;
    }

    const newCourse = {
      name: courseName.trim(),
      subjects: selectedSubjects,
    };

    setCourses([...courses, newCourse]);
    setCourseName("");
    setSelectedSubjects([]);
    setMessage("Course created successfully");
    alert("Course created successfully")
  };

  return (<div className="course-structure">
    <div className="course-container">
      <h2>Course Management</h2>

      {/* Course Name */}
      <input
        type="text"
        placeholder="Enter Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
        className="course-input"
      />

      {/* Subject Selection */}
      <div className="subjects-section">
        <h4>Select Subjects</h4>

        {subjects.length === 0 && (
          <p className="empty-text">No subjects available</p>
        )}

        {subjects.map((subject, index) => (
          <label key={index} className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedSubjects.includes(subject)}
              onChange={() => handleSubjectChange(subject)}
            />
            {subject}
          </label>
        ))}
      </div>

      <button className="add-btn" onClick={handleAddCourse}>
        Create Course
      </button>

      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      {/* Course List */}
      <div className="course-list">
        {courses.length === 0 && (
          <p className="empty-text">No courses created yet</p>
        )}

        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <h3>{course.name}</h3>
            <p>
              <strong>Subjects:</strong>{" "}
              {course.subjects.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CourseManagement;
