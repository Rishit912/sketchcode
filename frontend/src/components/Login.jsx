import React, { useState, useEffect } from "react";
import api from '../api';
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [lockoutTime, setLockoutTime] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const nextParam = new URLSearchParams(location.search).get('next');
    const redirectTarget = nextParam ? decodeURIComponent(nextParam) : '/admin-dashboard';
    const [hasSession, setHasSession] = useState(false);
    
    const MAX_ATTEMPTS = 5;
    const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
    const RESEND_COOLDOWN = 60; // 60 seconds

    // Detect existing session; do NOT auto-redirect so user can choose to logout
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setHasSession(true);
        }
        
        // Check for lockout on mount
        const lockoutData = localStorage.getItem("loginLockout");
        if (lockoutData) {
            const { lockedUntil } = JSON.parse(lockoutData);
            if (Date.now() < lockedUntil) {
                setIsLocked(true);
                setLockoutTime(lockedUntil);
                
                // Set timer to unlock
                const timeout = setTimeout(() => {
                    setIsLocked(false);
                    setLockoutTime(null);
                    localStorage.removeItem("loginLockout");
                }, lockedUntil - Date.now());
                
                return () => clearTimeout(timeout);
            } else {
                localStorage.removeItem("loginLockout");
            }
        }
    }, []);
    useEffect(() => {
        if (resendTimer > 0) {
            const interval = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [resendTimer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        // Check if locked out
        if (isLocked) {
            const remainingMinutes = Math.ceil((lockoutTime - Date.now()) / 60000);
            setError(`Too many failed attempts. Please try again in ${remainingMinutes} minute(s).`);
            return;
        }

        // If OTP already sent, verify it
        if (otpSent) {
            return handleVerifyOTP();
        }
        
        // Step 1: Verify credentials and send OTP
        // Input validation
        if (!email.trim() || !password.trim()) {
            setError("Please enter both email and password");
            return;
        }
        
        // Basic email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }
        
        setLoading(true);

        try {
            const res = await api.post("/api/auth/login", { 
                email: email.trim().toLowerCase(), 
                password 
            });
            
            if (res.data.requiresOTP) {
                // OTP sent successfully
                setOtpSent(true);
                setResendTimer(RESEND_COOLDOWN);
                setError("");
            }
        } catch (err) {
            console.error("Login error:", err);
            
            // Increment failed attempts
            const newAttempts = loginAttempts + 1;
            setLoginAttempts(newAttempts);
            
            // Lock account after max attempts
            if (newAttempts >= MAX_ATTEMPTS) {
                const lockedUntil = Date.now() + LOCKOUT_DURATION;
                localStorage.setItem("loginLockout", JSON.stringify({ lockedUntil }));
                setIsLocked(true);
                setLockoutTime(lockedUntil);
                setError(`Too many failed attempts. Account locked for 15 minutes.`);
            } else {
                const remainingAttempts = MAX_ATTEMPTS - newAttempts;
                setError(`Invalid credentials. ${remainingAttempts} attempt(s) remaining before lockout.`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp.trim() || otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await api.post("/api/auth/verify-otp", {
                email: email.trim().toLowerCase(),
                otp: otp.trim()
            });

            if (res.data.token) {
                // Clear any lockout on successful login
                localStorage.removeItem("loginLockout");
                setLoginAttempts(0);
                
                localStorage.setItem("token", res.data.token);
                api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
                if (res.data.user) {
                    localStorage.setItem("user", JSON.stringify(res.data.user));
                }
                navigate(redirectTarget, { replace: true });
                return;
            }

            setError("Invalid OTP. Please try again.");
        } catch (err) {
            console.error("OTP verification error:", err);
            setError(err.response?.data?.message || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (resendTimer > 0) return;

        setLoading(true);
        setError("");

        try {
            const res = await api.post("/api/auth/resend-otp", {
                email: email.trim().toLowerCase()
            });
            setResendTimer(RESEND_COOLDOWN);
            setError("");
        } catch (err) {
            console.error("Resend OTP error:", err);
            setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        setOtpSent(false);
        setOtp("");
        setError("");
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        api.defaults.headers.common.Authorization = undefined;
        setHasSession(false);
        setOtpSent(false);
        setOtp("");
        setPassword("");
        setEmail("");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
            <div className="w-full max-w-md rounded-2xl bg-gray-900/80 p-8 shadow-2xl backdrop-blur-sm border border-gray-700">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">
                        {otpSent ? "Verify OTP" : "Admin Login"}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {otpSent 
                            ? `Enter the 6-digit code sent to ${email}`
                            : "Secure access to admin panel"}
                    </p>
                    {hasSession && !otpSent && (
                        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-300 text-sm flex flex-col gap-2">
                            <span>You're already logged in.</span>
                            <div className="flex gap-3 justify-center">
                                <button
                                    type="button"
                                    onClick={() => navigate(redirectTarget, { replace: true })}
                                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                                >
                                    Go to Dashboard
                                </button>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!otpSent ? (
                        <>
                            {/* Email Input */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    required
                                    disabled={isLocked}
                                    autoComplete="email"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        disabled={isLocked}
                                        autoComplete="current-password"
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-12 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                                        disabled={isLocked}
                                    >
                                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* OTP Input */}
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Verification Code
                                </label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="Enter 6-digit OTP"
                                    required
                                    maxLength={6}
                                    autoComplete="one-time-code"
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-center text-2xl tracking-widest font-mono"
                                />
                                <p className="text-xs text-gray-400 mt-2 text-center">
                                    Code expires in 10 minutes
                                </p>
                            </div>

                            {/* Resend OTP */}
                            <div className="text-center">
                                {resendTimer > 0 ? (
                                    <p className="text-sm text-gray-400">
                                        Resend code in {resendTimer}s
                                    </p>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        disabled={loading}
                                        className="text-sm text-blue-400 hover:text-blue-300 transition disabled:opacity-50"
                                    >
                                        Resend OTP
                                    </button>
                                )}
                            </div>

                            {/* Back to Login */}
                            <button
                                type="button"
                                onClick={handleBackToLogin}
                                className="w-full py-2 text-sm text-gray-400 hover:text-gray-300 transition"
                            >
                                ← Back to login
                            </button>
                        </>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}
                    
                    {/* Security Notice */}
                    {!isLocked && !otpSent && loginAttempts > 0 && (
                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-xs">
                            ⚠️ Failed login attempt detected. Your account will be temporarily locked after {MAX_ATTEMPTS} failed attempts.
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || isLocked}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition shadow-lg hover:shadow-xl"
                    >
                        {loading 
                            ? (otpSent ? "Verifying..." : "Sending OTP...") 
                            : isLocked 
                            ? "Account Locked" 
                            : (otpSent ? "Verify OTP" : "Continue")}
                    </button>
                </form>
                
                {/* Security Info */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="text-xs text-gray-500 space-y-2">
                        <p className="flex items-center gap-2">
                            <span className="text-green-500">🔒</span> Encrypted connection
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-green-500">🛡️</span> Brute force protection enabled
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="text-green-500">📧</span> Email OTP verification
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;