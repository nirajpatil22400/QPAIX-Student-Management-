import React, { useState } from "react";
import "../styles.css";

const StudentManagement = () => {
  const [students, setStudents] = useState([
    {
      ID: 1,
      name: "Alice",
      age: 21,
      grade: "A",
      degree: "Btech",
      email: "alice@example.com",
    },
    {
      ID: 2,
      name: "Bob",
      age: 22,
      grade: "B",
      degree: "MBA",
      email: "bob@example.com",
    },
    {
      ID: 3,
      name: "Charlie",
      age: 20,
      grade: "C",
      degree: "Arts",
      email: "charlie@example.com",
    },
  ]);

  const [id, setId] = useState(4);
  const [currId, setCurrId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState("");
  const [age, setAge] = useState("");
  const [degree, setDegree] = useState("");
  const [search, setSearch] = useState("");

  const handleAddStudent = () => {
    if (!name || !email || !age || !degree) return;

    const newStudent = {
      ID: id,
      name,
      age,
      grade: gpa.toUpperCase(),
      degree,
      email,
    };

    setStudents((prev) => [...prev, newStudent]);
    setId(id + 1);
    clearForm();
  };

  const handleEditStudent = () => {
    if (!name || !email || !age || !degree) return;

    setStudents((prev) =>
      prev.map((student) =>
        student.ID === currId
          ? { ...student, name, age, grade: gpa.toUpperCase(), degree, email }
          : student
      )
    );

    clearForm();
    setCurrId(null);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((student) => student.ID !== id));
  };

  const handleEditClick = (id) => {
    const student = students.find((student) => student.ID === id);
    setName(student.name);
    setEmail(student.email);
    setGpa(student.grade);
    setAge(student.age);
    setDegree(student.degree);
    setCurrId(id);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search) ||
      student.degree.toLowerCase().includes(search)
  );

  const clearForm = () => {
    setName("");
    setEmail("");
    setGpa("");
    setAge("");
    setDegree("");
  };

  return (
    <div className="container">
      <div className="head">
        <span>Student Management CRUD</span>
      </div>

      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="GPA"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Degree"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
        />

        <div className="add-button">
          <button type="button" onClick={handleAddStudent}>
            Add Student
          </button>
        </div>
        {currId && (
          <div className="edit-button">
            <button type="button" onClick={handleEditStudent}>
              Edit Student
            </button>
          </div>
        )}
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search By Name, email or degree"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="info">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>GPA</th>
              <th>Degree</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.ID}>
                <td>{student.ID}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.grade}</td>
                <td>{student.degree}</td>
                <td>
                  <button onClick={() => handleEditClick(student.ID)}>
                    {/* <img
                      id="edit-btn"
                      src="../assets/pencil-svgrepo-com.svg"
                      alt="Edit"
                    /> */}
                    <h4 id="edit-btn"> EDIT </h4>
                  </button>
                  <button onClick={() => handleDeleteStudent(student.ID)}>
                    {/* <img src="../assets/trash-svgrepo-com.svg" alt="Delete" /> */}
                    <h4> DELETE </h4>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;
