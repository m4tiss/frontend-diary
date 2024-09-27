import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useState, useEffect } from "react";
import { formattedDuration, formattedData } from "../../../functions/formatData";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


const RunRecords = () => {
  const [records, setRecords] = useState(null);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRecords = async () => {
      const token = getAuthToken();
      try {
        const response = await axios.get("/run/records/getRecords", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecords(response.data.records);
      } catch (err) {
        console.error("Error fetching records data:", err);
        setError(t("run.records.errorLoading"));
      }
    };

    fetchRecords();
  }, [t]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!records) {
    return <div className="text-center">{t("run.records.loading")}</div>;
  }

  const RecordCard = ({ value, label, unit }) => (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="w-80 h-96 bg-white dark:bg-run-night-element dark:text-white shadow-xl rounded-xl flex flex-col justify-center items-center"
    >
      <label className={`text-7xl ${unit === "time" ? "text-5xl" : ""}`}>
        {unit === "distance" && formattedData(value)}
        {unit === "time" && formattedDuration(value)}
        {unit === "pulse" && value}
        {unit === "distance" && " km"}
      </label>
      <h2 className="text-2xl">{label}</h2>
    </motion.div>
  );

  return (
    <div className="w-full flex flex-grow flex-col-reverse justify-evenly items-center bg-[#e9ecef] dark:bg-run-night-background py-10 xl:px-0 px-5 gap-10 xl:gap-0">
      <div className="w-full flex flex-col 2xl:flex-row justify-evenly items-center gap-10 xl:gap-0">
        <RecordCard
          value={records.longest_distance || 0.0}
          label={t("run.records.longestDistance")}
          unit="distance"
        />
        <RecordCard
          value={records.highest_average_pulse || 0}
          label={t("run.records.highestAveragePulse")}
          unit="pulse"
        />
        <RecordCard
          value={records.longest_duration || "00:00:00"}
          label={t("run.records.longestTraining")}
          unit="time"
        />
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
