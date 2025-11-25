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

const components = [
  { path: '/', name: 'Home', component: Home },
  { path: '/buttons', name: 'Buttons & Badges', component: ButtonShowcase },
  { path: '/inputs', name: 'Text Inputs', component: InputShowcase },
  { path: '/forms', name: 'Form Controls', component: FormControlsShowcase },
  { path: '/alerts', name: 'Alerts & Messages', component: AlertShowcase },
  { path: '/modals', name: 'Modals & Drawers', component: ModalShowcase },
  { path: '/tabs', name: 'Tabs', component: TabsShowcase },
  { path: '/accordion', name: 'Accordion', component: AccordionShowcase },
  { path: '/navigation', name: 'Navigation', component: NavigationShowcase },
  { path: '/feedback', name: 'Feedback & Progress', component: FeedbackShowcase },
  { path: '/data', name: 'Data Display', component: DataShowcase },
];

interface NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

function Navigation({ isOpen, onToggle }: NavigationProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}

      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo">
          <h1>AetherUI</h1>
          <p className="subtitle">Kitchen Sink</p>
          <button className="close-btn" onClick={onToggle} aria-label="Close sidebar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="nav-list">
          {components.map((comp) => (
            <li key={comp.path} className={location.pathname === comp.path ? 'active' : ''}>
              <Link to={comp.path} onClick={() => window.innerWidth < 1024 && onToggle()}>
                {comp.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="footer">
          <p>Headless Web Components</p>
          <p className="version">v0.1.0</p>
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

  return (
    <Router basename="/showcase">
      <div className={`app ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed-app'}`}>
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>

        <Navigation isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        <main className={`content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
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
