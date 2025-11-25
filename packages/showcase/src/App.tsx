import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
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

function Navigation() {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <div className="logo">
        <h1>AetherUI</h1>
        <p className="subtitle">Kitchen Sink</p>
      </div>
      <ul className="nav-list">
        {components.map((comp) => (
          <li key={comp.path} className={location.pathname === comp.path ? 'active' : ''}>
            <Link to={comp.path}>{comp.name}</Link>
          </li>
        ))}
      </ul>
      <div className="footer">
        <p>Headless Web Components</p>
        <p className="version">v0.1.0</p>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router basename="/showcase">
      <div className="app">
        <Navigation />
        <main className="content">
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
