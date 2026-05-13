import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
console.log("API baseURL:", API.defaults.baseURL);


// AUTH
export const register = (data) =>
  API.post('/register', data);

export const login = (data) =>
  API.post('/login', data);

export const getMe = () =>
  API.get('/me');

export const logoutUser = () =>
  API.post('/logout');


// PRODUCTS
export const createProduct = (data) =>
  API.post('/products', data);

export const getProducts = () =>
  API.get('/products');

export const getProduct = (id) =>
  API.get(`/products/${id}`);

export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data);

export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);



