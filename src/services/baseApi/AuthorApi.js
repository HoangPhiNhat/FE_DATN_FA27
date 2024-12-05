import axios from "axios";
import { refreshToken } from "../auth";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho các yêu cầu
axiosClient.interceptors.request.use(
  (config) => {
    // Thêm token vào headers
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho các phản hồi
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;
    // Nếu token đã hết hạn
    if (response && response.status === 401) {
      try {
        await refreshToken(); // Gọi hàm refreshToken từ AuthApi
        return axiosClient(config); // Thực hiện lại yêu cầu gốc
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        // Nếu refreshToken cũng thất bại, chuyển hướng đến trang đăng nhập
        // window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    } else if (response && response.status === 403) {
      // window.location.href = "/admin/page403";
    } else if (response && response.status === 500) {
      // window.location.href = "/page500";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
