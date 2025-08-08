import axios from "axios";
import Cookies from "js-cookie";
export const AdminAPI = axios.create({
  baseURL:
    // "http://127.0.0.1:2001/texiclo-8b211/asia-south1/texiclo_admin_api/app",
    "https://texiclo-admin-api-szkqgxi2aq-el.a.run.app/app",
});

AdminAPI.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
