import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="page not-found-page">
      <div className="container not-found-container">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-text">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
