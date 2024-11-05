import axios from "axios";
const instance = axios.create({
  baseURL: "https://52b5-2001-ee0-700f-e83f-997a-347-95bd-3812.ngrok-free.app/api/v1",
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
