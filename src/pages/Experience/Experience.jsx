import './Experience.css';


import React, { useRef, useState } from 'react';

const Experience = ({ experience }) => {
  // Track which item is animating for highlight
  const [highlighted, setHighlighted] = useState(null);
  // Track ripple for each item
  const [ripples, setRipples] = useState({});

  // Handler for expansion effect
  const handleExpand = (id, e) => {
    const itemRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - itemRect.left;
    const y = e.clientY - itemRect.top;
    // Set ripple for this item
    setRipples((prev) => ({
      ...prev,
      [id]: { x, y, key: Date.now() }
    }));
    // Highlight
    setHighlighted(id);
    setTimeout(() => setHighlighted(null), 300);
    setTimeout(() => setRipples((prev) => ({ ...prev, [id]: null })), 600);
  };

  return (
    <section className="experience-section">
      <h2 className="experience-section-title">Professional Experience</h2>
      <div className="experience-timeline">
        {experience.map((job) => (
          <div
            className="experience-item"
            key={job.id}
            style={
              highlighted === job.id
                ? {
                    transform: 'scale(1.02)',
                    borderColor: 'var(--accent)',
                    boxShadow: '0 25px 50px rgba(6, 182, 212, 0.3)'
                  }
                : {}
            }
            onClick={(e) => handleExpand(job.id, e)}
          >
            {/* Ripple effect */}
            {ripples[job.id] && (
              <span
                style={{
                  position: 'absolute',
                  left: ripples[job.id].x,
                  top: ripples[job.id].y,
                  width: 20,
                  height: 20,
                  marginLeft: -10,
                  marginTop: -10,
                  borderRadius: '50%',
                  background: 'rgba(37, 99, 235, 0.3)',
                  transform: 'scale(0)',
                  animation: 'ripple 0.6s linear',
                  pointerEvents: 'none',
                  zIndex: 2
                }}
                key={ripples[job.id].key}
              />
            )}
            {/* Date label for timeline */}
            <div className="experience-date-label">
              {job.startDate} - {job.endDate}
            </div>
            <div className="experience-company">{job.company}</div>
            <div className="experience-job-title">{job.position}</div>
            <div className="experience-location">{job.location}</div>
            <div className="experience-role-description">{job.role}</div>
            <ul className="experience-responsibilities">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Ripple animation keyframes */}
      <style>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;





