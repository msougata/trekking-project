import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/AddReview.css';

const AddReview = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userProfile } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Populate name from user session if authenticated
  useEffect(() => {
    if (isAuthenticated && userProfile) {
      setFormData(prev => ({
        ...prev,
        name: userProfile.name || ''
      }));
    }
  }, [isAuthenticated, userProfile]);

  const handleCommentChange = (e) => {
    setFormData({
      ...formData,
      comment: e.target.value
    });
  };

  const handleRatingChange = (value) => {
    setFormData({
      ...formData,
      rating: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (!formData.comment.trim()) {
      setError('Please enter your review');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await axios.post('http://localhost:8080/api/reviews', formData);
      
      setSuccess(true);
      setFormData({
        name: isAuthenticated && userProfile ? userProfile.name || '' : '',
        rating: 0,
        comment: ''
      });
      
      // Redirect to reviews list after 2 seconds
      setTimeout(() => {
        navigate('/reviews');
      }, 2000);
      
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-review-container">
      <div className="add-review-card">
        <h1>Write a Review</h1>
        
        {success && (
          <div className="success-message">
            <p>Your review has been submitted successfully!</p>
            <p>Redirecting to reviews page...</p>
          </div>
        )}
        
        {!success && (
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Your Name"
                disabled={isAuthenticated && userProfile}
                className={isAuthenticated && userProfile ? 'disabled' : ''}
              />
              {isAuthenticated && userProfile && (
                <small className="form-text">Name taken from your profile</small>
              )}
            </div>
            
            <div className="form-group">
              <label>Rating</label>
              <div className="rating-input">
                <StarRating 
                  rating={formData.rating} 
                  interactive={true} 
                  onChange={handleRatingChange} 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="comment">Review</label>
              <textarea
                id="comment"
                value={formData.comment}
                onChange={handleCommentChange}
                placeholder="Share your experience with this trek..."
                rows={5}
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => navigate('/reviews')} 
                className="cancel-button"
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-button" 
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddReview; 