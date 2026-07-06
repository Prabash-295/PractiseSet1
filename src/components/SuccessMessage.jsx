import './SuccessMessage.css';

function SuccessMessage({ message }) {
  return (
    <div className="success-message-container">
      <span className="success-icon">&#10003;</span>
      <p className="success-message-text">{message || 'Success!'}</p>
    </div>
  );
}

export default SuccessMessage;
