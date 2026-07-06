import { Link } from 'react-router-dom';
import { formatDate, formatTime } from '../utils/helpers';
import './EventCard.css';

function EventCard({ event, onRegister, onDelete, showActions }) {
  const seatsLeft = event.seatsRemaining !== undefined ? event.seatsRemaining : event.seats;
  const seatsPercentage = Math.round((seatsLeft / event.seats) * 100);

  return (
    <div className="event-card">
      <div className="event-card-image">
        <img
          src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop'}
          alt={event.title}
          loading="lazy"
        />
        <span className="event-card-category">{event.category}</span>
      </div>
      <div className="event-card-body">
        <h3 className="event-card-title">{event.title}</h3>
        <p className="event-card-club">{event.club}</p>
        <div className="event-card-details">
          <div className="event-card-detail">
            <span className="detail-icon">&#128197;</span>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="event-card-detail">
            <span className="detail-icon">&#128340;</span>
            <span>{formatTime(event.time)}</span>
          </div>
          <div className="event-card-detail">
            <span className="detail-icon">&#128205;</span>
            <span>{event.venue}</span>
          </div>
        </div>
        <div className="event-card-seats">
          <div className="seats-bar">
            <div
              className={`seats-fill ${seatsPercentage < 30 ? 'low' : seatsPercentage < 60 ? 'medium' : 'high'}`}
              style={{ width: `${seatsPercentage}%` }}
            ></div>
          </div>
          <span className="seats-text">
            {seatsLeft} / {event.seats} seats left
          </span>
        </div>
        <div className="event-card-actions">
          <Link to={`/events/${event.id}`} className="btn btn-sm btn-outline">
            View Details
          </Link>
          {showActions && (
            <div className="event-card-admin">
              <Link to={`/edit/${event.id}`} className="btn btn-sm btn-primary">
                Edit
              </Link>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(event.id)}>
                Delete
              </button>
            </div>
          )}
          {onRegister && (
            <button className="btn btn-sm btn-primary" onClick={() => onRegister(event.id)}>
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
