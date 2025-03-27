import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  duration?: number;
  onComplete?: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ duration = 2000, onComplete }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(prefersDarkMode.matches);

    const timer = setTimeout(() => {
      onComplete && onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  const getBackgroundColor = () => isDarkMode ? '#121212' : '#f4f4f4';
  const getPrimaryColor = () => isDarkMode ? '#6f9' : '#4a90e2';

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center transition-colors duration-500"
      style={{ 
        backgroundColor: getBackgroundColor(),
        zIndex: 9999 
      }}
    >
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="50" 
        height="50" 
        viewBox="0 0 56.45 56.82"
        animate={{
          scale: [1, 1.2, 1],
          transition: {
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <motion.path 
          d="M55.93,62.27l20.2.23a3.84,3.84,0,0,1,3.8,3.63,45.657,45.657,0,0,1-.06,6.2,3.851,3.851,0,0,1-3.86,3.48l-48.58-.3a3.852,3.852,0,0,1-3.83-3.9l.56-47.62a3.852,3.852,0,0,1,3.86-3.81h5.07a3.862,3.862,0,0,1,3.85,3.87l-.05,19.93a3.854,3.854,0,0,0,6.58,2.73L58.64,31.54a3.863,3.863,0,0,0,0-5.45l-.52-.52a3.855,3.855,0,0,1,2.76-6.58l15.22.13a3.859,3.859,0,0,1,3.82,3.82l.13,15.22a3.855,3.855,0,0,1-6.58,2.76h0a3.863,3.863,0,0,0-5.45,0L53.24,55.7a3.856,3.856,0,0,0,2.68,6.58Z" 
          transform="translate(-23.6 -18.99)" 
          fill={getPrimaryColor()}
          animate={{
            pathLength: [0, 1, 1, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              times: [0, 0.5, 0.75, 1],
              ease: "easeInOut"
            }
          }}
        />
      </motion.svg>
    </div>
  );
};

export default Preloader;
