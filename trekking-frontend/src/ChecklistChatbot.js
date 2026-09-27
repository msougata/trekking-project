import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChecklistChatbot.css';
import { useNavigate } from 'react-router-dom';

export default function ChecklistChatbot() {
  const [location, setLocation] = useState('');
  const [month, setMonth] = useState('');
  const [checklist, setChecklist] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ⬅️ Load previous values from localStorage when page loads
  useEffect(() => {
    const savedLocation = localStorage.getItem('location');
    const savedMonth = localStorage.getItem('month');
    const savedChecklist = JSON.parse(localStorage.getItem('checklist'));
    const savedSubmitted = localStorage.getItem('submitted');

    if (savedLocation) setLocation(savedLocation);
    if (savedMonth) setMonth(savedMonth);
    if (savedChecklist) setChecklist(savedChecklist);
    if (savedSubmitted === 'true') setSubmitted(true);
  }, []);

  // ⬅️ Save current values to localStorage whenever anything changes
  useEffect(() => {
    localStorage.setItem('location', location);
    localStorage.setItem('month', month);
    localStorage.setItem('checklist', JSON.stringify(checklist));
    localStorage.setItem('submitted', submitted);
  }, [location, month, checklist, submitted]);

  const handleSubmit = async () => {
    if (!location || !month) {
      alert("Please fill in both location and month.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/checklist', {
        location,
        month
      });

      setChecklist(response.data);
      setSubmitted(true);
      setError(null);
    } catch (err) {
      console.error('Error fetching checklist:', err);
      setError("Failed to fetch checklist. Please make sure the backend is running.");
    }
  };

  return (
    <div className="checklist-chatbot" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 className="text-center mb-4">Trekking Checklist Generator</h2>

      <div className="form-group mb-3">
        <label>Enter Location:</label>
        <input
          type="text"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g., Kedarnath"
        />
      </div>

      <div className="form-group mb-3">
        <label>Enter Month:</label>
        <input
          type="text"
          className="form-control"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="e.g., June"
        />
      </div>

      <button className="btn btn-primary w-100" onClick={handleSubmit}>
        Generate Checklist
      </button>

      {error && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}

      {submitted && checklist.length > 0 && (
        <div className="checklist-result mt-4">
          <h4>Suggested Packing List:</h4>
          <ul className="list-group">
            {checklist.map((item, index) => (
              <li key={index} className="list-group-item">
                ✔️ {item}
              </li>
            ))}
          </ul>

          <div className="mt-4 d-flex justify-content-between">
            <button className="btn btn-success w-45" onClick={() => navigate('/rent')}>
              Rent Gear
            </button>
            <button className="btn btn-warning w-45" onClick={() => navigate('/buy')}>
              Buy Gear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
