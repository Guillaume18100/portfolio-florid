import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render header on home page since we have integrated navigation
  if (isHomePage) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-2 left-0 right-0 z-50 transition-all duration-500 bg-white/90 backdrop-blur-md shadow-lg"
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-xl font-bold transition-colors text-stone-800 hover:text-amber-600 font-serif"
          >
            Florie Deramchi
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/portfolio"
              className="transition-colors font-medium text-stone-600 hover:text-amber-600"
            >
              Portfolio
            </Link>
            <Link
              to="/about"
              className="transition-colors font-medium text-stone-600 hover:text-amber-600"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="transition-colors font-medium text-stone-600 hover:text-amber-600"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
