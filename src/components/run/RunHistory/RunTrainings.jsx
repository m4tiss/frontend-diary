import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import RunTrainingPanel from "./RunTrainingPanel";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const RunTrainings = ({ startDate, endDate }) => {
  const { t } = useTranslation();
  const [trainings, setTrainings] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const token = getAuthToken();
    axios
      .delete(`/run/workout/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        setTrainings((prevTrainings) =>
          prevTrainings.filter((training) => training.run_workout_id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting training:", error);
      });
  };

  const fetchTrainings = async (currentPage) => {
    const token = getAuthToken();
    try {
      const res = await axios.get("/run/workout/all/pageable", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          page: currentPage,
          startDate: startDate ? dayjs(startDate).format("YYYY-MM-DD HH:mm") : undefined,
          endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD HH:mm") : undefined,
        },
      });
      const response = res.data.workouts;
      setTrainings((prevTrainings) => [...prevTrainings, ...response]);
      setHasMore(res.data.hasMore);
    } catch (error) {
      console.error("Error fetching trainings:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setTrainings([]);
    fetchTrainings(1);
  }, [startDate, endDate]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTrainings(nextPage);
  };

  return (
    <>
      {trainings.length === 0 && !hasMore ? (
        <div className="w-full h-96 flex gap-20 flex-col items-center justify-center">
          <h2 className="text-5xl dark:text-white">
            {t("run.historyTraining.noTrainings")}
          </h2>
          <motion.button
            onClick={() => navigate("/run/newTraining")}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="text-white p-3 rounded-xl shadow-xl text-xl"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
            }}
          >
            {t("run.historyTraining.addTraining")}
          </motion.button>
        </div>
      ) : (
        <>
          {trainings.map((item) => (
            <RunTrainingPanel
              key={item.run_workout_id}
              training={item}
              onDelete={() => handleDelete(item.run_workout_id)}
              showDetails={true}
            />
          ))}
          {hasMore && trainings.length > 0 && (
            <div className="w-full flex justify-center">
              <motion.button
                onClick={handleLoadMore}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="w-40 text-white p-3 rounded-xl shadow-xl text-xl mt-4"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
                }}
              >
                {t("run.historyTraining.loadMore")}
              </motion.button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default RunTrainings;
