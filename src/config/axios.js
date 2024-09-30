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

      window.location.href = "https://diary.mateuszgwozdz.pl/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
