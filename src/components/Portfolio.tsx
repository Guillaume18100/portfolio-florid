import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import projectsData from '../data/projects.json';

const Portfolio: React.FC = () => {
  const [projects] = useState<Project[]>(projectsData);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<Project | null>(null);

  // Helper function to get correct image path for GitHub Pages
  const getImagePath = (imagePath: string) => {
    // Si on est en développement local, garder le chemin tel quel
    if (import.meta.env.DEV) {
      return imagePath;
    }
    // En production, ajouter le base URL si nécessaire
    if (imagePath.startsWith('/')) {
      return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${imagePath}`;
    }
    return imagePath;
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Group projects by category
  const projectsByCategory = projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  const categories = Object.keys(projectsByCategory);

  // Get featured image for each category
  const getCategoryFeaturedImage = (category: string) => {
    // Special case for Character Design - use marie.JPG as background
    if (category === "Character Design") {
      return getImagePath("/img/marie.JPG");
    }
    
    const categoryProjects = projectsByCategory[category];
    const featuredProject = categoryProjects.find(p => p.featured) || categoryProjects[0];
    
    // Debug pour Illustrations
    if (category === "Illustrations") {
      console.log("Debug Illustrations:");
      console.log("categoryProjects:", categoryProjects);
      console.log("featuredProject:", featuredProject);
      console.log("final image path:", featuredProject?.image ? getImagePath(featuredProject.image) : '');
    }
    
    return featuredProject?.image ? getImagePath(featuredProject.image) : '';
  };

  // Get category description
  const getCategoryDescription = (category: string) => {
    const descriptions: Record<string, string> = {
      "Demain dès l'aube": "Film project exploring visual storytelling through typography and graphic design",
      "Illustrations": "Digital artworks and contemporary interpretations of classical themes",
      "Character Design": "Creative exploration of characters, creatures and fantastical beings"
    };
    return descriptions[category] || "Collection of artistic works";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  // Animation Video Component with Intersection Observer
  const AnimationVideo: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
              // Video entièrement visible (80% ou plus)
              video.play();
            } else {
              // Video pas assez visible
              video.pause();
              video.currentTime = 0;
            }
          });
        },
        { threshold: [0.8] } // Déclenche quand 80% de la vidéo est visible
      );

      observer.observe(video);
      
      return () => observer.disconnect();
    }, []);

    return (
      <motion.div
        variants={itemVariants}
        className="group relative cursor-pointer"
        onClick={onClick}
      >
        <video
          ref={videoRef}
          src={getImagePath(project.image)}
          className="w-full h-auto object-contain"
          loop
          muted
          playsInline
        />
      </motion.div>
    );
  };

  // Lightbox Modal Component
  const Lightbox = ({ project, onClose }: { project: Project; onClose: () => void }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-7xl max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close lightbox"
            className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image or Video */}
          {project.image.endsWith('.mp4') || project.image.endsWith('.mov') || project.image.endsWith('.MP4') ? (
            <video
              src={getImagePath(project.image)}
              className="max-w-full max-h-[90vh] object-contain"
              controls
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={(e) => {
                // Ensure video can play
                e.currentTarget.play().catch(() => {
                  // If autoplay fails, that's ok
                });
              }}
            />
          ) : (
            <img
              src={getImagePath(project.image)}
              alt={project.title}
              className="max-w-full max-h-[90vh] object-contain"
            />
          )}

          {/* Image Info - Hidden for Run Cycle video and all animations */}
          {project.title !== "Run Cycle" && !project.title.startsWith("Animation -") && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 font-serif">{project.title}</h3>
              {project.description && (
                <p className="text-lg opacity-90 font-light">{project.description}</p>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // If a category is selected, show detailed view
  if (selectedCategory) {
    const categoryProjects = projectsByCategory[selectedCategory];
    
    return (
      <div className="min-h-screen bg-stone-50 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedCategory(null)}
            className="mb-8 flex items-center space-x-2 text-stone-600 hover:text-amber-600 transition-colors font-light"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Collections</span>
          </motion.button>

          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-stone-800 mb-6 font-serif">
              {selectedCategory}
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light">
              {getCategoryDescription(selectedCategory)}
            </p>
          </motion.div>

          {/* Special layout for Demain dès l'aube */}
          {selectedCategory === "Demain dès l'aube" ? (
            <div className="space-y-16">
              {/* First section - Main works */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-start"
              >
                {categoryProjects.slice(0, 3).map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedImage(project)}
                  >
                    {/* Main Image/Video */}
                    {project.image.endsWith('.mp4') || project.image.endsWith('.mov') ? (
                      <video
                        src={getImagePath(project.image)}
                        className="w-full h-auto"
                        loop
                        muted
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      />
                    ) : (
                      <img
                        src={getImagePath(project.image)}
                        alt={project.title}
                        className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    
                    {/* Hover Overlay for Click Indication */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Character Design Research Section */}
              {categoryProjects.slice(3, 6).length > 0 && (
                <div>
                  <h3 className="text-3xl font-bold text-center mb-12 font-serif">Character Design Research</h3>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-3 gap-6 max-w-6xl mx-auto"
                  >
                    {/* Left column (2/3 width) - Jesus Study and Research stacked */}
                    <div className="col-span-2 space-y-6">
                      {/* Jesus Study */}
                      <motion.div
                        variants={itemVariants}
                        className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer"
                        onClick={() => setSelectedImage(categoryProjects.slice(3, 6)[0])}
                      >
                        <img
                          src={getImagePath(categoryProjects.slice(3, 6)[0]?.image || '')}
                          alt={categoryProjects.slice(3, 6)[0]?.title}
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>

                      {/* Research */}
                      <motion.div
                        variants={itemVariants}
                        className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer"
                        onClick={() => setSelectedImage(categoryProjects.slice(3, 6)[2])}
                      >
                        <img
                          src={getImagePath(categoryProjects.slice(3, 6)[2]?.image || '')}
                          alt={categoryProjects.slice(3, 6)[2]?.title}
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right column (1/3 width) - Final Research centered vertically */}
                    <div className="col-span-1 flex items-center">
                      <motion.div
                        variants={itemVariants}
                        className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer w-full"
                        onClick={() => setSelectedImage(categoryProjects.slice(3, 6)[1])}
                      >
                        <img
                          src={getImagePath(categoryProjects.slice(3, 6)[1]?.image || '')}
                          alt={categoryProjects.slice(3, 6)[1]?.title}
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Character Turns Section */}
              <div>
                <h3 className="text-3xl font-bold text-center mb-12 font-serif">Character Turns</h3>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-3 gap-4 max-w-6xl mx-auto"
                >
                  {/* Left column (2/3 width) - JPEG Turns stacked */}
                  <div className="col-span-2 space-y-4">
                    {/* Jesus Turn JPEG */}
                    <motion.div
                      variants={itemVariants}
                      className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer h-64"
                      onClick={() => {
                        const project = projects.find(p => p.title === "Jesus Turn");
                        if (project) setSelectedImage(project);
                      }}
                    >
                      <img
                        src={getImagePath("/img/turn jesus.jpeg")}
                        alt="Jesus Turn"
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    {/* Titouan Turn JPEG */}
                    <motion.div
                      variants={itemVariants}
                      className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer h-64"
                      onClick={() => {
                        const project = projects.find(p => p.title === "Titouan Turn");
                        if (project) setSelectedImage(project);
                      }}
                    >
                      <img
                        src={getImagePath("/img/turn titouan.jpeg")}
                        alt="Titouan Turn"
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right column (1/3 width) - GIF Animations stacked and centered */}
                  <div className="col-span-1 flex items-center">
                    <div className="w-full space-y-4">
                      {/* Jesus Turn GIF */}
                      <motion.div
                        variants={itemVariants}
                        className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer h-64"
                        onClick={() => {
                          const project = projects.find(p => p.title === "Jesus Turn Animation");
                          if (project) setSelectedImage(project);
                        }}
                      >
                        <img
                          src={getImagePath("/img/Jesus_Turn_Ailes.gif")}
                          alt="Jesus Turn Animation"
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>

                      {/* Titouan Turn GIF */}
                      <motion.div
                        variants={itemVariants}
                        className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer h-64"
                        onClick={() => {
                          const project = projects.find(p => p.title === "Titouan Animation");
                          if (project) setSelectedImage(project);
                        }}
                      >
                        <img
                          src={getImagePath("/img/Titouan_Turn 2.gif")}
                          alt="Titouan Animation"
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Background Section */}
              <div>
                <h3 className="text-3xl font-bold text-center mb-12 font-serif">Background</h3>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6 max-w-6xl mx-auto"
                >
                  {/* Black & White Fresco */}
                  <motion.div
                    variants={itemVariants}
                    className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer"
                    onClick={() => {
                      const project = projects.find(p => p.title === "Background Fresco - Black & White");
                      if (project) setSelectedImage(project);
                    }}
                  >
                    <img
                      src={getImagePath("/img/Fresque-noir-blanc.PNG")}
                      alt="Background Fresco - Black & White"
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>

                  {/* Color Fresco */}
                  <motion.div
                    variants={itemVariants}
                    className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer"
                    onClick={() => {
                      const project = projects.find(p => p.title === "Background Fresco - Color");
                      if (project) setSelectedImage(project);
                    }}
                  >
                    <img
                      src={getImagePath("/img/fresque.PNG")}
                      alt="Background Fresco - Color"
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Run Cycle Video Section with Scroll Effect - Removed since it's now in Animations section */}

              {/* Doctor's Drawers */}
              <div className="space-y-6 max-w-6xl mx-auto mb-16">
                <motion.div
                  variants={itemVariants}
                  className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer"
                  onClick={() => {
                    const project = projects.find(p => p.title === "Doctor's Drawers");
                    if (project) setSelectedImage(project);
                  }}
                >
                  <img
                    src={getImagePath("/img/tiroir.PNG")}
                    alt="Doctor's Drawers"
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Props Section - At the bottom */}
              <div className="space-y-6 max-w-7xl mx-auto mb-16">
                <h3 className="text-3xl font-bold text-center mb-12 font-serif">Props</h3>
                <div className="bg-black p-12 rounded-xl">
                  <motion.div
                    variants={containerVariants}
                    className="flex items-center justify-center gap-12"
                  >
                    {/* Colonne gauche - 2 items empilés */}
                    <div className="flex flex-col gap-8 flex-1 max-w-md">
                      {categoryProjects
                        .filter(project => project.title.startsWith("Props -") && project.title !== "Props - Armoire")
                        .slice(0, 2) // Prendre les 2 premiers (sans l'armoire)
                        .map((project, index) => (
                          <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className="cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => setSelectedImage(project)}
                          >
                            <img
                              src={getImagePath(project.image)}
                              alt={project.title}
                              className="w-full h-auto object-contain max-h-60"
                            />
                          </motion.div>
                        ))
                      }
                    </div>

                    {/* Centre - Armoire */}
                    <div className="flex-1 max-w-sm">
                      {categoryProjects
                        .filter(project => project.title === "Props - Armoire")
                        .map((project) => (
                          <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className="cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => setSelectedImage(project)}
                          >
                            <img
                              src={getImagePath(project.image)}
                              alt={project.title}
                              className="w-full h-auto object-contain max-h-80"
                            />
                          </motion.div>
                        ))
                      }
                    </div>

                    {/* Colonne droite - 2 items empilés */}
                    <div className="flex flex-col gap-8 flex-1 max-w-md">
                      {categoryProjects
                        .filter(project => project.title.startsWith("Props -") && project.title !== "Props - Armoire")
                        .slice(2, 4) // Prendre les 2 derniers (sans l'armoire)
                        .map((project, index) => (
                          <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className="cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => setSelectedImage(project)}
                          >
                            <img
                              src={getImagePath(project.image)}
                              alt={project.title}
                              className="w-full h-auto object-contain max-h-60"
                            />
                          </motion.div>
                        ))
                      }
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Animations Section - At the very bottom */}
              <div className="space-y-12 max-w-6xl mx-auto mb-16">
                <h3 className="text-3xl font-bold text-center mb-12 font-serif">Animations</h3>
                <div className="space-y-12">
                  {categoryProjects
                    .filter(project => 
                      project.title.startsWith("Animation -")
                    )
                    .map((project, index) => (
                      <AnimationVideo 
                        key={project.id} 
                        project={project} 
                        onClick={() => setSelectedImage(project)}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          ) : selectedCategory === "Illustrations" ? (
            /* Special layout for Illustrations - large stacked format */
            <div className="space-y-16 max-w-5xl mx-auto px-4">
              {categoryProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(project)}
                >
                  <div className="relative transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl">
                    <img
                      src={getImagePath(project.image)}
                      alt={project.title}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                      <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-semibold mb-2 font-serif">{project.title}</h3>
                        <p className="text-sm opacity-90 max-w-md mx-auto">{project.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : selectedCategory === "Character Design" ? (
            /* Special layout for Character Design - large stacked format */
            <div className="space-y-12 max-w-4xl mx-auto px-4">
              {categoryProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group relative overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(project)}
                >
                  <div className="relative transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl">
                    <img
                      src={getImagePath(project.image)}
                      alt={project.title}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-8">
                      <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-semibold mb-2 font-serif">{project.title}</h3>
                        <p className="text-sm opacity-90 max-w-md mx-auto">{project.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Regular layout for other categories */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid gap-8 items-start ${
                categoryProjects.length === 1 ? 'grid-cols-1 max-w-5xl mx-auto' :
                categoryProjects.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                categoryProjects.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {categoryProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedImage(project)}
                >
                  {/* Main Image/Video */}
                  {project.image.endsWith('.mp4') || project.image.endsWith('.mov') ? (
                    <video
                      src={getImagePath(project.image)}
                      className="w-full h-auto"
                      loop
                      muted
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                  ) : (
                    <img
                      src={getImagePath(project.image)}
                      alt={project.title}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  
                  {/* Hover Overlay for Click Indication */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <Lightbox 
            project={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </div>
    );
  }

  // Main portfolio view with category squares
  return (
    <div className="min-h-screen bg-stone-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-stone-800 mb-6 font-serif">
            MY PORTFOLIO
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-6"></div>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-light">
            Explore my artistic journey through different collections and creative expressions.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category}
              variants={categoryVariants}
              onClick={() => setSelectedCategory(category)}
              className="group relative aspect-square overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={getCategoryFeaturedImage(category)}
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-500"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 font-serif">
                    {category}
                  </h3>
                  <p className="text-base opacity-90 mb-4 font-light">
                    {getCategoryDescription(category)}
                  </p>
                  <div className="flex items-center text-amber-300 font-light">
                    <span className="mr-2">Explore Collection</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox 
          project={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
};

export default Portfolio;
