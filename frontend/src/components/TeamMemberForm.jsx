import React, { useState } from "react";
import axios from "axios";
import api from '../api';
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Using shared `api` instance from ../api.js — no inline base URL required

const TeamMemberForm = ({ setShowModal, fetchTeamMembers, member }) => {
    const [name, setName] = useState(member ? member.name : "");
    const [position, setPosition] = useState(member ? member.position : "");
    const [bio, setBio] = useState(member ? member.bio : "");
    const [skills, setSkills] = useState(member ? member.skills.join(", ") : "");
    const [image, setImage] = useState(null);
    const [linkedin, setLinkedin] = useState(member ? member.socialLinks?.linkedin : "");
    const [github, setGithub] = useState(member ? member.socialLinks?.github : "");
    const [twitter, setTwitter] = useState(member ? member.socialLinks?.twitter : "");
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const [error, setError] = useState("");

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

        setProgress(0);
        return response.data.secure_url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        setUploading(true);

        try {
            let imageUrl = member?.imageUrl;
            if (image) {
                imageUrl = await uploadToCloudinary(image);
            }

            const payload = {
                name,
                position,
                bio,
                imageUrl,
                socialLinks: {
                    linkedin,
                    github,
                    twitter
                },
                skills: skills.split(",").map(s => s.trim()).filter(Boolean)
            };

            if (member && member._id) {
                // Edit existing member
                await api.put(`/api/team/${member._id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("✅ Team member updated successfully!");
            } else {
                // Add new member
                await api.post(`/api/team/add`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("✅ Team member added successfully!");
            }

            if (!member) {
                // Reset form only for new members
                setName("");
                setPosition("");
                setBio("");
                setSkills("");
                setImage(null);
                setLinkedin("");
                setGithub("");
                setTwitter("");

                // notify other tabs/pages that team changed (like projects)
                try {
                    localStorage.setItem('team-updated', Date.now().toString());
                } catch (e) {}

                // redirect to public team page and show a confirmation if available
                try {
                    navigate('/team?added=1', { replace: true });
                    return;
                } catch (e) {
                    // fallback to hard redirect
                    try { window.location.href = '/team?added=1'; } catch (_) {}
                }
            }

        } catch (error) {
            console.error(error);
            console.log("Error managing team member");
            setError(error.response?.data?.message || error.message || "Failed to save team member");
        } finally {
            setUploading(false);
            setShowModal(false);
            fetchTeamMembers();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl relative max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between mb-4 border-b p-3">
                    <h2 className="text-xl font-bold">
                        {member ? "Edit Team Member" : "Add New Team Member"}
                    </h2>
                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="bg-gray-200 p-1.5 rounded-full"
                    >
                        <IoClose size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4 p-4">
                    <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    {error && (
                        <div className="col-span-12 p-3 bg-red-50 text-red-600 rounded mt-2">
                            {error}
                        </div>
                    )}

                    <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Position
                        </label>
                        <input
                            type="text"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    </div>

                    <div className="col-span-12">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Bio
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            rows={3}
                            required
                        />
                    </div>

                    <div className="col-span-12">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Skills (comma-separated)
                        </label>
                        <input
                            type="text"
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="React, Node.js, UI/UX Design..."
                        />
                    </div>

                    <div className="col-span-12">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="col-span-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            LinkedIn URL
                        </label>
                        <input
                            type="url"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="col-span-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            GitHub URL
                        </label>
                        <input
                            type="url"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="col-span-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Twitter URL
                        </label>
                        <input
                            type="url"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {uploading && (
                        <p className="col-span-12 text-blue-600 text-center">
                            Uploading... {progress}%
                        </p>
                    )}

                    <div className="col-span-12 flex justify-end border-t -mx-4 px-4 py-2">
                        <button
                            type="submit"
                            className="px-8 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            {member ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamMemberForm;