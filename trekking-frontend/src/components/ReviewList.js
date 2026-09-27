import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import '../styles/ReviewList.css';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/reviews');
        setReviews(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="review-list-container">
        <div className="review-loading">
          <div className="spinner"></div>
          <p>Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="review-list-container">
        <div className="review-error">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="review-list-container">
      <div className="review-list-header">
        <h1>Trek Reviews</h1>
        <Link to="/add-review" className="add-review-button">
          Write a Review
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="no-reviews">
          <p>No reviews yet. Be the first to share your experience!</p>
          <Link to="/add-review" className="add-review-button">
            Write a Review
          </Link>
        </div>
      ) : (
        <div className="review-list">
          {reviews.map((review) => (
            <div className="review-card" key={review.id}>
              <div className="review-header">
                <h3 className="reviewer-name">{review.name}</h3>
                <div className="review-rating">
                  <StarRating rating={review.rating} />
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
              <div className="review-date">
                {review.createdAt && new Date(review.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList; 