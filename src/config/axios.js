import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import axios from "axios";
const instance = axios.create({
  baseURL: process.env.API_URL || "https://backend-diary-jqjw.onrender.com/",
});


const handleLogout = () => {
  signOut(auth)
    .then(() => {
      console.log("User logged out");
    })
    .catch((error) => {
      console.error("Error logging out: ", error);
    });
    localStorage.removeItem("token");
};
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      handleLogout();
    }
    return Promise.reject(error);
  }
);

export default instance;
