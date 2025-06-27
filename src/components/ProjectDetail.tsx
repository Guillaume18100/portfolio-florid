import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';
import projectsData from '../data/projects.json';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const foundProject = projectsData.find(p => p.id === parseInt(id || '0'));
    setProject(foundProject || null);
  }, [id]);

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-stone-600">Projet non trouvé</h2>
        <Link to="/" className="text-amber-600 hover:text-amber-700 mt-4 inline-block">
          Retour à la galerie
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-6xl mx-auto"
    >
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-8 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour à la galerie
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
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
            <div className="flex items-center justify-between mb-4">
              <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-light">
                {project.category}
              </span>
              <span className="text-stone-500 font-light">
                {project.year}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-stone-800 mb-4">
              {project.title}
            </h1>
          </div>

          <p className="text-lg text-stone-600 leading-relaxed">
            {project.description}
          </p>

          <div>
            <h3 className="text-xl font-serif text-stone-800 mb-4">
              Techniques utilisées
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.techniques.map((technique, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg font-light"
                >
                  {technique}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-amber-50 to-stone-50 p-6 rounded-xl">
            <h3 className="text-lg font-serif text-stone-800 mb-3">
              À propos de cette œuvre
            </h3>
            <p className="text-stone-600">
              Cette création fait partie d'une série d'explorations artistiques menées durant 
              mes études. Chaque œuvre représente une étape de mon évolution créative et 
              technique, explorant différents médiums et styles pour développer ma voix artistique unique.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Related Projects */}
      <div className="mt-20">
        <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">
          Autres créations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectsData
            .filter(p => p.id !== project.id)
            .slice(0, 3)
            .map((relatedProject) => (
              <Link
                key={relatedProject.id}
                to={`/project/${relatedProject.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProject.image}
                      alt={relatedProject.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-serif text-stone-800 group-hover:text-amber-600 transition-colors">
                      {relatedProject.title}
                    </h4>
                    <p className="text-sm text-stone-500 mt-1">
                      {relatedProject.category}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
