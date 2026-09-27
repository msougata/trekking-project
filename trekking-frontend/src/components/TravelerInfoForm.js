import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TravelerInfoForm.css';

const TravelerInfoForm = ({ selectedDate, onClose, trekName }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    numberOfTravelers: 1,
    travelers: [{
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: ''
    }]
  });

  const handleInputChange = (index, field, value) => {
    const updatedTravelers = [...formData.travelers];
    updatedTravelers[index] = {
      ...updatedTravelers[index],
      [field]: value
    };
    setFormData({
      ...formData,
      travelers: updatedTravelers
    });
  };

  const handleNumberOfTravelersChange = (e) => {
    const count = parseInt(e.target.value);
    const currentTravelers = [...formData.travelers];
    
    if (count > currentTravelers.length) {
      // Add new travelers
      const newTravelers = [];
      for (let i = 0; i < count - currentTravelers.length; i++) {
        newTravelers.push({
          name: '',
          age: '',
          gender: '',
          phone: '',
          email: ''
        });
      }
      setFormData({
        ...formData,
        numberOfTravelers: count,
        travelers: [...currentTravelers, ...newTravelers]
      });
    } else {
      // Remove extra travelers
      setFormData({
        ...formData,
        numberOfTravelers: count,
        travelers: currentTravelers.slice(0, count)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Store traveler information in session storage
    sessionStorage.setItem('travelerInfo', JSON.stringify(formData));
    sessionStorage.setItem('selectedDate', selectedDate);
    sessionStorage.setItem('trekName', trekName);
    // Close the form and proceed to payment
    onClose(formData);
  };

  return (
    <div className="traveler-info-form-container">
      <div className="traveler-info-form">
        <h2>Traveler Information</h2>
        <p>Selected Date: {selectedDate}</p>
        <p>Trek Name: {trekName}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Number of Travelers:</label>
            <select 
              value={formData.numberOfTravelers} 
              onChange={handleNumberOfTravelersChange}
              required
            >
              {[1,2,3,4,5,6,7,8,9,10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {formData.travelers.map((traveler, index) => (
            <div key={index} className="traveler-details">
              <h3>Traveler {index + 1}</h3>
              <div className="form-group">
                <label>Full Name:</label>
                <input
                  type="text"
                  value={traveler.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="number"
                  value={traveler.age}
                  onChange={(e) => handleInputChange(index, 'age', e.target.value)}
                  required
                  min="1"
                  max="100"
                />
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <select
                  value={traveler.gender}
                  onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="tel"
                  value={traveler.phone}
                  onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                  required
                  pattern="[0-9]{10}"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={traveler.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}

          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravelerInfoForm; 