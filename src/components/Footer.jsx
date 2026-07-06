import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">&#9733;</span>
              <span className="logo-text">Campus Hub</span>
            </div>
            <p className="footer-desc">
              Your one-stop destination for all campus events. Stay connected, participate, and make the most of your college life.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/create">Create Event</Link></li>
              <li><Link to="/my-events">My Events</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/events">Academic</Link></li>
              <li><Link to="/events">Cultural</Link></li>
              <li><Link to="/events">Sports</Link></li>
              <li><Link to="/events">Technology</Link></li>
              <li><Link to="/events">Music</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links contact-links">
              <li>contact@campushub.edu</li>
              <li>+1 (555) 123-4567</li>
              <li>University Campus, Building A</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Campus Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
