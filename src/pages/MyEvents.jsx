import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import EventList from '../components/EventList';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { getEvents } from '../services/api';
import { isUpcoming, isPast } from '../utils/helpers';
import './MyEvents.css';

function MyEvents() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registeredIds, setRegisteredIds] = useState([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('registered');

  const fetchEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getEvents();
      setAllEvents(data);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    const stored = JSON.parse(localStorage.getItem('registeredEvents') || '[]');
    setRegisteredIds(stored);
  }, []);

  const handleCancelRegistration = (eventId) => {
    const updated = registeredIds.filter((id) => id !== eventId);
    setRegisteredIds(updated);
    localStorage.setItem('registeredEvents', JSON.stringify(updated));
  };

  const registeredEvents = allEvents.filter((e) => registeredIds.includes(e.id));

  const upcomingEvents = registeredEvents.filter((e) => isUpcoming(e.date));
  const pastEvents = registeredEvents.filter((e) => isPast(e.date));

  const filterBySearch = (events) => {
    if (!search) return events;
    const q = search.toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.club.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
    );
  };

  const tabs = [
    { key: 'registered', label: `Registered (${registeredEvents.length})` },
    { key: 'upcoming', label: `Upcoming (${upcomingEvents.length})` },
    { key: 'past', label: `Past (${pastEvents.length})` },
  ];

  const getActiveEvents = () => {
    switch (activeTab) {
      case 'upcoming':
        return filterBySearch(upcomingEvents);
      case 'past':
        return filterBySearch(pastEvents);
      default:
        return filterBySearch(registeredEvents);
    }
  };

  if (loading) return <div className="page"><div className="container"><Loader /></div></div>;

  if (error) return <div className="page"><div className="container"><ErrorMessage message={error} onRetry={fetchEvents} /></div></div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">My Events</h1>
          <p className="section-subtitle">Manage your registered events</p>
        </div>

        <div className="my-events-search">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search my events..."
          />
        </div>

        <div className="my-events-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'registered' && (
          <EventList
            events={getActiveEvents()}
            onRegister={null}
            onDelete={handleCancelRegistration}
            showActions={false}
          />
        )}

        {activeTab === 'upcoming' && (
          <EventList
            events={getActiveEvents()}
            onRegister={null}
            onDelete={handleCancelRegistration}
            showActions={false}
          />
        )}

        {activeTab === 'past' && (
          <EventList events={getActiveEvents()} />
        )}

        {registeredEvents.length === 0 && (
          <EmptyState message="You haven't registered for any events yet" />
        )}
      </div>
    </div>
  );
}

export default MyEvents;
