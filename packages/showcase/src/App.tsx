import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

// Component pages
import ButtonShowcase from './pages/ButtonShowcase';
import InputShowcase from './pages/InputShowcase';
import FormControlsShowcase from './pages/FormControlsShowcase';
import AlertShowcase from './pages/AlertShowcase';
import ModalShowcase from './pages/ModalShowcase';
import TabsShowcase from './pages/TabsShowcase';
import AccordionShowcase from './pages/AccordionShowcase';
import NavigationShowcase from './pages/NavigationShowcase';
import FeedbackShowcase from './pages/FeedbackShowcase';
import DataShowcase from './pages/DataShowcase';
import Home from './pages/Home';

const navigationSections = [
  {
    title: 'SHOWCASE',
    items: [
      { path: '/', name: 'Home', component: Home },
    ]
  },
  {
    title: 'COMPONENTS',
    items: [
      { path: '/buttons', name: 'Buttons & Badges', component: ButtonShowcase },
      { path: '/inputs', name: 'Text Inputs', component: InputShowcase },
      { path: '/forms', name: 'Form Controls', component: FormControlsShowcase },
      { path: '/alerts', name: 'Alerts & Messages', component: AlertShowcase },
      { path: '/modals', name: 'Modals & Drawers', component: ModalShowcase },
    ]
  },
  {
    title: 'ADVANCED',
    items: [
      { path: '/tabs', name: 'Tabs', component: TabsShowcase },
      { path: '/accordion', name: 'Accordion', component: AccordionShowcase },
      { path: '/navigation', name: 'Navigation', component: NavigationShowcase },
      { path: '/feedback', name: 'Feedback & Progress', component: FeedbackShowcase },
      { path: '/data', name: 'Data Display', component: DataShowcase },
    ]
  }
];

// Flatten for routes
const components = navigationSections.flatMap(section => section.items);

interface NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

function Navigation({ isOpen, onToggle, theme, onThemeToggle }: NavigationProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}

      <nav className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
        <div className="sidebar-header">
          {isOpen && (
            <>
              <div>
                <h1>AetherUI</h1>
                <p className="subtitle">Kitchen Sink</p>
              </div>
              <div className="header-actions">
                <button className="theme-toggle" onClick={onThemeToggle} aria-label="Toggle theme">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {theme === 'light' ? (
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    ) : (
                      <circle cx="12" cy="12" r="5" />
                    )}
                  </svg>
                </button>
                <button className="collapse-btn" onClick={onToggle} aria-label="Toggle sidebar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              </div>
            </>
          )}
          {!isOpen && (
            <button className="collapse-btn" onClick={onToggle} aria-label="Toggle sidebar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        <div className="nav-sections">
          {navigationSections.map((section) => (
            <div key={section.title} className="nav-section">
              {isOpen && <div className="section-title">{section.title}</div>}
              <ul className="nav-list">
                {section.items.map((item) => (
                  <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
                    <Link to={item.path} onClick={() => window.innerWidth < 1024 && onToggle()}>
                      {isOpen ? item.name : item.name.charAt(0)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}

function App() {
  // Initialize sidebar state based on screen size
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1025;
    }
    return true;
  });

  // Initialize theme from localStorage or default to light
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return (saved as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  // Save theme to localStorage when it changes
  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  return (
    <Router basename="/showcase">
      <div className={`app ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed-app'} theme-${theme}`}>
        {/* Mobile menu toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>

        <Navigation
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          theme={theme}
          onThemeToggle={handleThemeToggle}
        />

        <main className={`content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}>
          <Routes>
            {components.map((comp) => (
              <Route key={comp.path} path={comp.path} element={<comp.component />} />
            ))}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
