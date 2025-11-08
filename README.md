# Developer Portfolio

A modern, responsive developer portfolio built with React and Vite, designed to showcase developer expertise through a professional and engaging interface.

---

## 🚀 Latest Updates (2025)

- **Frontend now fetches all data from a single `public/developer.json` file** for profile, projects, posts, hero, about, and skills (no backend API required for content display).
- **Contact form uses [EmailJS](https://www.emailjs.com/)** for sending messages directly to your email (no backend required for contact form).
- **No auto-reply is sent to visitors**—only you receive the contact notification.
- **Ready for Vercel deployment**: Just connect your repo and set environment variables in the Vercel dashboard.
- **Environment variables** for EmailJS are now required:
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_EMAILJS_PUBLIC_KEY`

---

# Table of Contents
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [Features](#features)
- [EmailJS Integration](#emailjs-integration)
- [Vercel Deployment](#vercel-deployment)
- [Customization](#customization)

---

# EmailJS Integration

1. [Sign up for EmailJS](https://www.emailjs.com/) and connect your email service.
2. Create an email template (use variables: `from_name`, `from_email`, `message`, `to_name`, `to_email`, `reply_to`).
3. Add your EmailJS credentials to your `.env` file:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. The contact form will send submissions to your email. No auto-reply is sent to the visitor.

---

# Vercel Deployment

1. Push your code to GitHub (or GitLab/Bitbucket).
2. Go to [Vercel](https://vercel.com/) and import your project.
3. Set the following build settings (auto-detected for Vite):
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add your environment variables in the Vercel dashboard:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
5. Deploy and get your live URL!

---

# Data Source

- All portfolio content is loaded from `public/developer.json`.
- To update your profile, projects, blog posts, or skills, just edit this JSON file.

---

# API Integration (Legacy/Optional)

- The app can still be configured to use a backend API by setting `VITE_API_BASE_URL` in your `.env` file.
- If the API is unavailable, fallback mock data is used.

---

# Developer Portfolio - Frontend

A modern, responsive developer portfolio built with React and Vite, designed to showcase developer expertise through a professional and engaging interface.

## Portfolio Features

### **Core Portfolio Sections**
- **Home**: Professional introduction with dynamic typing animation
- **About**: Comprehensive developer bio and personal branding
- **Skills**: Interactive technologies showcase with skill tags
- **Projects**: Project portfolio with GitHub repositories and live demos
- **Blog**: Technical articles demonstrating knowledge sharing
- **Contact**: Professional contact form with validation and feedback

### **Design & UX**
- **Modern Gradient Design**: Purple and blue gradient theme with professional styling
- **Smooth Animations**: Hover effects and transitions
- **Fully Responsive**: Mobile-first design optimized for all devices
- **Interactive Elements**: Engaging user interface with smooth scrolling navigation
- **Professional Presentation**: Clean, modern layout focused on showcasing developer work

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Integration](#api-integration)
- [Customization](#customization)

---

## Tech Stack

- **Framework**: React 18.2
- **Build Tool**: Vite 7.1
- **Styling**: Pure CSS with CSS Variables
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)
- **Security**: HTTPS with SSL integration

---

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** package manager
- **Backend Server** running on `https://localhost:3000` (see backend README)

---

## Installation

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

This will install:
- React and React DOM
- Vite and related plugins
- Lucide React (for icons)
- ESLint (for code quality)

---

## Development

### Start Development Server

```bash
npm run dev
```

The application will open automatically at `http://localhost:5173`


## Project Structure

```
frontend/
├── public/               # Static assets
│   └── dev_logo.png     # Portfolio logo
│   └── dev_logo.ico     # Portfolio icon
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   ├── index.css        # Global styles and variables
│   └── pages/           # Portfolio sections
│       ├── Home/        # Landing page with introduction
│       ├── About/       # Developer bio and personal brand
│       ├── Skills/      # Technologies and expertise showcase
│       ├── Projects/    # Project portfolio with GitHub links
│       ├── Blog/        # Technical articles and tutorials
│       └── Contact/     # Professional contact form
├── .env                 # Environment configuration
├── package.json         # Dependencies and scripts
└── vite.config.js       # HTTPS and SSL configuration
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── .eslintrc.cjs        # ESLint configuration
└── README.md            # This file
```

## Portfolio Features

### **Professional Sections**
- **Home**: Dynamic introduction with typing animation and clear value proposition
- **About**: Comprehensive developer bio showcasing expertise and personal branding
- **Skills**: Interactive technology showcase with skill tags and expertise areas
- **Projects**: Project portfolio with descriptions, GitHub repos, and live demos
- **Blog**: Technical articles demonstrating knowledge sharing and industry insights
- **Contact**: Professional contact form 

### **Technical Implementation**
- **HTTPS Integration**: Secure communication with SSL-enabled backend
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Modern UI**: Clean, professional design with gradient themes
- **Performance**: Optimized loading and smooth navigation
- **API Integration**: Dynamic content loading from secure backend
---

## Features

### 1. Hero Section
- Gradient text effects
- Social media links (GitHub, LinkedIn)
- Call-to-action button

### 2. About Section
- Skills showcase with animated tags
- Feature cards highlighting expertise
- Responsive grid layout

### 3. Projects Section
- Project cards with hover effects
- Technology tags
- Links to live demos and GitHub repos
- Glassmorphism card design

### 4. Blog Section
- Blog post previews
- Publication dates
- Tag system
- Smooth hover animations

### 5. Contact Section
- Contact form with validation
- Success/error status messages
- Secure API integration
- Form field validation

### 6. Navigation
- Navigation bar
- Active section highlighting
- Mobile-responsive hamburger menu

---

## API Integration (Legacy/Optional)

The frontend can optionally connect to a backend API if you set `VITE_API_BASE_URL` in your `.env` file. By default, all data is loaded from `public/developer.json` and no backend is required.

### API Endpoints (if using a backend)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/profile` | GET | Fetch developer profile data |
| `/projects` | GET | Fetch all projects |
| `/posts` | GET | Fetch all blog posts |
| `/contact` | POST | Submit contact form |

If the API is unavailable, the app will display fallback mock data.

---

# Environment Variables

Create `.env`:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

---

# Quick Start Summary

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:5173

# 5. Enjoy your portfolio!
```

---

**Note** 

For backend setup (optional), see the main project README.md in the parent directory.

---