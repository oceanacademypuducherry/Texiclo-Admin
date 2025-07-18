import axios from "axios";
import Cookies from "js-cookie";
export const AdminAPI = axios.create({
  baseURL:
    "http://127.0.0.1:1001/oa-job-portal/asia-south1/texiclo_admin_test_api/app",
});

AdminAPI.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
