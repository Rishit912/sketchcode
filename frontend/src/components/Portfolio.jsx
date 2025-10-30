import React, { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaCode, FaPaintBrush, FaMobileAlt, FaLaptopCode, FaGithub } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import AnimateOnScroll from './AnimateOnScroll'; // ADDED

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [showAddedMsg, setShowAddedMsg] = useState(false);

  // fetchProjects is used in multiple places (initial load, storage event, polling)
  const fetchProjects = async () => {
    try {
      console.log('📍 Fetching projects from backend...');
      const response = await api.get(`/api/projects`);
      
      console.log('📍 Full API Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data
      });

      if (!response.data || !Array.isArray(response.data)) {
        console.error('❌ Response is invalid or empty');
        setProjects([]);
        return;
      }

      console.log(`✅ Received ${response.data.length} projects:`);
      response.data.forEach((project, index) => {
        console.log(`Project ${index + 1}:`, {
          id: project._id,
          title: project.title,
          category: project.category || 'no category',
          techStack: project.techStack
        });
      });

      setProjects(response.data);
    } catch (error) {
      console.error('❌ Error fetching projects:', {
        message: error.message,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : 'No response',
        config: error.config ? {
          url: error.config.url,
          method: error.config.method
        } : 'No config'
      });
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    fetchProjects();

    // show confirmation if redirected after add
    try {
      const params = new URLSearchParams(location.search);
      if (params.get('added') === '1') {
        setShowAddedMsg(true);
        // remove query param without reloading
        navigate(location.pathname, { replace: true });
        // hide message after a short delay
        setTimeout(() => setShowAddedMsg(false), 4000);
      }
    } catch (e) {}

    // Listen for cross-tab updates (when admin adds/edits a project in another tab)
    const onStorage = (e) => {
      if (e.key === 'projects-updated') {
        console.log('Detected projects-updated storage event, refetching projects');
        fetchProjects();
      }
    };
    window.addEventListener('storage', onStorage);

    // Poll as a fallback in case storage events are not available (e.g., different clients)
    const interval = setInterval(fetchProjects, 15000); // every 15s

    return () => {
      window.removeEventListener('storage', onStorage);
      clearInterval(interval);
    };
  }, []);

  const filterProjects = (projects, filter) => {
    if (filter === 'all') return projects;
    // map filter value to category key used in backend/schema
    const categoryMap = {
      webDev: 'webDevelopment',
      appDev: 'appDevelopment',
      webDesign: 'webDesign'
    };

    return projects.filter(project => {
      // prefer explicit category if available
      const cat = project.category;
      if (cat && categoryMap[filter]) {
        return cat === categoryMap[filter];
      }

      // fallback to tech stack inference if category not set
      const technologies = project.techStack?.map(tech => tech.toLowerCase()) || [];
      switch (filter) {
        case 'webDev':
          return technologies.some(tech =>
            ['react', 'vue', 'angular', 'javascript', 'typescript', 'node', 'express'].includes(tech)
          );
        case 'appDev':
          return technologies.some(tech =>
            ['react native', 'flutter', 'android', 'ios', 'mobile'].includes(tech)
          );
        case 'webDesign':
          return technologies.some(tech =>
            ['figma', 'adobe xd', 'ui/ux', 'design', 'css'].includes(tech)
          );
        default:
          return true;
      }
    });
  };

  const filteredProjects = filterProjects(projects, filter);

  const filterButtons = [
    { label: 'All', value: 'all', icon: <FaCode /> },
    { label: 'Web Development', value: 'webDev', icon: <FaLaptopCode /> },
    { label: 'App Development', value: 'appDev', icon: <FaMobileAlt /> },
    { label: 'Web Design', value: 'webDesign', icon: <FaPaintBrush /> }
  ];

  const ProjectCard = ({ project }) => (
    // 💡 Project Card Animation: Slide Up with a short duration
    <AnimateOnScroll duration="duration-500" delay={200} direction="up"> 
      <div className="bg-gray-800 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-[1.02] border border-gray-700 overflow-hidden h-full">
        {project?.imageUrls?.length > 0 && (
          <div className="w-full h-56 flex overflow-x-auto">
            {project.imageUrls.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${project.title} screenshot ${index + 1}`}
                className="h-full w-full object-cover flex-shrink-0"
              />
            ))}
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-100 mb-2">{project.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack?.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:underline"
              >
                Live Demo <FaExternalLinkAlt size={12} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 font-semibold hover:underline"
              >
                GitHub <FaGithub size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );

  return (
    // Outer section wrapper - provides overall fade-in effect
    <AnimateOnScroll duration="duration-1000"> 
      <section className="relative z-10 bg-gray-900/95 text-gray-200 py-16 md:py-24 border-b-4 border-gray-700" id="portfolio"> 
        <div className="container mx-auto px-6 lg:px-12">
          
          {/* Header - Slide Down */}
          <AnimateOnScroll duration="duration-800" delay={100} direction="down">
            <div className="text-center mb-16 md:mb-24">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-50 font-serif">
                Our{" "}
                <span className="text-6xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Portfolio
                </span>
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
                A showcase of our featured projects, where we blend creativity with technical excellence to deliver outstanding results.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Filter Buttons - Staggered Slide Up */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filterButtons.map((button, index) => (
              <AnimateOnScroll key={button.value} duration="duration-600" delay={200 + index * 100} direction="up">
                <button
                  onClick={() => setFilter(button.value)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    filter === button.value
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  {button.icon}
                  {button.label}
                </button>
              </AnimateOnScroll>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
          ) : (
            <>
              {showAddedMsg && (
                <div className="mb-6 max-w-3xl mx-auto text-center">
                  <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg shadow">
                    Project added successfully — now visible in the portfolio!
                  </div>
                </div>
              )}

              {/* Project Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {/* Note: ProjectCard component now contains its own AnimateOnScroll wrapper. */}
                {filter === 'all' ? (
                  projects.length > 0 ? (
                    projects.map(project => (
                      <ProjectCard key={project._id} project={project} />
                    ))
                  ) : (
                    <div className="md:col-span-2 lg:col-span-3 text-center p-12 bg-gray-800 rounded-2xl border border-gray-700">
                      <p className="text-gray-400 text-xl font-medium">
                        No projects added yet. Check back soon or add a project from the admin dashboard.
                      </p>
                    </div>
                  )
                ) : (
                  filteredProjects.length > 0 ? (
                    filteredProjects.map(project => (
                      <ProjectCard key={project._id} project={project} />
                    ))
                  ) : (
                    <div className="md:col-span-2 lg:col-span-3 text-center p-12 bg-gray-800 rounded-2xl border border-gray-700">
                      <p className="text-gray-400 text-xl font-medium">
                        No projects found for this category yet. We are working on adding more projects soon!
                      </p>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </AnimateOnScroll> 
  );
};

export default Portfolio;