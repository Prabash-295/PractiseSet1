import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';
import { createEvent } from '../services/api';
import './CreateEvent.css';

function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (eventData) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await createEvent(eventData);
      setSuccess('Event created successfully!');
      setTimeout(() => navigate('/events'), 1500);
    } catch (err) {
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">Create Event</h1>
          <p className="section-subtitle">Organize a new campus event</p>
        </div>
        {success && <SuccessMessage message={success} />}
        {error && <ErrorMessage message={error} />}
        <EventForm
          onSubmit={handleSubmit}
          submitLabel={loading ? 'Creating...' : 'Create Event'}
        />
        {loading && (
          <div className="form-loading-overlay">
            <div className="loader-spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateEvent;
