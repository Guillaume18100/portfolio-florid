import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Gallery: React.FC = () => {
  const location = useLocation();
  const [backgroundKey, setBackgroundKey] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Construct proper image path with base URL for GitHub Pages
  const getImagePath = (imagePath: string) => {
    const base = import.meta.env.BASE_URL || '/';
    // Remove leading slash from imagePath if present and ensure proper joining
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    return `${base}${cleanPath}`.replace(/\/+/g, '/');
  };
  
  const delacroixImg = getImagePath('img/Illustration_Delacroix.jpg');
  
  // Force background reload when component mounts or location changes
  useEffect(() => {
    // Only reload when we're actually on the home page
    if (location.pathname === '/' || location.pathname === import.meta.env.BASE_URL || location.pathname === `${import.meta.env.BASE_URL}/`) {
      setBackgroundKey(prev => prev + 1);
      setImageLoaded(false);
      
      // Small delay to ensure component is fully mounted
      const timer = setTimeout(() => {
        // Preload the image
        const img = new Image();
        img.onload = () => {
          setImageLoaded(true);
        };
        img.onerror = () => {
          // If image fails to load, still show it without the transition
          setImageLoaded(true);
        };
        img.src = delacroixImg;
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, delacroixImg]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-20 bg-black bg-opacity-90 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo/Brand */}
            <div className="text-white">
              <h2 className="text-xl font-bold font-serif tracking-wide">
                FLORIE DERAMCHI
              </h2>
              <p className="text-xs text-amber-300 font-light">
                Visual Arts Student
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-8">
              <Link to="/portfolio">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-center space-x-2 text-white hover:text-amber-300 transition-colors duration-300">
                    <span className="text-lg">🎨</span>
                    <span className="font-light tracking-wide">PORTFOLIO</span>
                  </div>
                  <div className="h-0.5 bg-amber-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.div>
              </Link>

              <Link to="/about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-center space-x-2 text-white hover:text-amber-300 transition-colors duration-300">
                    <span className="text-lg">👩‍🎨</span>
                    <span className="font-light tracking-wide">ABOUT ME</span>
                  </div>
                  <div className="h-0.5 bg-amber-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.div>
              </Link>

              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <div className="flex items-center space-x-2 text-white hover:text-amber-300 transition-colors duration-300">
                    <span className="text-lg">�</span>
                    <span className="font-light tracking-wide">CONTACT</span>
                  </div>
                  <div className="h-0.5 bg-amber-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Background Image - Full Screen */}
      <div 
        key={`background-${backgroundKey}`}
        className={`absolute inset-0 transition-opacity duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url('${delacroixImg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Fallback background while image loads */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-stone-800" />
      )}
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      
      {/* Main Content - Artist Name */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white text-center px-4 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Artist Name */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-extrabold mb-4 tracking-wider font-serif leading-none hero-name-shadow">
            FLORIE
          </h1>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-[0.2em] font-serif leading-none mb-8 hero-name-shadow">
            DERAMCHI
          </h2>
          
          {/* Artistic Statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-12"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-amber-200 font-light tracking-wide mb-6">
              Visual Arts Student
            </p>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto"></div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2 tracking-wide">EXPLORE MY WORK</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/70 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
