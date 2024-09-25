import { LineChart } from "@mui/x-charts";
import { useState } from "react";
import { IoBarbell } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ChartSets from "../charts/ChartSets";
import ChartVolume from "../charts/ChartVolume";

const GymNewTraining = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col flex-grow bg-[#e9ecef] py-10 xl:py-0 gap-10 xl:gap-0">
      <div className="flex flex-col xl:flex-row items-center justify-evenly xl:my-20 gap-10 xl:gap-0">
        <motion.div
          onClick={() => navigate("/gym/plannedWorkout")}
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
          <h2>{t('gym.newTraining.plannedWorkout')}</h2>
        </motion.div>

        <motion.div
          onClick={() => navigate("/gym/quickWorkout")}
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
          <h2>{t('gym.newTraining.quickWorkout')}</h2>
        </motion.div>
      </div>
      <div className="w-full flex flex-col xl:flex-row items-center justify-evenly gap-10 xl:gap-0">
        <ChartVolume />
        <ChartSets />
      </div>
    </div>
  );
};

export default GymNewTraining;
