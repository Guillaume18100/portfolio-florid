import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">
          About the Artist
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Profile Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <div className="aspect-square bg-gradient-to-br from-amber-100 to-stone-100 rounded-2xl shadow-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-amber-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9H21ZM19 21H5V3H13V9H19V21Z"/>
                </svg>
              </div>
              <p className="text-stone-600 italic">Profile photo coming soon</p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="order-1 lg:order-2 space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-stone-800 mb-4">
              Artistic Journey
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              A passionate art school student, I constantly explore new creative territories 
              through different mediums and techniques. My work focuses on the search for 
              authentic personal expression, blending classical influences with contemporary vision.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-stone-800 mb-3">
              Areas of Expertise
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Graphic Design',
                'Illustration',
                'Concept Art',
                'Digital Art',
                'Composition',
                'Typography'
              ].map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-white rounded-lg shadow-sm"
                >
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  <span className="text-stone-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-stone-800 mb-3">
              Creative Philosophy
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Each creation is for me an opportunity for exploration and learning. 
              I believe in the importance of continuous experimentation and in the power of 
              art to convey emotions and tell unique stories.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-amber-50 to-stone-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-stone-800 mb-4">
            Want to Collaborate?
          </h3>
          <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
            I am always open to new creative opportunities and collaborations. 
            Feel free to contact me to discuss your projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition-colors font-medium">
              Contact Me
            </button>
            <button className="px-8 py-3 border-2 border-amber-500 text-amber-600 rounded-full hover:bg-amber-50 transition-colors font-medium">
              View Resume
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
