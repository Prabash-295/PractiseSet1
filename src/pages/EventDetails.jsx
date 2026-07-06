import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDate, formatTime } from '../utils/helpers';
import { getEventById } from '../services/api';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Modal from '../components/Modal';
import './EventDetails.css';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const fetchEvent = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getEventById(id);
      setEvent(data);
    } catch (err) {
      setError('Event not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleRegister = () => {
    setShowRegister(true);
  };

  const confirmRegistration = () => {
    const registered = JSON.parse(localStorage.getItem('registeredEvents') || '[]');
    if (!registered.includes(event.id)) {
      registered.push(event.id);
      localStorage.setItem('registeredEvents', JSON.stringify(registered));
    }
    setShowRegister(false);
    alert('Successfully registered for the event!');
  };

  if (loading) return <div className="page"><div className="container"><Loader /></div></div>;

  if (error) return (
    <div className="page">
      <div className="container">
        <ErrorMessage message={error} onRetry={fetchEvent} />
      </div>
    </div>
  );

  if (!event) return null;

  const seatsLeft = event.seatsRemaining !== undefined ? event.seatsRemaining : event.seats;
  const seatsPercentage = Math.round((seatsLeft / event.seats) * 100);

  return (
    <div className="page">
      <div className="container">
        <button className="btn btn-outline btn-sm back-btn" onClick={() => navigate(-1)}>
          &larr; Back
        </button>

        <div className="event-details">
          <div className="event-details-banner">
            <img
              src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop'}
              alt={event.title}
            />
            <span className="event-details-category">{event.category}</span>
          </div>

          <div className="event-details-content">
            <h1 className="event-details-title">{event.title}</h1>
            <p className="event-details-club">Organized by {event.club}</p>

            <p className="event-details-description">{event.description}</p>

            <div className="event-details-info">
              <div className="info-item">
                <span className="info-label">Date</span>
                <span className="info-value">{formatDate(event.date)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Time</span>
                <span className="info-value">{formatTime(event.time)}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Venue</span>
                <span className="info-value">{event.venue}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Category</span>
                <span className="info-value">{event.category}</span>
              </div>
            </div>

            <div className="event-details-seats">
              <h4>Seats Availability</h4>
              <div className="seats-bar">
                <div
                  className={`seats-fill ${seatsPercentage < 30 ? 'low' : seatsPercentage < 60 ? 'medium' : 'high'}`}
                  style={{ width: `${seatsPercentage}%` }}
                ></div>
              </div>
              <span className="seats-text">{seatsLeft} out of {event.seats} seats remaining</span>
            </div>

            <div className="event-details-actions">
              <button className="btn btn-primary btn-lg" onClick={handleRegister}>
                Register Now
              </button>
              <Link to={`/edit/${event.id}`} className="btn btn-outline btn-lg">
                Edit Event
              </Link>
            </div>
          </div>
        </div>

        <Modal
          isOpen={showRegister}
          onClose={() => setShowRegister(false)}
          title="Confirm Registration"
        >
          <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
            Do you want to register for <strong>{event.title}</strong>?
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button className="btn btn-outline" onClick={() => setShowRegister(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={confirmRegistration}>
              Confirm
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default EventDetails;
