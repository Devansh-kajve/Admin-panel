// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend API URL
  headers: {
    "Content-Type": "application/json",
    // Add authorization header if needed (JWT token)
  },
});

export default API;
