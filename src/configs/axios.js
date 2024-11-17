import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response.data.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        return instance
          .post("/users/refresh-token", {
            refresh_token: refreshToken,
          })
          .then((response) => {
            localStorage.setItem("token", response?.data?.access_token);
            localStorage.setItem("refreshToken", response?.data?.refresh_token);
            error.config.headers.Authorization = `Bearer${response?.data?.refresh_token}`;
            return instance(error.config);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    return Promise.reject(error);
  }
);

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
