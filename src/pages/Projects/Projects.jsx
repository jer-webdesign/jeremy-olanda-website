import React, { useState } from 'react';
import { Code, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import './Projects.css';

const Projects = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getVisibleProjects = () => {
    const visible = [];
    const total = projects.length;
    
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + total) % total;
      visible.push({
        project: projects[index],
        offset: i,
        index: index
      });
    }
    return visible;
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const activeProject = projects[activeIndex];

  return (
    <section className="carousel-projects-section">
      {/* Background Image: use fico_back.jpg when the active project's image is fico_blaze_advisor.png or fico_back.jpg */}
      {(() => {
        const raw = activeProject?.image;
        let bg = null;

        if (raw) {
          const rawStr = raw.toString();
          const normalized = rawStr.startsWith('/') || rawStr.startsWith('http') ? rawStr : `/${rawStr}`;

          // Priority checks: FICO back image, Koobits/awards, otherwise use the project's image
          if (rawStr.includes('fico_blaze_advisor.png') || rawStr.includes('fico_back.jpg')) {
            bg = '/fico_back.jpg';
          } else if (rawStr.includes('Koobits_awards.png') || rawStr.includes('awards.jpg')) {
            bg = '/awards.jpg';
          } else if (rawStr.includes('visbook.png') || rawStr.includes('visbook_back.jpg')) {
            bg = '/visbook_back.jpg';
          } else if (rawStr.includes('childrens_video.png') || rawStr.includes('childrens_back.jpg')) {
            bg = '/childrens_back.jpg';
          } else if (rawStr.includes('asia_gm_award.png') || rawStr.includes('gm_awards_back.jpg')) {
            bg = '/gm_awards_back.jpg';
          } else if (rawStr.includes('prometric.png') || rawStr.includes('prometric_back.jpg')) {
            bg = '/prometric_back.jpg';
          } else if (rawStr.includes('widget_dashboard.png') || rawStr.includes('widget_back.jpg')) {
            bg = '/widget_back.jpg';
          } else if (rawStr.includes('weather_forecast.png') || rawStr.includes('weather_back.jpg')) {
            bg = '/weather_back.jpg';
          } else if (rawStr.includes('dev_portfolio_platform.png') || rawStr.includes('dev_back.jpg')) {
            bg = '/dev_back.jpg';
          }  else if (rawStr.includes('US_Patent.png') || rawStr.includes('patent_back.jpg')) {
            bg = '/patent_back.jpg';
          } else {
            bg = normalized;
          }
        }

        return (
          <div
            className="carousel-background-image"
            style={{ backgroundImage: bg ? `url(${bg})` : 'none' }}
          />
        );
      })()}
     <div className="carousel-container">
        <div className="carousel-header">
          <h2 className="carousel-title">Top Projects</h2>
        </div>

        <div className="carousel-content">
          <div className="carousel-info">
            {(() => {
              const rawTitle = activeProject.title || '';
              // Match "Main Title (Organization)" where the org is parenthesized at the end
              const m = rawTitle.match(/^(.*?)(\s*(\(.*\))\s*)?$/);
              const main = m ? m[1] : rawTitle;
              const org = m && m[3] ? m[3] : null;

              return (
                <div>
                  <h1 className="project-main-title">{main}</h1>
                  {org && (
                    <div className="project-subtitle" style={{ marginTop: '-0.25rem', color: 'rgba(255, 255, 255, 0.7)' }}>{org}</div>
                  )}
                </div>
              );
            })()}
            <div className="project-meta">
              {/* <span className="project-meta-item">
                <Code size={16} /> Featured Project
              </span> */}
              {/* <span className="project-meta-separator">•</span>
              <span className="project-meta-item">{activeProject.technologies.length} Technologies</span> */}
            </div>
            <p className="project-description">{activeProject.description}</p>
            
            <div className="project-tech-tags">
              {activeProject.technologies.slice(0, 5).map((tech, idx) => (
                <span key={idx} className="tech-badge">{tech}</span>
              ))}
              {activeProject.technologies.length > 5 && (
                <span className="tech-badge">+{activeProject.technologies.length - 5} more</span>
              )}
            </div>

            <div className="project-actions">
              {activeProject.liveDemo && (
                <a href={activeProject.liveDemo} target="_blank" rel="noopener noreferrer" className="action-btn primary">
                  <ExternalLink size={18} /> Website URL
                </a>
              )}
              {activeProject.githubRepo && (
                <a href={activeProject.githubRepo} target="_blank" rel="noopener noreferrer" className="action-btn secondary">
                  <Github size={18} /> View Code
                </a>
              )}
            </div>
          </div>
        </div>





     </div>      
     <div className="carousel-background-overlay">
     </div>    
     <div className="carousel-cards-container">
            {/* Side navigation buttons positioned beside the carousel cards */}
            <div className="carousel-nav-side left">
              <button onClick={prevProject} className="carousel-nav-btn side" aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="carousel-nav-side right">
              <button onClick={nextProject} className="carousel-nav-btn side" aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="carousel-cards">
              {getVisibleProjects().map(({ project, offset, index }) => {
                const isActive = offset === 0;
                const isEdge = Math.abs(offset) === 2;
                
                return (
                  <div
                    key={project.id}
                    className={`carousel-card ${isActive ? 'active' : ''} ${isEdge ? 'edge' : ''}`}
                    style={{
                      left: '50%',
                      transform: `translateX(${offset * 100}%) translateX(-50%) scale(${isActive ? 1 : 0.8})`,
                      zIndex: 10 - Math.abs(offset),
                      opacity: isEdge ? 0.4 : 1
                    }}
                    onClick={() => !isEdge && handleCardClick(index)}
                  >
                    <div className="card-image-wrapper">
                      {project.image ? (
                        (() => {
                          const raw = project.image.toString();
                          // For carousel cards, if the image is fico_back.jpg, use fico_blaze_advisor.png instead
                          let cardSrc;
                          if (raw.includes('fico_back.jpg')) {
                            cardSrc = '/fico_blaze_advisor.png';
                          } else {
                            cardSrc = raw.startsWith('/') || raw.startsWith('http') ? raw : `/${raw}`;
                          }
                          return (
                            <img
                              src={cardSrc}
                              alt={project.title}
                              className="card-image"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          );
                        })()
                      ) : null}
                      <div className="card-image-placeholder" style={{ display: project.image ? 'none' : 'flex' }}>
                        <Code size={48} />
                      </div>
                    </div>
                    {isActive && <div className="active-indicator"></div>}
                  </div>
                );
              })}
            </div>
            {/* <div className="carousel-dots">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>             */}
     </div>
    </section>
    
  );
};

export default Projects;