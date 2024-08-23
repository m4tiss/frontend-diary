import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import "react-toastify/dist/ReactToastify.css";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useScroll,
} from "framer-motion";
import LoginPage1 from "../../images/loginPage1.png";
import LoginPage2 from "../../images/loginPage2.png";
import LoginPage3 from "../../images/loginPage3.png";
import ContentContext from "../../providers/ContentProvider";
import { useContext } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const { setGymContent } = useContext(ContentContext);
  const navigate = useNavigate();

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 200, 300, 500], [0, 200, 300, 480]);
  const scaleText = useTransform(scrollY, [0, 300, 500], [1, 0.7, 0.5]);
  const colorText = useTransform(scrollY, [0, 300], ["#ffffff", "#000000"]);
  const opacityText = useTransform(scrollY, [0, 300, 500], [0.5, 0.7, 1]);
  useEffect(() => {
    axios
      .get("/public/numberOfUsers")
      .then((res) => {
        let response = res.data;
        setNumberOfUsers(response + 200);
      })
      .catch((error) => {
        console.error("Error fetching numberOfUsers data:", error);
      });
  }, []);

  useEffect(() => {
    animate(count, numberOfUsers, {
      duration: 2,
    });
  }, [numberOfUsers]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const respone = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("token", respone.user.accessToken);
      setGymContent()
      navigate("/gym/dashboard");
    } catch (error) {
      toast.error("Invalid email or password!");
    }
  };

  return (
    <>
      <div
        style={{
          "background-image":
            "linear-gradient(to top, #ffffff, #f1d3f5, #fc9fcd, #ff6685, #e73725)",
        }}
        className="min-h-screen flex flex-col 2xl:flex-row justify-center"
      >
        <div className="hidden 2xl:flex absolute top-20 w-full h-full justify-center">
          <motion.h1
            style={{
              scale: scaleText,
              y: yText,
              opacity: opacityText,
              color: colorText,
            }}
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="text-9xl font-bold"
          >
            TRAINING AND RUN
          </motion.h1>
        </div>
        <div className="2xl:w-1/2 w-full my-10 2xl:my-0 flex justify-center items-center z-50">
          <motion.form
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="w-full 2xl:w-1/2 h-fit flex flex-col mx-10 2xl:mx-0 p-10 bg-white rounded-2xl shadow-xl"
            onSubmit={handleLogin}
          >
            <h2 className="w-full text-4xl text-center font font-semibold">
              Login
            </h2>
            <div className="flex flex-col">
              <label className="p-2">Email</label>
              <input
                className="p-2 text-2xl  text-black border-2 border-gray-200 outline-none"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col ">
              <label className="p-2">Password</label>
              <input
                className="p-2 text-2xl text-black border-2 border-gray-200 outline-none"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="my-10 bg-[#e73725] rounded-3xl p-2 text-2xl text-white"
              type="submit"
            >
              Login
            </button>
            <label
              onClick={() => navigate("/register")}
              className="w-full text-center cursor-pointer"
            >
              I have no account
            </label>
          </motion.form>
        </div>
        <div className="2xl:w-1/2 w-full flex flex-col justify-center items-center z-50">
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="flex h-fit 2xl:w-fit w-80 text-white text-center"
          >
            <div className="flex-grow flex flex-col justify-center items-center">
              <motion.h1 className="text-9xl font-semibold">
                {rounded}
              </motion.h1>
              <h2 className="text-4xl">Users on our platform</h2>
              {/* <h2 className="text-9xl">Better everyday</h2> */}
            </div>
          </motion.div>
        </div>
      </div>
      <div
        style={{
          "background-image":
            "linear-gradient(to bottom, #ffffff, #e2e3fb, #bbcaf9, #86b4f6, #1da1f2)",
        }}
        className="min-h-screen flex flex-col 2xl:flex-row py-10"
      >
        <div className="2xl:w-2/3 w-full flex flex-col items-center gap-10">
          <motion.img
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1,
              },
            }}
            viewport={{ once: true }}
            className="w-[900px] shadow-xl rounded-xl"
            src={LoginPage1}
          />
          <motion.img
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1,
              },
            }}
            viewport={{ once: true }}
            className="w-[900px] shadow-xl rounded-xl"
            src={LoginPage3}
          />
        </div>
        <div className="2xl:w-1/3 my-10 2xl:my-0 w-full flex justify-center items-center">
          <motion.img
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1,
              },
            }}
            viewport={{ once: true }}
            className="w-[300px] shadow-xl rounded-xl"
            src={LoginPage2}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
