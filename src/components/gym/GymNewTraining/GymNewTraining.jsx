import { LineChart } from "@mui/x-charts";
import { useState } from "react";
import { IoBarbell } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ChartSets from "../charts/ChartSets";
import ChartVolume from "../charts/ChartVolume";

const GymNewTraining = () => {
  const GYM_COLOR = "#FF0000";
  const RUN_COLOR = "#1DA1F2";

  const uData = [9, 12, 12, 13, 14, 13, 12];
  const pData = [1300, 1350, 1420, 1370, 1300, 1400, 1500];
  const xLabels = [
    "15.05.2024",
    "16.05.2024",
    "17.05.2024",
    "18.05.2024",
    "19.05.2024",
    "20.05.2024",
    "21.05.2024",
  ];

  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col flex-grow bg-[#e9ecef]">

      <div className="flex justify-evenly my-20">
        <motion.div
        onClick={()=>navigate('/gym/plannedWorkout')}
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
          }}
          className="rounded-full flex flex-col justify-center items-center h-60 w-60 text-white cursor-pointer"
        >
          <CgNotes size={70} />
          <h2>Planned workout</h2>
        </motion.div>

        <motion.div
        onClick={()=>navigate('/gym/quickWorkout')}
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
          }}
          className="rounded-full flex flex-col justify-center items-center h-60 w-60 text-white cursor-pointer"
        >
          <IoBarbell size={70} />
          <h2>Quick workout</h2>
        </motion.div>
      </div>
      <div className="w-full flex justify-evenly">
        <ChartVolume/>
        <ChartSets/>
      </div>
    </div>
  );
};

export default GymNewTraining;
