// Login.js
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const respone = await signInWithEmailAndPassword(auth, email, password);
      console.log(respone.user.accessToken)
      localStorage.setItem('token',respone.user.accessToken)
      navigate("/gym/dashboard");
    } catch (error) {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-1/2 flex justify-center items-center">
        <form
          className="flex flex-col w-80 h-96 px-10 bg-[#E73725] rounded-2xl shadow-xl"
          onSubmit={handleLogin}
        >
          <input
            className="my-10 p-2 text-2xl rounded-3xl"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="my-10 p-2 text-2xl rounded-3xl"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="my-10 bg-white rounded-3xl p-2 text-2xl text-[#E73725]"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-1/2 flex justify-center items-center ">info</div>

      <ToastContainer />
    </div>
  );
};

export default Login;
