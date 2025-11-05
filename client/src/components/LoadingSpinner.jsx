// LoadingSpinner.jsx

import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium' }) => {
  return (
    <div className="loading-container">
      <div className={`spinner ${size}`}></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;