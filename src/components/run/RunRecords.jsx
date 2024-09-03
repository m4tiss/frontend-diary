import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { useState, useEffect } from "react";
import { formattedDuration, formattedData } from "../../functions/formatData";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

const RunRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/records/getRecords", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.records;
        setRecords(respone);
        console.log(respone)
      })
      .catch((error) => {
        console.error("Error fetching records data:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-grow flex-col justify-evenly items-center bg-[#e9ecef] dark:bg-run-night-background">
      <div className="w-full flex flex-col 2xl:flex-row justify-evenly items-center bg-[#e9ecef] dark:bg-run-night-background">
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="w-80 h-96 bg-white shadow-xl rounded-xl flex-col flex justify-center items-center"
        >
          <label className="text-7xl">{formattedData(records.longest_distance||0.0)} km</label>
          <h2 className="text-2xl">Longest Distance</h2>
        </motion.div>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="w-80 h-96 bg-white shadow-xl rounded-xl flex-col flex justify-center items-center"
        >
          <label className="text-7xl">{records.highest_average_pulse}</label>
          <h2 className="text-2xl">Highest average pulse</h2>
        </motion.div>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="w-80 h-96 bg-white shadow-xl rounded-xl flex-col flex justify-center items-center"
        >
          <label className="text-5xl">
            {formattedDuration(records.longest_duration || "00:00:00")}
          </label>
          <h2 className="text-2xl">Longest Training</h2>
        </motion.div>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="w-80 h-96 bg-white shadow-xl rounded-xl flex-col flex justify-center items-center"
        >
          <label className="text-6xl">1300</label>
          <h2 className="text-2xl">Most calories</h2>
        </motion.div>
      </div>

      <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}>
        <h1 className="text-9xl opacity-50 font-bold text-black dark:text-white">
          PERSONAL RECORDS
        </h1>
      </motion.div>
    </div>
  );
};

export default RunRecords;
