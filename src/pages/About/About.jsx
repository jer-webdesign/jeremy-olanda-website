import './About.css';

const About = ({ profile, about }) => {
  return (
    <section className="about-section">
      <h2 className="about-section-title">{about?.title || 'About Me'}</h2>
      <div className="about-grid">
        <div className="about-card slide-in-up">
          <div className="about-category">Profile Bio</div>
          <div className="about-items">
            <span className="about-tag slide-in-up" style={{whiteSpace: 'pre-line'}}>
              {about?.content || profile?.bio}
            </span>
          </div>
        </div>
        <div className="about-card slide-in-up">
          <div className="about-category">Secure Development</div>
          <div className="about-items">
            <span className="about-tag slide-in-up">
              Building robust, secure applications with HTTPS, SSL/TLS, and comprehensive security practices.
            </span>
          </div>
        </div>
        <div className="about-card slide-in-up">
          <div className="about-category">Knowledge Sharing</div>
          <div className="about-items">
            <span className="about-tag slide-in-up">
              Contributing to the developer community through technical tutorials and insights on modern web technologies.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;