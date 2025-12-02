/**
 * ============================================
 * REACT COMPONENTS FOR PORTFOLIO
 * ============================================
 * 
 * These are React component templates that you can use
 * when you set up a full React project with Vite or Create React App.
 * 
 * To use these:
 * 1. Set up a new React project: npm create vite@latest my-portfolio -- --template react
 * 2. Copy these components to src/components/
 * 3. Install React Router: npm install react-router-dom
 * 4. Set up your main App.jsx to use these components
 */

// ============================================
// components/Navigation.jsx
// ============================================

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => 
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <nav className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <h1>My Portfolio</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/services">Services</Link>
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}

// ============================================
// components/HomePage.jsx
// ============================================

import React, { useEffect, useRef } from 'react';

export function HomePage() {
  const videoRef = useRef(null);
  const [observedElements, setObservedElements] = React.useState(new Set());

  useEffect(() => {
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div id="fit">
      <section className="intro fade-in">
        <h1>Mujahid Adam</h1>
        <h3>Aspiring Data Scientist | ML Enthusiast</h3>
        <p>Turning real-world chaos into clean insights and solutions that actually scale.</p>
      </section>

      <video ref={videoRef} className="hero-video" controls muted loop>
        <source src="president.mp4" type="video/mp4" />
      </video>

      <section className="myself fade-in">
        <h2>About Me</h2>
        <p>
          I'm a forward-thinking data scientist passionate about analytics and machine learning. 
          Currently leveling up my stack and working on projects in finance, AI, and lifestyle tech.
        </p>
      </section>

      <section className="skill fade-in">
        <h2>Skills</h2>
        <ul>
          <li><b>Technical Skills:</b> Python (certified), SQL, Pandas, Numpy, Scikit-Learn, Power BI, Tableau</li>
          <li><b>Soft Skills:</b> Problem solving, Communication, Teamwork</li>
          <li><b>Tools:</b> VSCode, Jupyter Notebook, Kaggle, GitHub, Excel</li>
        </ul>
      </section>

      <section className="light fade-in">
        <h1>Experience</h1>
        <p>Machine Learning Amateur (2022-2026)</p>
        <p>Freelance - Upwork, Fiverr (2025-present)</p>
        <p>Kaggle Contestant (2025-present)</p>
      </section>

      <section className="certified fade-in">
        <h1>Certifications</h1>
        <p>Professional Data Analytics Certificate (2021)</p>
        <p>RTC Cybersecurity Awareness (2024)</p>
        <p>Python Developer - Sololearn (2025)</p>
        <p>IBM Data Science Professional Certificate (2026)</p>
      </section>

      <section className="education fade-in">
        <h2>Education</h2>
        <p>WASSCE Graduate - Accra Academy (2025)</p>
        <p>Self-Learning Coding (2025-present)</p>
      </section>
    </div>
  );
}

// ============================================
// components/ProjectCard.jsx
// ============================================

import React, { useState } from 'react';

export function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
      className="project-card fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="project-badge">{project.category}</div>
      <h2>{project.title}</h2>
      <p className="project-desc">{project.description}</p>
      <div className="project-tech">
        {project.technologies.map(tech => (
          <span key={tech} className="tech-tag">{tech}</span>
        ))}
      </div>
      <div className="project-links">
        <a href={project.codeLink} className="btn-primary">View Code</a>
        <a href={project.liveLink} className="btn-secondary">Live Demo</a>
      </div>
    </article>
  );
}

// ============================================
// components/ProjectsPage.jsx
// ============================================

import React, { useState } from 'react';
import { ProjectCard } from './ProjectCard';

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projects = [
    {
      id: 1,
      title: 'Customer Churn Prediction',
      category: 'Data Analytics',
      description: 'ML model predicting customer churn with 85% accuracy',
      technologies: ['Python', 'Scikit-Learn', 'Pandas', 'SQL'],
      codeLink: '#',
      liveLink: '#'
    },
    // Add more projects...
  ];

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="projects-container">
      <header className="projects-header">
        <h1>My Projects</h1>
        <p className="subtitle">Exploring data, building ML models, creating insights</p>
      </header>

      <div className="filter-container">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            style={{
              borderColor: selectedCategory === category ? '#667eea' : '#ddd',
              background: selectedCategory === category ? '#667eea' : 'transparent',
              color: selectedCategory === category ? 'white' : '#667eea'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <main className="projects-grid">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </main>
    </div>
  );
}

// ============================================
// components/ServiceCard.jsx
// ============================================

import React from 'react';

export function ServiceCard({ icon, title, description }) {
  return (
    <article className="service-card fade-in">
      <img src={icon} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

// ============================================
// components/ContactForm.jsx
// ============================================

import React, { useState } from 'react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would send the form data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitMessage('✓ Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', service: '', message: '' });
      
      setTimeout(() => setSubmitMessage(''), 5000);
    } catch (error) {
      setSubmitMessage('Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section">
      <h2>Send me a Message</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="service">Service Interest</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            <option value="analytics">Data Analytics</option>
            <option value="ml">Machine Learning</option>
            <option value="dashboard">Dashboard Development</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            rows="5"
            required
          />
        </div>
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {submitMessage && <div className="submit-message">{submitMessage}</div>}
    </section>
  );
}

// ============================================
// App.jsx (Main routing file)
// ============================================

/**
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { ProjectsPage } from './components/ProjectsPage';
import { ServicesPage } from './components/ServicesPage';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/services" element={<ServicesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
*/

// ============================================
// SETUP INSTRUCTIONS
// ============================================

/**
To migrate your portfolio to React:

1. Create a new React project:
   npm create vite@latest portfolio-react -- --template react
   cd portfolio-react
   npm install

2. Install React Router:
   npm install react-router-dom

3. Copy the component files to src/components/

4. Update src/App.jsx with the routing setup

5. Copy your CSS files to src/ and import them in components

6. Run development server:
   npm run dev

7. Build for production:
   npm run build

8. For GitHub Pages deployment:
   - Add to package.json: "homepage": "https://advmberry-coder.github.io/mujahid-adam-portfolio"
   - Run: npm run build
   - Deploy the dist/ folder to GitHub Pages
*/
