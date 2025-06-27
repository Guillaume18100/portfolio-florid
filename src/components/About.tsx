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
        <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6 font-serif">
          About the Artist
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto"></div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-stone-800 mb-6 text-center font-serif">
              My Artistic Journey
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed text-center max-w-2xl mx-auto font-light">
              French 2D illustrator and animator seeking her first opportunity in the entertainment/animation industry and open to all possibilities.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-stone-800 mb-4 text-center font-serif">
              Areas of Expertise
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {[
                '2D Animation',
                'Illustration',
                'Character Design',
                'Digital Art',
                'Concept Art',
                'Storyboarding'
              ].map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-white rounded-lg shadow-sm"
                >
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                  <span className="text-stone-700 font-light">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-stone-800 mb-4 text-center font-serif">
              Creative Philosophy
            </h3>
            <p className="text-stone-600 leading-relaxed text-center max-w-2xl mx-auto font-light">
              Each creation is for me an opportunity for exploration and learning. 
              I believe in the importance of continuous experimentation and in the power of 
              art to convey emotions and tell unique stories.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
