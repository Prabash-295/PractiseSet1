import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import Loader from '../components/Loader';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';
import { getEventById, updateEvent } from '../services/api';

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchEvent = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const data = await getEventById(id);
      setEvent(data);
    } catch (err) {
      setFetchError('Event not found');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleSubmit = async (eventData) => {
    setSaving(true);
    setSaveError('');
    setSuccess('');
    try {
      await updateEvent(id, eventData);
      setSuccess('Event updated successfully!');
      setTimeout(() => navigate(`/events/${id}`), 1500);
    } catch (err) {
      setSaveError('Failed to update event');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="page"><div className="container"><Loader /></div></div>;

  if (fetchError) return (
    <div className="page">
      <div className="container">
        <ErrorMessage message={fetchError} onRetry={fetchEvent} />
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">Edit Event</h1>
          <p className="section-subtitle">Update event details</p>
        </div>
        {success && <SuccessMessage message={success} />}
        {saveError && <ErrorMessage message={saveError} />}
        <EventForm
          initialData={event}
          onSubmit={handleSubmit}
          submitLabel={saving ? 'Saving...' : 'Save Changes'}
        />
      </div>
    </div>
  );
}

export default EditEvent;
