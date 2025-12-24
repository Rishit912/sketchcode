import React, { useState, useEffect } from "react";
import api from '../api';
import { FaEdit, FaGithub, FaLinkedin, FaPlus, FaTrash, FaTwitter } from "react-icons/fa";
import TeamMemberForm from "./TeamMemberForm";

// Using shared `api` instance from ../api.js — no inline base URL required

const TeamManagement = ({ embedded = false }) => {
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [isReordering, setIsReordering] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // Function to get the current token for API calls
    const getToken = () => localStorage.getItem("token");

    const fetchTeamMembers = async () => {
        setLoading(true);
        const token = getToken();
        // FIX: Pass the token in the headers for all admin reads/writes
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        
        try {
        // Use shared `api` instance for fetching team members
                const res = await api.get(`/api/team`, config);
            // Sort so oldest members appear first (createdAt ascending)
            const list = res.data || [];
            list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            setTeamMembers(list);
            try {
                localStorage.setItem('teamMembersCache', JSON.stringify(list));
                localStorage.setItem('team-updated', Date.now().toString());
            } catch (e) {}
        } catch (error) {
            console.error("Error fetching team members:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Instantly render from cache if available
        try {
            const cached = localStorage.getItem('teamMembersCache');
            if (cached) {
                const list = JSON.parse(cached);
                if (Array.isArray(list) && list.length > 0) {
                    setTeamMembers(list);
                }
            }
        } catch (e) {}

        fetchTeamMembers();

        const onStorage = (e) => {
            if (e.key === 'team-updated') {
                console.log('Detected team-updated storage event, refetching team members');
                fetchTeamMembers();
            }
        };
        window.addEventListener('storage', onStorage);

        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const handleAddNew = () => {
        setEditingMember(null);
        setShowModal(true);
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        const token = getToken();
        if (!window.confirm("Delete this team member?")) return;

        try {
            // Use shared api instance
            await api.delete(`/api/team/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchTeamMembers();
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to delete team member");
        }
    };

    // Reorder helpers (up/down)
    const persistOrder = async (list) => {
        const token = getToken();
        if (!token) {
            console.error("Missing token for reorder action.");
            alert('Session expired. Please login again.');
            window.location.href = '/login';
            return;
        }

        try {
            setIsReordering(true);
            // Support both `_id` and `id` in case items use different id shapes
            const orderedIds = list.map(m => m._id || m.id);
            console.log('Persisting team order, orderedIds:', orderedIds);
            
            const res = await api.patch(`/api/team/reorder`, { orderedIds }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // If server returns updated list, use it to update UI immediately
            if (res && res.data) {
                setTeamMembers(res.data);
                try {
                    localStorage.setItem('teamMembersCache', JSON.stringify(res.data));
                    localStorage.setItem('team-updated', Date.now().toString());
                } catch (e) {}
            } else {
                // fallback to refetching
                fetchTeamMembers();
            }
        } catch (err) {
            console.error('Failed to persist order', err);
            
            if (err.response?.status === 403) {
                alert('Access denied. You do not have admin privileges or your session has expired. Please login again.');
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else if (err.response?.status === 401) {
                alert('Session expired. Please login again.');
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                alert('Failed to save new team order: ' + (err.response?.data?.message || err.message || 'Unknown error'));
            }
            
            // fallback: refresh local state
            fetchTeamMembers();
        } finally {
            setIsReordering(false);
        }
    }

    const moveUp = (index) => {
        if (index <= 0) return;
        const list = [...teamMembers];
        const tmp = list[index - 1];
        list[index - 1] = list[index];
        list[index] = tmp;
        persistOrder(list);
    }

    const moveDown = (index) => {
        if (index >= teamMembers.length - 1) return;
        const list = [...teamMembers];
        const tmp = list[index + 1];
        list[index + 1] = list[index];
        list[index] = tmp;
        persistOrder(list);
    }

    const mainContent = (
        <main className="flex-1 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Team Members</h1>
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        <FaPlus size={18} /> Add Team Member
                    </button>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {loading && teamMembers.length === 0 && (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-gray-800 rounded-2xl shadow-xl border border-gray-700 overflow-hidden animate-pulse max-w-xs mx-auto w-full">
                                <div className="p-6">
                                    <div className="h-6 w-32 bg-gray-700 rounded mb-2" />
                                    <div className="h-4 w-24 bg-gray-700 rounded mb-4" />
                                    <div className="h-20 w-full bg-gray-700 rounded" />
                                </div>
                            </div>
                        ))
                    )}
                    {teamMembers.map((member, index) => (
                        <div
                            key={member._id}
                            className="bg-gray-800 rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-[1.02] border border-gray-700 overflow-hidden max-w-xs mx-auto w-full">
                            <div className="flex items-center justify-center p-4 border-b border-gray-600">
                                <div className="w-32 h-40 flex items-center justify-center">
                                    {member.imageUrl ? (
                                        <img
                                            src={member.imageUrl}
                                            alt={member.name}
                                            className="team-avatar"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-purple-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                            {(() => {
                                                const name = (member.name || "").trim();
                                                if (!name) return '';
                                                const parts = name.split(/\s+/);
                                                if (parts.length === 1) {
                                                    // take first two characters of single name
                                                    return parts[0].substring(0, 2).toUpperCase();
                                                }
                                                const first = parts[0] ? parts[0][0] : '';
                                                const second = parts[parts.length - 1] ? parts[parts.length - 1][0] : '';
                                                return (first + second).toUpperCase();
                                            })()}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-100 mb-2">{member.name}</h3>
                                        <p className="text-blue-400">{member.position}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => moveUp(index)}
                                            className={`bg-gray-600 text-white px-2 py-1 rounded hover:brightness-90 ${isReordering ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            title="Move up"
                                            disabled={isReordering}
                                        >
                                            ↑
                                        </button>
                                        <button
                                            onClick={() => moveDown(index)}
                                            className={`bg-gray-600 text-white px-2 py-1 rounded hover:brightness-90 ${isReordering ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            title="Move down"
                                            disabled={isReordering}
                                        >
                                            ↓
                                        </button>
                                        <button
                                            onClick={() => handleEdit(member)}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:brightness-90"
                                        >
                                            <FaEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(member._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:brightness-90"
                                        >
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{member.bio}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {(member.skills || []).map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4 text-gray-400">
                                    {member.socialLinks?.linkedin && (
                                        <a
                                            href={member.socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-400 transition"
                                        >
                                            <FaLinkedin size={24} />
                                        </a>
                                    )}
                                    {member.socialLinks?.github && (
                                        <a
                                            href={member.socialLinks.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-gray-300 transition"
                                        >
                                            <FaGithub size={24} />
                                        </a>
                                    )}
                                    {member.socialLinks?.twitter && (
                                        <a
                                            href={member.socialLinks.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-400 transition"
                                        >
                                            <FaTwitter size={24} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Fallback Message */}
                    {!loading && teamMembers.length === 0 && (
                        <div className="md:col-span-2 lg:col-span-4 text-center p-12 bg-gray-800 rounded-2xl border border-gray-700">
                            <p className="text-gray-400 text-xl font-medium">
                                No team members added yet. Click "Add Team Member" to get started!
                            </p>
                        </div>
                    )}
                </div>
            </main>
    );

    if (embedded) {
        return (
            <>
                {mainContent}
                {showModal && (
                    <TeamMemberForm
                        setShowModal={setShowModal}
                        fetchTeamMembers={fetchTeamMembers}
                        member={editingMember}
                    />
                )}
            </>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-100 text-gray-800">
            {mainContent}

            {/* Add/Edit Modal */}
            {showModal && (
                <TeamMemberForm
                    setShowModal={setShowModal}
                    fetchTeamMembers={fetchTeamMembers}
                    member={editingMember}
                />
            )}
        </div>
    );
};

export default TeamManagement;
