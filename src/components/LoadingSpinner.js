import './LoadingSpinner.css';

const LoadingSpinner = ({ fullscreen = false }) => {
  return (
    <div className={`loading-spinner ${fullscreen ? 'fullscreen' : ''}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;