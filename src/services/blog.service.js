import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/blog/";


const getBlogs = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const updateBlogs = (payload) => {
  return axios.put(API_URL, payload, { headers: authHeader() });
};

const createBlog = (payload) => {
  return axios.post(API_URL , payload, { headers: authHeader() });
};

const getBlogById = (id) => {
    return axios.get(API_URL + id , { headers: authHeader() });
};

export default {
  createBlog,
  updateBlogs,
  getBlogs,
  getBlogById
};
