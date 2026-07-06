import './ErrorMessage.css';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message-container">
      <span className="error-icon">&#9888;</span>
      <p className="error-message-text">{message || 'Something went wrong'}</p>
      {onRetry && (
        <button className="btn btn-sm btn-outline" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
