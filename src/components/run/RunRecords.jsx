import RunGoalPanel from "./RunGoalPanel";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

const RunRecords = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/goal/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.goals;
        console.log(res.data.goals);
        setGoals(respone);
      })
      .catch((error) => {
        console.error("Error fetching pulse data:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-grow flex-col justify-evenly items-center bg-[#e9ecef] dark:bg-run-night-background">
      <div className="w-full flex flex-col 2xl:flex-row justify-evenly items-center bg-[#e9ecef] dark:bg-run-night-background">
        <div className="w-80 h-96 bg-white shadow-xl rounded-xl flex-col flex justify-center items-center">
          <label className="text-7xl">62.2 km</label>
          <h2 className="text-2xl">Longest Distance</h2>
        </div>
        <div className="w-80 h-96 bg-white shadow-xl rounded-xl flex-col flex justify-center items-center">
          <label className="text-7xl">189</label>
          <h2 className="text-2xl">Highest pulse</h2>
        </div>
        <div className="w-80 h-96 bg-white shadow-xl rounded-xl flex-col flex justify-center items-center">
          <label className="text-5xl">3h 20min 13sec</label>
          <h2 className="text-2xl">Longest Training</h2>
        </div>
        <div className="w-80 h-96 bg-white shadow-xl rounded-xl flex-col flex justify-center items-center">
          <label className="text-6xl">1300</label>
          <h2 className="text-2xl">Most calories</h2>
        </div>
      </div>

      <div>
        <h1 className="text-9xl opacity-50 font-bold text-black dark:text-white">
          PERSONAL RECORDS
        </h1>
      </div>
    </div>
  );
};

export default RunRecords;
