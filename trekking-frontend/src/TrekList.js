import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TrekList.css';

const TrekList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const difficulty = location.state?.difficulty;

  const allTreks = [
    {
      name: 'Everest',
      location: 'Kathmandu',
      difficulty: 'difficult',
      description: 'Trek to the base of the world’s highest mountain.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg',
      link: '/trekpage',
    },
    {
      name: 'Kedarnath',
      location: 'Himachal',
      difficulty: 'moderate',
      description: 'Spiritual journey through the Himalayas.',
      image: 'https://www.holidify.com/images/compressed/1747.jpg',
      link: '/trekpage1',
    },
    {
      name: 'Sandakphu',
      location: 'West Bengal',
      difficulty: 'easy',
      description: 'Beautiful views of 4 highest peaks in the world.',
      image: 'https://www.holidify.com/images/compressed/attractions/attr_1637.jpg',
      link: '/trekpage2',
    },
    {
      name: 'Ladakh',
      location: 'Uttarakhand',
      difficulty: 'difficult',
      description: 'Scenic trekking across the cold desert of India.',
      image: 'https://www.holidify.com/images/cmsuploads/compressed/attr_wiki_1638_20200228150729.jpg',
      link: '/trekpage3',
    },
  ];

  const filteredTreks = allTreks.filter((trek) => trek.difficulty === difficulty);

  return (
    <div className="trek-list-container">
      <h1 className="trek-list-title">Treks for "{difficulty}" Difficulty</h1>

      {filteredTreks.length === 0 ? (
        <p>No treks available for selected difficulty.</p>
      ) : (
        <div className="trek-card-container">
          {filteredTreks.map((trek, index) => (
            <div key={index} className="trek-card">
              <img src={trek.image} alt={trek.name} className="trek-image" />
              <h2>{trek.name}</h2>
              <p><strong>Region:</strong> {trek.location}</p>
              <p>{trek.description}</p>
              <button onClick={() => navigate(trek.link)} className="trek-btn">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrekList;