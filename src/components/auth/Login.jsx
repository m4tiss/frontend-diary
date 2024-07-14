import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
     animate(count, 423, {
      duration: 2,
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const respone = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("token", respone.user.accessToken);
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
      <div className="w-1/2 flex flex-col justify-center items-center ">
        
        <motion.h1 className="text-8xl">{rounded}</motion.h1>
        <h2 className="text-4xl">Users on our platform</h2>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
