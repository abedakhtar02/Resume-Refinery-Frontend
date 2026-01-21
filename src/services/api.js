import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://resume-refinery-backend.onrender.com";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Auth APIs
export const authAPI = {
  signup: async (userData) => {
    const response = await api.post("/auth/signup", userData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

// Resume Analysis API
export const resumeAPI = {
  analyze: async (file, jobDescription, targetRole, experienceLevel) => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    if (targetRole) formData.append("targetRole", targetRole);
    if (experienceLevel) formData.append("experienceLevel", experienceLevel);

    const response = await api.post("/ats/analyze", formData);
    return response.data;
  },
  getHistory: async () => {
    const response = await api.get("/ats/history");
    return response.data;
  },
  getAnalysisById: async (id) => {
    const response = await api.get(`/ats/analysis/${id}`);
    return response.data;
  },
};

export default api;
