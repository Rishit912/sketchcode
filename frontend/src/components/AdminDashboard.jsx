import api from '../api';
import React, { useEffect, useState } from "react";
import { FaEdit, FaExternalLinkAlt, FaPlus, FaTrash } from "react-icons/fa";
import UploadProjectForm from "./UploadProjectForm";
import { Link, useLocation } from 'react-router-dom';
import TeamManagement from './TeamManagement';

// Using shared `api` instance from ../api.js — no inline base URL required

const AdminDashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [projects, setProjects] = useState([]);
    
    // Function to get the current token for API calls
    const getToken = () => localStorage.getItem("token");

    const handleOpenModal = () => {
        setEditingProject(null);
        setShowModal(true);
    };

    const fetchProjects = async () => {
        const token = getToken();
        // The token is mandatory for admin views
        // FIX: Include the Authorization header here
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        
        try {
            const res = await api.get(`/api/projects`, config);
            setProjects(res.data);
        } catch(error) {
             console.error("Error fetching projects for admin:", error);
             setProjects([]);
        }
    };

    const persistProjectOrder = async (list) => {
        const token = getToken();
        if (!token) return console.error("Missing token for reorder action.");

        try {
            const orderedIds = list.map(p => p._id || p.id);
            // Use shared `api` instance for persisting project order
            await api.patch(`/api/projects/reorder`, { orderedIds }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Re-fetch to confirm order from server
            fetchProjects(); 
        } catch (err) {
            console.error('Failed to persist project order', err);
            // If API fails, reset local state to what it was
            fetchProjects();
        }
    }

    const moveProjectUp = (index) => {
        if (index <= 0) return;
        const list = [...projects];
        const tmp = list[index - 1];
        list[index - 1] = list[index];
        list[index] = tmp;
        persistProjectOrder(list);
    }

    const moveProjectDown = (index) => {
        if (index >= projects.length - 1) return;
        const list = [...projects];
        const tmp = list[index + 1];
        list[index + 1] = list[index];
        list[index] = tmp;
        persistProjectOrder(list);
    }

    useEffect(() => {
        // Fetch projects on component mount (admin authenticated view)
        fetchProjects(); 
    }, []);

    const handleDelete = async (id) => {
        const token = getToken();
        if (!window.confirm("Delete this project?")) return;

        try {
            // Use shared `api` instance for deleting a project
            await api.delete(`/api/projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchProjects();
            try {
                localStorage.setItem('projects-updated', Date.now().toString());
            } catch (e) {}
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to delete project");
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setShowModal(true);
    }

    const location = useLocation();
    const view = location.pathname.includes('/admin/team') ? 'team' : 'projects';

    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-6">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                <nav>
                    <Link to="/admin-dashboard" className={`block py-2 px-4 rounded hover:bg-gray-700 mb-2 ${view==='projects'?'bg-gray-700':''}`}>Projects</Link>
                    <Link to="/admin/team" className={`block py-2 px-4 rounded hover:bg-gray-700 ${view==='team'?'bg-gray-700':''}`}>Team Members</Link>
                </nav>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {view === 'team' ? (
                    // Render Team management within the admin layout (embedded)
                    <TeamManagement embedded={true} />
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold">Projects</h1>
                            <button
                                onClick={handleOpenModal}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                <FaPlus size={18} /> Add Project
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {projects.map((project, index) => (
                                <div
                                    key={project._id || project.id}
                                    className="bg-gray-800 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-[1.02] border border-gray-700 overflow-hidden"
                                >
                                    <div className="w-full h-56 flex overflow-x-auto">
                                        {project?.imageUrls?.length > 0 ? (
                                            project.imageUrls.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={img}
                                                    alt={`${project.title || 'Project'} screenshot ${index + 1}`}
                                                    className="h-full w-full object-cover flex-shrink-0"
                                                />
                                            ))
                                        ) : (
                                            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                                                No images available
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-100 mb-2">
                                            {project?.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4">
                                            {project?.description}
                                        </p>
                                        <p className="text-gray-300 text-sm mb-4">
                                            {project?.techStack?.toString()}
                                        </p>
                                        <div className="flex items-center gap-3 mt-3">
                                            <a
                                                href={project?.liveDemo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:underline"
                                            >
                                                View Project <FaExternalLinkAlt size={12} />
                                            </a>

                                            <div className="ml-auto flex gap-2">
                                                <button onClick={() => moveProjectUp(index)} className="bg-gray-600 text-white px-2 py-1 rounded hover:brightness-90" title="Move up">↑</button>
                                                <button onClick={() => moveProjectDown(index)} className="bg-gray-600 text-white px-2 py-1 rounded hover:brightness-90" title="Move down">↓</button>
                                                <button onClick={() => handleEdit(project)} className="bg-yellow-500 text-white px-3 py-1 rounded hover:brightness-90">
                                                    <FaEdit />
                                                </button>
                                                <button onClick={() => handleDelete(project._id || project.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:brightness-90">
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Fallback Message */}
                            {projects.length === 0 && (
                                <div className="md:col-span-2 lg:col-span-3 text-center p-12 bg-gray-800 rounded-2xl border border-gray-700">
                                    <p className="text-gray-400 text-xl font-medium">
                                        No projects found for this category yet. We are working on adding more projects soon!
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>

            {/* Add/Edit Project Modal */}
            {showModal && (
                <UploadProjectForm setShowModal={setShowModal} fetchProjects={fetchProjects} project={editingProject} />
            )}
        </div>
    );
};

export default AdminDashboard;
