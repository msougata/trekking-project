import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TrekDifficultyList.css';

const treks = [
  { id: 1, name: 'Everest Base Camp', region: 'Kathmandu', difficulty: 'difficult', image: 'https://i.ibb.co/9HxdRrnm/pexels-ashokjkshetri-4032145.jpg' },
  { id: 2, name: 'Kedarnath Trek', region: 'Himachal', difficulty: 'moderate', image: 'https://i.ibb.co/zW5fv5zd/mountains-862870-1920.jpg' },
  { id: 3, name: 'Sandakphu Trek', region: 'West Bengal', difficulty: 'easy', image: 'https://i.ibb.co/tM76PFhm/dolomites-2914157-1920.jpg' },
  { id: 4, name: 'Ladakh Trek', region: 'Uttarakhand', difficulty: 'difficult', image: 'https://i.ibb.co/nNGJrgLQ/mountain-5092625-1920.jpg' },
  { id: 5, name: 'Valley of Flowers Trek', region: 'Uttarakhand', difficulty: 'easy', image: 'https://i.ibb.co/hxBy1rwz/mountains-1852955-1920.jpg' },
  { id: 6, name: 'Hampta Pass Trek', region: 'Himachal', difficulty: 'moderate', image: 'https://i.ibb.co/sv3vz1BM/flower-meadow-8572000-1920.jpg' },
  { id: 7, name: 'Roopkund Trek', region: 'Uttarakhand', difficulty: 'moderate', image: 'https://i.ibb.co/Z6ZkdtR5/dolomites-2897227-1920.jpg' },
  { id: 8, name: 'Chadar Trek', region: 'Zanskar Valley', difficulty: 'difficult', image: 'https://i.ibb.co/5W1kZjXg/mountain-9172053-1920.jpg' },
  { id: 9, name: 'Kanchenjunga', region: 'Sikkim', difficulty: 'easy', image: 'https://i.ibb.co/FLg82vNv/mountain-7863224-1920.jpg' },
  { id: 10, name: 'Dzongri Trek', region: 'Sikkim', difficulty: 'moderate', image: 'https://i.ibb.co/tTKnzhWc/matterhorn-4535693-1920.jpg' },
];

const trekPageMap = {
  1: '/trek/everest',
  2: '/trek/kedernath',
  3: '/trek/sandakphu',
  4: '/trek/ladakh',
  5: '/trek/trekpage4',
  6: '/trek/trekpage5',
  7: '/trek/trekpage6',
  8: '/trek/trekpage7',
  9: '/trek/trekpage8',
  10: '/trek/trekpage9',
};

const backgroundStyle = {
  backgroundImage: "url('https://i.ibb.co/NdZrKTqZ/pexels-pixabay-417173.jpg')", // your background image path
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  padding: '40px 20px',
};

const TrekDifficultyList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const difficulty = location.state?.difficulty;

  if (!difficulty) {
    return <div className="message">Please select a difficulty from the preference form first.</div>;
  }

  const filteredTreks = treks.filter(trek => trek.difficulty === difficulty);

  if (filteredTreks.length === 0) {
    return <div className="message">No treks found for difficulty: {difficulty}</div>;
  }

  return (
    <div style={backgroundStyle}>
      <div className="trek-list-container" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: '15px', maxWidth: '900px', margin: 'auto', padding: '20px' }}>
        <h2 className="trek-list-header">Treks for difficulty: {difficulty.toUpperCase()}</h2>
        <div className="trek-cards">
          {filteredTreks.map(trek => (
            <div key={trek.id} className="trek-card">
              <img src={trek.image} alt={trek.name} className="trek-image" />
              <div className="trek-info">
                <h3 className="trek-name">{trek.name}</h3>
                <p className="trek-region">Region: {trek.region}</p>
                <button
                  className="view-details-btn"
                  onClick={() => navigate(trekPageMap[trek.id] || '/')}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrekDifficultyList;