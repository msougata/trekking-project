import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TrekPreferenceSelector.css';

const TrekPreferenceSelector = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    phone: '',
    email: '',
    city: '',
    difficulty: '',
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  // Clear error message when component mounts
  useEffect(() => {
    setSubmitStatus({
      loading: false,
      success: false,
      error: null
    });
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error for this field when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.age || parseInt(formData.age) < 1) newErrors.age = 'Please enter a valid age.';
    if (!formData.address.trim()) newErrors.address = 'Please enter your address.';
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Please enter a valid 10-digit phone number.';
    if (!formData.email || !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) 
      newErrors.email = 'Please enter a valid email address.';
    if (!formData.city.trim()) newErrors.city = 'Please enter your city.';
    if (!formData.difficulty) newErrors.difficulty = 'Please select a difficulty level.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Convert frontend difficulty values to backend enum values
  const mapDifficultyToEnum = (difficulty) => {
    const map = {
      'easy': 'EASY',
      'moderate': 'MODERATE',
      'difficult': 'DIFFICULT'
    };
    return map[difficulty] || 'MODERATE';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Set loading state
      setSubmitStatus({ loading: true, success: false, error: null });
      
      try {
        // Ensure all required fields are present and in the correct format
        if (!formData.name || !formData.age || !formData.address || 
            !formData.phone || !formData.email || !formData.city || !formData.difficulty) {
          throw new Error("All fields are required");
        }
        
        // Prepare data for backend
        const trekPreferenceData = {
          name: formData.name.trim(),
          age: parseInt(formData.age),
          address: formData.address.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          city: formData.city.trim(),
          difficulty: mapDifficultyToEnum(formData.difficulty)
        };
        
        console.log('Submitting trek preference data:', trekPreferenceData);
        
        // Send data to backend API
        const response = await axios.post(
          'http://localhost:8080/api/trek-preferences', 
          JSON.stringify(trekPreferenceData),
          { 
            headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            timeout: 10000 // 10 second timeout
          }
        );
        
        console.log('Trek preference saved successfully:', response.data);
        
        // Show success message
        setSubmitStatus({ loading: false, success: true, error: null });
        
        // Navigate to difficulty list page with the selected difficulty after 1.5 seconds
        setTimeout(() => {
          navigate('/trek/TrekDifficultylist', {
            state: { difficulty: formData.difficulty }
          });
        }, 1500);
      } catch (error) {
        console.error('Error saving trek preference:', error);
        
        // Get detailed error information
        let errorMessage = 'Failed to save your preferences. Please try again.';
        
        if (error.response) {
          // The request was made and the server responded with a status code outside of 2xx range
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
          console.error('Error data:', error.response.data);
          
          errorMessage = error.response.data?.message || 
                         `Server error: ${error.response.status} - ${error.response.statusText}`;
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
          errorMessage = 'No response from server. Please check if the backend is running.';
        } else {
          // Something happened in setting up the request
          console.error('Error message:', error.message);
          errorMessage = `Error: ${error.message}`;
        }
        
        setSubmitStatus({ loading: false, success: false, error: errorMessage });
      }
    }
  };

  return (
    <div className="trek-container">
      <div className="trek-overlay">
        <h1 className="trek-header">CLIFF HANGER</h1>
        
        {submitStatus.success && (
          <div className="success-message">
            Your preferences have been saved successfully! Redirecting...
          </div>
        )}
        
        {submitStatus.error && (
          <div className="error-message">
            {submitStatus.error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="trek-form">
          {/* Name */}
          <div className="trek-section">
            <label>Name:</label>
            {errors.name && <span className="error">{errors.name}</span>}
            <input
              type="text"
              className="text-input"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          {/* Age */}
          <div className="trek-section">
            <label>Age:</label>
            {errors.age && <span className="error">{errors.age}</span>}
            <input
              type="number"
              min="1"
              className="number-input"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
            />
          </div>

          {/* Address */}
          <div className="trek-section">
            <label>Address:</label>
            {errors.address && <span className="error">{errors.address}</span>}
            <input
              type="text"
              className="text-input"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>

          {/* Phone */}
          <div className="trek-section">
            <label>Phone Number:</label>
            {errors.phone && <span className="error">{errors.phone}</span>}
            <input
              type="text"
              className="text-input"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          
          {/* Email */}
          <div className="trek-section">
            <label>Email:</label>
            {errors.email && <span className="error">{errors.email}</span>}
            <input
              type="email"
              className="text-input"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          
          {/* City */}
          <div className="trek-section">
            <label>City:</label>
            {errors.city && <span className="error">{errors.city}</span>}
            <input
              type="text"
              className="text-input"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </div>

          {/* Difficulty */}
          <div className="trek-section">
            <label>Preferred Trek Difficulty:</label>
            {errors.difficulty && <span className="error">{errors.difficulty}</span>}
            <div className="option-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  checked={formData.difficulty === 'easy'}
                  onChange={(e) => handleChange('difficulty', e.target.value)}
                />
                Easy
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="difficulty"
                  value="moderate"
                  checked={formData.difficulty === 'moderate'}
                  onChange={(e) => handleChange('difficulty', e.target.value)}
                />
                Moderate
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="difficulty"
                  value="difficult"
                  checked={formData.difficulty === 'difficult'}
                  onChange={(e) => handleChange('difficulty', e.target.value)}
                />
                Difficult
              </label>
            </div>
          </div>

          <div className="submit-section">
            <button 
              type="submit" 
              className="submit-button"
              disabled={submitStatus.loading}
            >
              {submitStatus.loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrekPreferenceSelector;