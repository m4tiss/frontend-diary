import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useState, useEffect } from "react";
import { formattedDuration, formattedData } from "../../../functions/formatData";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";

const RunRecords = () => {
  const [records, setRecords] = useState([]);
  const { t } = useTranslation();

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
        console.log(respone);
      })
      .catch((error) => {
        console.error("Error fetching records data:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-grow flex-col-reverse justify-evenly items-center bg-[#e9ecef] dark:bg-run-night-background py-10 xl:px-0 px-5 gap-10 xl:gap-0">
      <div className="w-full flex flex-col 2xl:flex-row justify-evenly items-center bg-[#e9ecef] dark:bg-run-night-background  gap-10 xl:gap-0">
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="w-80 h-96 bg-white shadow-xl rounded-xl flex-col flex justify-center items-center"
        >
          <label className="text-7xl">
            {formattedData(records.longest_distance || 0.0)} km
          </label>
          <h2 className="text-2xl">{t("run.records.longestDistance")}</h2>
        </motion.div>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="w-80 h-96 bg-white shadow-xl rounded-xl flex-col flex justify-center items-center"
        >
          <label className="text-7xl">{records.highest_average_pulse}</label>
          <h2 className="text-2xl">{t("run.records.highestAveragePulse")}</h2>
        </motion.div>
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="w-80 h-96 bg-white shadow-xl rounded-xl flex-col flex justify-center items-center"
        >
          <label className="text-5xl">
            {formattedDuration(records.longest_duration || "00:00:00")}
          </label>
          <h2 className="text-2xl">{t("run.records.longestTraining")}</h2>
        </motion.div>
      </div>

      <motion.div initial={{ y: 50 }} animate={{ y: 0 }}>
        <h1 className="text-4xl xl:text-9xl opacity-50 font-bold text-black dark:text-white">
        {t("run.records.personalRecords")}
        </h1>
      </motion.div>
    </div>
  );
};

export default RunRecords;
