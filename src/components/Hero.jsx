import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover & Join
            <span className="hero-highlight"> Amazing Campus Events</span>
          </h1>
          <p className="hero-subtitle">
            Stay connected with the latest events happening around your campus. 
            From academic seminars to cultural festivals, find everything here.
          </p>
          <div className="hero-actions">
            <Link to="/events" className="btn btn-primary btn-lg">
              Browse Events
            </Link>
            <Link to="/create" className="btn btn-outline btn-lg">
              Create Event
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Clubs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Participants</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-illustration">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
