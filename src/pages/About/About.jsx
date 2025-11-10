import './About.css';

const About = ({ profile, about }) => {
  return (
    <section className="about-section">
      <h2 className="about-section-title">{about?.title || 'About Me'}</h2>
      <div className="about-main-flex">
        <div className="about-grid">
          <div className="about-card slide-in-up">
            <div className="about-category">Profile Bio</div>
            <div className="about-bio-flex">
              <div className="about-profile-pic-wrap" style={{marginBottom: 0, justifyContent: 'center'}}>
                <img
                  src="/jeremy.jpg"
                  alt="Jeremy Olanda profile"
                  className="about-profile-pic"
                />
              </div>
              <div className="about-items">
                {/* Render about.content as array (paragraphs) when present, otherwise fallback to single string */}
                <div className="about-tag slide-in-up about-content">
                  {(() => {
                    const content = about?.content ?? profile?.bio ?? '';
                    if (Array.isArray(content)) {
                      return content.map((p, i) => {
                        const text = (p || '').toString();
                        const classes = [];
                        if (i === 0) classes.push('about-lead');
                        if (text.trim() === 'What I Enjoy' || text.trim() === 'What Inspires You') classes.push('about-heading');
                        return (
                          <p key={i} className={classes.join(' ')} style={{margin: '0 0 0.75rem 0'}}>{p}</p>
                        );
                      });
                    }
                    return <span style={{whiteSpace: 'pre-line'}}>{content}</span>;
                  })()}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="about-card slide-in-up">
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
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default About;