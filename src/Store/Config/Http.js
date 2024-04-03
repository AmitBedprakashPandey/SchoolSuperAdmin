import Axios from "axios";

const axiosInstance = Axios.create({
  // Configuring a base URL if needed
  // baseURL: 'http://example.com/api',
});

axiosInstance.interceptors.request.use(
  (config) => {
    // config.baseURL = process.env.REACT_APP_API;
    const Ttoken = localStorage.getItem("Ttoken");
    if (Ttoken ) {
      config.headers.Authorization = Ttoken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.put["Content-Type"] = "application/json";

export default axiosInstance;
