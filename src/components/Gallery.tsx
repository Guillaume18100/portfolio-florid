import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Gallery: React.FC = () => {
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
                    <span className="font-semibold tracking-wide">PORTFOLIO</span>
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
                    <span className="font-semibold tracking-wide">ABOUT ME</span>
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
                    <span className="font-semibold tracking-wide">CONTACT</span>
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
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/img/Illustration_Delacroix.jpg')`,
          backgroundPosition: 'center 20%',
        }}
      />
      
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
