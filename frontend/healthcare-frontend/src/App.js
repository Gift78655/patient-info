import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



const App = () => {
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!patientId.trim()) {
      setError("Please enter a valid Patient ID.");
      return;
    }

    setLoading(true);
    setError("");
    setPatientData(null);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/patient/${patientId}`
      );
      setPatientData(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Patient not found. Please check the ID and try again.");
      } else {
        setError("An error occurred while fetching patient details.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPatientId("");
    setPatientData(null);
    setError("");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="text-center mb-4">Patient Info</h1>
          <div className="mb-3">
            <label htmlFor="patientId" className="form-label">
              Enter Patient ID:
            </label>
            <input
              id="patientId"
              type="text"
              className="form-control"
              placeholder="Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary me-2"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
            <button className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {patientData && (
        <div className="card mt-4 shadow-sm">
          <div className="card-body">
            <h2 className="mb-4">Patient Details</h2>
            <table className="table table-striped">
              <tbody>
                <tr>
                  <th>Full Name</th>
                  <td>
                    {patientData.first_name} {patientData.last_name}
                  </td>
                </tr>
                <tr>
                  <th>Date of Birth</th>
                  <td>{new Date(patientData.dob).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{patientData.address}</td>
                </tr>
                <tr>
                  <th>Cell Number</th>
                  <td>{patientData.cell_no}</td>
                </tr>
                <tr>
                  <th>Next of Kin</th>
                  <td>{patientData.next_of_kin_name}</td>
                </tr>
                <tr>
                  <th>Next of Kin Contact</th>
                  <td>{patientData.next_of_kin_cell_no}</td>
                </tr>
                <tr>
                  <th>Next of Kin Email</th>
                  <td>{patientData.next_of_kin_email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <footer className="text-center mt-5 py-3 bg-light">
        <p className="mb-0">
          © {new Date().getFullYear()} Healthcare Management System
        </p>
      </footer>
    </div>
  );
};

export default App;
