
import React, { useState } from "react";
import api from '../api';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await api.post(`/api/auth/login`, { ...formData });
            localStorage.setItem("token", res.data.token);
            navigate("/admin-dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
            <div className="w-full max-w-md rounded-2xl bg-gray-900/80 p-8 shadow-2xl backdrop-blur-sm border border-gray-700">
                <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-tight">
                    Admin Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            autoComplete="username"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="••••••••"
                        />
                    </div>
                    {error && (
                        <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
                <div className="mt-8 text-xs text-gray-500 text-center">
                    Only authorized admin can access. Contact the site owner if you need access.
                </div>
            </div>
        </div>
    );
};

export default Login;