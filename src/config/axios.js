import axios from "axios";
const instance = axios.create({
  baseURL: process.env.API_URL || "https://backend-diary-jqjw.onrender.com/",
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "http://localhost:3000/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
