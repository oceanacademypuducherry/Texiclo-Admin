import axios from "axios";

export const AdminAPI = axios.create({
  baseURL:
    "http://127.0.0.1:1001/oa-job-portal/asia-south1/texiclo_admin_test_api/app",
});

