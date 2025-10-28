import React, { useState } from "react";
import api from '../api';
import { useNavigate } from "react-router-dom";

// Using shared `api` instance from ../api.js — no inline base URL required

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [registerStatus, setRegisterStatus] = useState(null); // 'success', 'error', 'idle'
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            console.log("Attempting login with:", formData.email);
            const res = await api.post(`/api/auth/login`, { ...formData });
            localStorage.setItem("token", res.data.token);
            console.log("Login successful! Token stored.");
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            setError(error.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };
    
    // --- TEMPORARY REGISTRATION FUNCTION (REQUIRED FOR FIRST LOGIN) ---
    const handleRegister = async () => {
        setRegisterStatus(null);
        setError("");
        
        if (!formData.email || !formData.password) {
            setError("Please fill in both email and password to register.");
            return;
        }

        try {
            // This calls the /api/auth/register route we are creating in the backend
            await api.post(`/api/auth/register`, { ...formData });
            setRegisterStatus('success');
            console.log("✅ Registration successful. You can now log in.");
        } catch (registerError) {
            console.error("Registration error:", registerError.response?.data || registerError.message);
            setRegisterStatus('error');
            setError(registerError.response?.data?.message || "Registration failed. User might already exist.");
        }
    };
    // ----------------------------------------

    return (
        <div className="flex py-20 items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
            <div className="w-full max-w-md rounded-2xl bg-gray-900/70 p-8 shadow-2xl backdrop-blur-sm border border-gray-700">
                <h2 className="text-3xl font-bold text-center text-white mb-8">
                    Welcome Back 👋
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
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
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="you@example.com"
                        />
                    </div>

                    {/* Password Field */}
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
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Feedback Messages */}
                    {error && (
                        <div className="p-3 text-sm bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                            {error}
                        </div>
                    )}
                    
                    {registerStatus === 'success' && (
                        <div className="p-3 text-sm bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                            Registration successful! Please click Login now.
                        </div>
                    )}
                    
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/30"
                    >
                        Login
                    </button>
                    
                    {/* TEMPORARY BUTTON TO REGISTER FIRST USER */}
                    <button
                        type="button"
                        onClick={handleRegister}
                        className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition duration-300 shadow-lg mt-2"
                    >
                        Register First Admin User (Use Once!)
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;