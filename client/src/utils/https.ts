import axios from "axios";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axiosLoanManagerInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Add a request interceptor if you need to modify requests globally
axiosLoanManagerInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // Read token from cookie
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor if you want to handle responses globally
axiosLoanManagerInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      //
    }
    return Promise.reject(error);
  }
);

// GET Request
export const apiGet = async (endpoint: string, params = {}) => {
  try {
    const response = await axiosLoanManagerInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// POST Request
export const apiPost = async (endpoint: string, data = {}, config = {}) => {
  try {
    const response = await axiosLoanManagerInstance.post(endpoint, data, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// PUT Request
export const apiPut = async (endpoint: string, data = {}, config = {}) => {
  try {
    const response = await axiosLoanManagerInstance.put(endpoint, data, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// DELETE Request
export const apiDelete = async (endpoint: string, config = {}) => {
  try {
    const response = await axiosLoanManagerInstance.delete(endpoint, config);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Error Handling Function
const handleError = (error: any) => {
  if (error.response) {
    const message = error.response.data.error || "An error occurred";
    console.error("API Error:", error.response.data);
    toast.error(message);
    throw new Error(message);
  } else {
    console.error("Network Error:", error.message);
    toast.error("Network error. Please try again.");
    throw new Error("Network error. Please try again.");
  }
};

