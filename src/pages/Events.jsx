import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventList from '../components/EventList';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { getEvents } from '../services/api';
import './Events.css';

function Events() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', club: '', sort: '' });
  const [searchParams] = useSearchParams();

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
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
  }, [searchParams]);

  const filteredEvents = allEvents.filter((event) => {
    const q = search.toLowerCase();
    const matchesSearch = !search ||
      event.title.toLowerCase().includes(q) ||
      event.club.toLowerCase().includes(q) ||
      event.category.toLowerCase().includes(q);

    const matchesCategory = !filters.category || event.category === filters.category;
    const matchesClub = !filters.club || event.club === filters.club;

    return matchesSearch && matchesCategory && matchesClub;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (filters.sort === 'date-asc') return new Date(a.date) - new Date(b.date);
    if (filters.sort === 'date-desc') return new Date(b.date) - new Date(a.date);
    if (filters.sort === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  if (loading) return <div className="page"><div className="container"><Loader /></div></div>;

  if (error) return <div className="page"><div className="container"><ErrorMessage message={error} onRetry={fetchEvents} /></div></div>;

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="section-title">All Events</h1>
          <p className="section-subtitle">Browse and discover campus events</p>
        </div>
        <div className="events-toolbar">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <FilterBar filters={filters} onFilterChange={setFilters} />
        <EventList events={sortedEvents} />
      </div>
    </div>
  );
}

export default Events;
