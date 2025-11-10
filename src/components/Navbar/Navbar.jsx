import React from 'react';
import './Navbar.css';

const NAV_LINKS = [
	{ id: 'home', label: 'Home' },
	{ id: 'about', label: 'About' },
	{ id: 'skills', label: 'Skills' },
	{ id: 'projects', label: 'Projects' },
	// { id: 'blog', label: 'Blog' },
	{ id: 'experience', label: 'Experience' },
	{ id: 'contact', label: 'Contact' }
];

const Navbar = ({ activeSection, navigateToSection, mobileMenuOpen, setMobileMenuOpen }) => (
	<nav className="nav" id="nav" aria-label="Main navigation">
		<div className="nav-container">
			<a className="nav-logo" href="#home" onClick={e => { e.preventDefault(); navigateToSection('home'); }} tabIndex={0} aria-label="Go to Home">
				<img src="/jerfx_logo.png" alt="Developer Logo" />
				{/* <span className="nav-logo-text">Jer Portfolio</span> */}
			</a>
			<button
				className="nav-toggle"
				aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
				aria-expanded={mobileMenuOpen}
				aria-controls="main-menu"
				onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
			>
				<span aria-hidden="true">&#9776;</span>
			</button>
			<ul
				id="main-menu"
				className={`nav-menu${mobileMenuOpen ? ' open' : ''}`}
				role="menubar"
			>
				{NAV_LINKS.map((item) => (
					<li
						key={item.id}
						className={`nav-item${activeSection === item.id ? ' active' : ''}`}
						role="menuitem"
						tabIndex={0}
						aria-current={activeSection === item.id ? 'page' : undefined}
						onClick={() => navigateToSection(item.id)}
						onKeyDown={e => {
							if (e.key === 'Enter' || e.key === ' ') navigateToSection(item.id);
						}}
					>
						{item.label}
					</li>
				))}
			</ul>
		</div>
	</nav>
);

export default Navbar;
