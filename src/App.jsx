import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from './utils/iconUtils';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PropertyDetail from './pages/PropertyDetail';
import LocalityInsights from './pages/LocalityInsights';
import Testimonials from './pages/Testimonials';
import Privacy from './pages/Privacy';
import AddListing from './pages/AddListing';
import NotFound from './pages/NotFound';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference or use system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return savedMode === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Icon component declarations
  const MoonIcon = getIcon('Moon');
  const SunIcon = getIcon('Sun');
  const HomeIcon = getIcon('Home');
  const MenuIcon = getIcon('Menu');
  const MapIcon = getIcon('Map');
  const UserIcon = getIcon('User');
  const PlusIcon = getIcon('Plus');
  const XIcon = getIcon('X');

  return (
    <>
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-surface-900/90 backdrop-blur-sm border-b border-surface-200 dark:border-surface-800">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-primary dark:text-primary-light">
            <HomeIcon className="h-6 w-6" />
            <span className="text-xl font-bold">DwellDex</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              About
            </Link>
            <Link 
              to="/locality-insights" 
              className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <div className="flex items-center gap-1">
                <MapIcon className="h-4 w-4" />
                <span>Insights</span>
              </div>
            </Link>
            <Link 
              to="/contact" 
              className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              Contact
            </Link>
            <Link 
              to="/add-listing" 
              className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <div className="flex items-center gap-1">
                <PlusIcon className="h-4 w-4" />
                <span>Add Listing</span>
              </div>
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            {/* Authentication Links */}
            <div className="hidden md:flex items-center gap-3">
              <Link 
                to="/login" 
                className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="btn-primary text-sm py-1.5"
              >
                Register
              </Link>
            </div>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors duration-200"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={darkMode ? 'dark' : 'light'}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {darkMode ? (
                    <SunIcon className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <MoonIcon className="h-5 w-5 text-surface-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
            <button 
              className="md:hidden p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors duration-200"
              aria-label="Open menu"
            >
              <motion.div whileTap={{ scale: 0.9 }}>
                <MenuIcon className="h-5 w-5 text-surface-600 dark:text-surface-400" />
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-64px)]">
        <Routes>
          <Route path="/" element={<Home toast={toast} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact toast={toast} />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/property/:id" element={<PropertyDetail toast={toast} />} />
          <Route path="/locality-insights" element={<LocalityInsights />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/add-listing" element={<AddListing toast={toast} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-surface-100 dark:bg-surface-800 py-6 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-surface-600 dark:text-surface-400">
                © {new Date().getFullYear()} DwellDex. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">About</Link>
              <Link to="/contact" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Contact</Link>
              <Link to="/locality-insights" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Locality Insights</Link>
              <Link to="/privacy" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Privacy</Link>
              <Link to="/testimonials" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">Testimonials</Link>
            </div>
          </div>
        </div>
      </footer>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        toastClassName="backdrop-blur-sm"
        bodyClassName="text-sm font-medium"
      />
    </>
  );
}

export default App;