import './EmptyState.css';

function EmptyState({ message, icon }) {
  return (
    <div className="empty-state">
      <span className="empty-icon">{icon || '&#128204;'}</span>
      <p className="empty-message">{message || 'No items found'}</p>
    </div>
  );
}

export default EmptyState;
