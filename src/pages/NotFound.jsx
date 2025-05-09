import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const navigate = useNavigate();
  
  // Icon component declarations
  const AlertTriangleIcon = getIcon('AlertTriangle');
  const HomeIcon = getIcon('Home');
  const ArrowLeftIcon = getIcon('ArrowLeft');
  
  // Redirect to home after 10 seconds
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 10000);
    
    return () => clearTimeout(redirectTimer);
  }, [navigate]);
  
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
          <AlertTriangleIcon className="h-10 w-10 text-primary dark:text-primary-light" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <HomeIcon className="h-5 w-5" />
            Go Home
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="btn bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600 flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            Go Back
          </button>
        </div>
        
        <div className="mt-8 text-sm text-surface-500 dark:text-surface-400">
          Redirecting to home page in 10 seconds...
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;