import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import EventList from '../components/EventList';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { getEvents } from '../services/api';
import './Home.css';

function Home() {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

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

  const featured = allEvents.filter((e) => e.featured).slice(0, 3);
  const upcoming = allEvents
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  const filteredUpcoming = upcoming.filter((event) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      event.title.toLowerCase().includes(q) ||
      event.club.toLowerCase().includes(q) ||
      event.category.toLowerCase().includes(q)
    );
  });

  const sectionHeading = (title, subtitle, link) => (
    <div className="section-header">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {link && <Link to={link} className="btn btn-outline btn-sm">View All</Link>}
    </div>
  );

  if (loading) return <Loader />;

  if (error) return <ErrorMessage message={error} onRetry={fetchEvents} />;

  return (
    <div>
      <Hero />

      <section className="section events-section">
        <div className="container">
          {sectionHeading(
            'Upcoming Events',
            'Don\'t miss out on these exciting events',
            '/events'
          )}
          <div className="home-search">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search upcoming events..."
            />
          </div>
          <EventList events={filteredUpcoming} />
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section featured-section">
          <div className="container">
            {sectionHeading('Featured Events', 'Handpicked events for you')}
            <EventList events={featured} />
          </div>
        </section>
      )}

      <section className="section categories-section">
        <div className="container">
          {sectionHeading('Browse by Category', 'Find events that interest you')}
          <div className="categories-grid">
            {['Academic', 'Cultural', 'Sports', 'Technology', 'Music', 'Art', 'Workshop', 'Festival'].map((cat) => (
              <Link to={`/events?category=${cat}`} key={cat} className="category-card">
                <span className="category-name">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-container">
          <h2 className="cta-title">Have an event to organize?</h2>
          <p className="cta-text">Create and promote your campus event in minutes</p>
          <Link to="/create" className="btn btn-primary btn-lg">Create Event</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
