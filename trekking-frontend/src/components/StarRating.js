import React from 'react';
import '../styles/StarRating.css';

// StarRating component that can be used for both display and input
const StarRating = ({ rating, interactive = false, onChange = () => {} }) => {
  const stars = [1, 2, 3, 4, 5];
  
  const handleClick = (value) => {
    if (interactive) {
      onChange(value);
    }
  };

  return (
    <div className={`star-rating ${interactive ? 'interactive' : ''}`}>
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''}`}
          onClick={() => handleClick(star)}
          role={interactive ? 'button' : 'presentation'}
          tabIndex={interactive ? 0 : undefined}
          onKeyPress={interactive ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClick(star);
            }
          } : undefined}
        >
          ★
        </span>
      ))}
      {rating > 0 && <span className="rating-text">({rating}/5)</span>}
    </div>
  );
};

export default StarRating; 