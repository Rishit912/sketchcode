import React, { useState, useEffect } from "react";
import api from '../api';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/admin-dashboard");
        }
    }, [navigate]);

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        // Validate before submitting
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/api/auth/login", formData);

            // Validate response
            if (!res.data.token) {
                throw new Error("No token received from server");
            }

            // Store token and user info
            localStorage.setItem("token", res.data.token);
            if (res.data.user) {
                localStorage.setItem("user", JSON.stringify(res.data.user));
            }

            setSuccessMessage("Login successful! Redirecting...");
            
            // Small delay to show success message
            setTimeout(() => {
                navigate("/admin-dashboard");
            }, 500);
        } catch (error) {
            console.error("Login error:", error);
            
            let errorMsg = "Login failed. Please check your credentials.";
            
            if (error.response?.data?.message) {
                errorMsg = error.response.data.message;
            } else if (error.message === "Network Error") {
                errorMsg = "Network error. Please check your connection and ensure the backend is running.";
            } else if (error.code === "ERR_NETWORK") {
                errorMsg = "Unable to connect to the server. Please try again later.";
            }
            
            setErrorMessage(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-8">
            <div className="w-full max-w-md rounded-2xl bg-gray-900/80 p-8 shadow-2xl backdrop-blur-sm border border-gray-700">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        Admin Login
                    </h2>
                    <p className="text-gray-400 text-sm mt-2">
                        Secure access to the dashboard
                    </p>
                </div>

                {successMessage && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-start gap-3">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-green-400 text-sm">{successMessage}</span>
                    </div>
                )}

                {errorMessage && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                        <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <span className="text-red-400 text-sm">{errorMessage}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
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
                            className={`w-full rounded-lg bg-gray-800 border ${
                                errors.email ? "border-red-500" : "border-gray-700"
                            } text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                            placeholder="admin@example.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                                <span>⚠</span> {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300 mb-2"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                required
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full rounded-lg bg-gray-800 border ${
                                    errors.password ? "border-red-500" : "border-gray-700"
                                } text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                            >
                                {showPassword ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                                <span>⚠</span> {errors.password}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600 text-white rounded-lg font-semibold transition duration-300 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 ${
                            loading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                                <span>Logging in...</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                <span>Login</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-700 text-center">
                    <p className="text-xs text-gray-400">
                        🔒 Only authorized admin users can access this area.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        Contact the site owner if you need access.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;