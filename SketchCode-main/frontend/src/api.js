import axios from 'axios';

// Use Vercel/Vite env var; fallback to localhost for local dev
const BASE_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
export { BASE_URL };
