import './About.css';

function About() {
  return (
    <div className="page">
      <div className="container">
        <div className="about-page">
          <div className="about-header">
            <h1 className="section-title">About Campus Hub</h1>
            <p className="section-subtitle">Connecting students through events</p>
          </div>

          <div className="about-content">
            <div className="about-section">
              <h2>Our Mission</h2>
              <p>
                Campus Hub is your centralized platform for discovering, organizing, and participating
                in campus events. We believe that college life extends beyond the classroom, and
                events play a crucial role in building communities, developing skills, and creating
                lasting memories.
              </p>
            </div>

            <div className="about-section">
              <h2>What We Offer</h2>
              <div className="about-features">
                <div className="about-feature">
                  <span className="feature-icon">&#128269;</span>
                  <h3>Discover Events</h3>
                  <p>Browse through a wide range of campus events from academic seminars to cultural festivals.</p>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">&#128221;</span>
                  <h3>Easy Registration</h3>
                  <p>Register for events with a single click and keep track of all your registrations.</p>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">&#128203;</span>
                  <h3>Create Events</h3>
                  <p>Organize your own events and reach out to the entire campus community.</p>
                </div>
                <div className="about-feature">
                  <span className="feature-icon">&#128101;</span>
                  <h3>Build Community</h3>
                  <p>Connect with like-minded students and be part of an active campus life.</p>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2>Tech Stack</h2>
              <p>This platform is built using modern web technologies:</p>
              <div className="tech-stack">
                {['React', 'React Router', 'Fetch API', 'CSS3', 'HTML5', 'ES6+', 'Vite', 'MockAPI'].map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
