import axios from "axios";

const API = "http://localhost:5000/api";

// attach token automatically
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// AUTH
export const register = (data) => axios.post(`${API}/register`, data);
export const login = (data) => axios.post(`${API}/login`, data);
export const getMe = () => axios.get(`${API}/me`, getAuthHeader());
export const logout = () => axios.post(`${API}/logout`);

// USERS (admin)
export const getUsers = () => axios.get(`${API}/users`, getAuthHeader());

// PRODUCTS
export const getProducts = () => axios.get(`${API}/products`, getAuthHeader());
export const getProduct = (id) =>
  axios.get(`${API}/products/${id}`, getAuthHeader());

export const createProduct = (data) =>
  axios.post(`${API}/products`, data, getAuthHeader());

export const updateProduct = (id, data) =>
  axios.put(`${API}/products/${id}`, data, getAuthHeader());

export const deleteProduct = (id) =>
  axios.delete(`${API}/products/${id}`, getAuthHeader());