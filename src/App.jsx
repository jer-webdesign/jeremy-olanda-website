import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Import pages
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Skills from './pages/Skills/Skills.jsx';
import Projects from './pages/Projects/Projects.jsx';
import Blog from './pages/Blog/Blog.jsx';
import Contact from './pages/Contact/Contact.jsx';

// Import components
import Navbar from './components/Navbar/Navbar.jsx';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';


const App = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [hero, setHero] = useState(null);
  const [about, setAbout] = useState(null);
  const [skillCategories, setSkillCategories] = useState([]);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/public/developer.json');
      const data = await res.json();
      setProfile(data.profile || null);
      setProjects(data.projects || []);
      setPosts(data.posts || []);
      setHero(data.hero || null);
      setAbout(data.about || null);
      setSkillCategories(data.skillCategories || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setProfile({
        name: "Jeremy Olanda",
        bio: "Software Engineer with expertise in development, testing, deployment, and backend support. Currently advancing technical capabilities in modern web technologies at Southern Alberta Institute of Technology (SAIT). Proven track record of delivering scalable, cost-effective solutions while leading cross-functional development teams and optimizing enterprise-grade systems for global organizations.",
        skills: ["C/C++", "Java", "Python", "JavaScript", "React", "Node.js", "PostgreSQL", "MongoDB", "Docker", "AWS"],
        github: "https://github.com/jeremyolanda",
        linkedin: "https://linkedin.com/in/jeremyolanda"
      });
      setProjects([]);
      setPosts([]);
      setHero(null);
      setAbout(null);
      setSkillCategories([]);
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setFormStatus('error');
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('Missing EmailJS configuration');
      setFormStatus('error');
      return;
    }

    setFormStatus('loading');

    try {
      const templateParams = {
        from_name: 'Jeremy', 
        from_email: 'jeremy.g.olanda@gmail.com',
        message: contactForm.message,
        to_name: contactForm.name,
        to_email: contactForm.email,
        reply_to: 'jeremy.g.olanda@gmail.com',
      };

      // Send notification email to you
      console.log('Sending notification email...');
      const notificationResult = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      console.log('Notification email sent:', notificationResult);
      setFormStatus('success');
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(null), 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      console.error('Error details:', error.text || error.message);
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  const navigateToSection = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show notification
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = `Copied: ${text}`;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const showContactModal = () => {
    document.getElementById('contactModal').style.display = 'flex';
  };

  const closeModal = () => {
    document.getElementById('contactModal').style.display = 'none';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'var(--bg-gradient)'}}>
        <div className="text-primary text-2xl pulse">Loading Portfolio...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{background: 'var(--bg-dark)'}}>
      {/* Loading Screen */}
      {loading && (
        <div className="loading" id="loading">
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Background Animation */}
      <div className="bg-animation">
        <div className="particles" id="particles"></div>
      </div>
      

      {/* Header */}
      <Header />

      {/* Navigation */}
      <Navbar
        activeSection={activeSection}
        navigateToSection={navigateToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Page Sections */}
      {activeSection === 'home' && (
        <Home 
          profile={profile} 
          hero={hero}
          navigateToSection={navigateToSection} 
          showContactModal={showContactModal} 
        />
      )}
      {activeSection === 'about' && (
        <About 
          profile={profile}
          about={about}
        />
      )}
      {activeSection === 'skills' && (
        <Skills 
          profile={profile}
          skillCategories={skillCategories}
        />
      )}
      {activeSection === 'projects' && (
        <Projects projects={projects} />
      )}
      {activeSection === 'blog' && (
        <Blog posts={posts} />
      )}
      {activeSection === 'contact' && (
        <Contact 
          contactForm={contactForm} 
          setContactForm={setContactForm} 
          formStatus={formStatus} 
          handleContactSubmit={handleContactSubmit}
          copyToClipboard={copyToClipboard}
        />
      )}

      {/* Contact Modal */}
      <div className="modal" id="contactModal" style={{display: 'none'}}>
        <div className="modal-content">
          <button className="modal-close" onClick={() => document.getElementById('contactModal').style.display = 'none'}>
            &times;
          </button>
          <h3 style={{marginBottom: '2rem', color: 'var(--primary)'}}>
            🚀 Let's Build Something Amazing
          </h3>
          <p style={{color: 'var(--text-muted)', marginBottom: '2rem'}}>
            Whether you're looking for a senior developer to lead your next project, 
            or need expertise in full-stack development, I'm here to help bring your vision to life.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={() => copyToClipboard('jeremy.g.olanda@gmail.com')}>
              📧 Copy Email
            </button>
            <button className="btn btn-secondary" onClick={() => copyToClipboard('+1 (403) 987-6543')}>
              📱 Copy Phone
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;