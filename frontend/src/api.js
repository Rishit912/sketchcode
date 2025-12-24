import axios from 'axios';

// Prefer explicit env vars; otherwise pick a sensible default based on current host
const isBrowser = typeof window !== 'undefined';
const isProdHost = isBrowser && /flitcode\.app$/i.test(window.location.hostname);
const defaultBase = isProdHost ? 'https://flitcode-api.vercel.app' : 'http://localhost:8001';
const BASE_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || defaultBase;

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
export { BASE_URL };
