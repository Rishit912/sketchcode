import React, { useState } from "react";
import axios from "axios";
import api, { BASE_URL } from '../api';
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// (Using shared `api` instance from ../api.js — no inline base URL required)

const UploadProjectForm = ({ setShowModal, fetchProjects, project }) => {
    // If `project` is provided, this form acts as Edit; otherwise Add
    const [title, setTitle] = useState(project ? project.title : "");
    const [description, setDescription] = useState(project ? project.description : "");
    const [techStack, setTechStack] = useState(project ? project.techStack?.toString() : "");
    const [category, setCategory] = useState(project ? project.category : "webDevelopment");
    const [github, setGithub] = useState(project ? project.github : "");
    const [liveDemo, setLiveDemo] = useState(project ? project.liveDemo : "");
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);


    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const uploadToCloudinary = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "unsigned_preset"); // your preset name

        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dcxoytx6t/image/upload",
            formData,
            {
                onUploadProgress: (p) =>
                    setProgress(Math.round((p.loaded * 100) / p.total)),
            }
        );

        setProgress(0)
        return response.data.secure_url; // this is the public image URL
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        setUploading(true);
        
        // Configuration for authenticated requests
        // FIX: Ensure the Authorization token is included for POST/PUT
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            // Upload new images (if any) and build final imageUrls array
            const uploadedUrls = project?.imageUrls ? [...project.imageUrls] : [];

            if (images && images.length > 0) {
                // If new images were selected, replace previous images with new uploaded ones
                const newUrls = [];
                for (const img of images) {
                    const url = await uploadToCloudinary(img);
                    newUrls.push(url);
                }
                // replace
                uploadedUrls.splice(0, uploadedUrls.length, ...newUrls);
            }

            const payload = {
                title,
                description,
                techStack: techStack.split(",").map(s => s.trim()).filter(Boolean),
                imageUrls: uploadedUrls,
                category,
                github,
                liveDemo
            };

            if (project && project._id) {
                // Edit
                await api.put(`/api/projects/${project._id}`, payload, config);
                console.log("✅ Project updated successfully!");
            } else {
                // Add new
                await api.post(`/api/projects/add`, payload, config);
                console.log("✅ Project uploaded successfully!");
            }

            // reset only when adding; when editing we can close modal
            if (!project) {
                setTitle("");
                setDescription("");
                setTechStack("");
                setImages([]);
                setGithub("");
                setLiveDemo("");
                setProgress(0);
            }
        } catch (error) {
            console.error(error);
            console.log("Error uploading project");
        } finally {
            setUploading(false);
            // notify other tabs/pages that projects changed
            try {
                localStorage.setItem('projects-updated', Date.now().toString());
            } catch (e) {}

            // refresh list in admin and close
            fetchProjects(); // This fetches the list for the Admin Dashboard

            // if we just added a new project (not editing), redirect admin to the public portfolio and show confirmation
            if (!project) {
                // navigate to public portfolio and show a confirmation
                try {
                    navigate('/portfolio?added=1', { replace: true });
                    return;
                } catch (e) {
                    // fallback
                    window.location.href = '/portfolio?added=1';
                    return;
                }
            }

            setShowModal(false);
        }
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl relative max-h-[90vh] overflow-auto scrollbar-thin">
                <div className="flex items-center justify-between mb-4 border-b p-3">
                    <h2 className="text-xl font-bold">{project ? 'Edit Project' : 'Add New Project'}</h2>
                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="bg-gray-200 p-1.5 rounded-full"
                    >
                        <IoClose size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4 px-4">
                    <div className="grid col-span-6">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Project Name
                        </label>
                        <input
                            type="text"
                            placeholder="Project Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Tech Stack
                        </label>
                        <input
                            type="text"
                            value={techStack}
                            onChange={(e) => setTechStack(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="React, Node.js, MongoDB..."
                        />
                    </div>

                    <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                        <select value={category} onChange={e => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="webDevelopment">Web Development</option>
                            <option value="appDevelopment">App Development</option>
                            <option value="webDesign">Web Design</option>
                        </select>
                    </div>

                    <div className="col-span-12">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Description
                        </label>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            rows={3}
                        />
                    </div>


                    <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            GitHub Link
                        </label>
                        <input
                            type="text"
                            placeholder="GitHub Link"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Live Demo Link
                        </label>
                        <input
                            type="text"
                            placeholder="Live Demo Link"
                            value={liveDemo}
                            onChange={(e) => setLiveDemo(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="col-span-12">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Project Images
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {uploading && (
                        <p className="col-span-12 text-blue-600 text-center mb-3">
                            Uploading... {progress}%
                        </p>
                    )}

                    <div className="col-span-12 flex justify-end border-t -mx-4 px-4 py-2">
                        <button
                            type="submit"
                            className="px-8 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UploadProjectForm;