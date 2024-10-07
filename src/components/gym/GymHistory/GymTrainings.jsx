import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import GymTrainingPanel from "./GymTrainingPanel";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useNavigate } from "react-router-dom";

const GymTrainings = () => {
  const [workouts, setWorkouts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleDelete = (id) => {
    const token = getAuthToken();
    axios
      .delete(`/gym/workout/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        setWorkouts((prevWorkouts) =>
          prevWorkouts.filter((workout) => workout.workoutId !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting gym workout:", error);
      });
  };

  const fetchWorkouts = async (currentPage) => {
    const token = getAuthToken();
    try {
      const res = await axios.get("/gym/workout/all/pageable", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          page: currentPage,
        },
      });

      const response = res.data.workouts;
      setWorkouts((prevWorkouts) => [...prevWorkouts, ...response]);
      setHasMore(res.data.hasMore);
    } catch (error) {
      console.error("Error fetching gym workouts:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setWorkouts([]);
    fetchWorkouts(1); 
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchWorkouts(nextPage);
  };

  return (
    <>
      {workouts.length === 0 ? (
        <div className="w-full h-96 flex gap-20 flex-col items-center justify-center">
          <h2 className="text-5xl dark:text-white">
            {t("gym.historyTraining.noTrainings")}
          </h2>
          <motion.button
            onClick={() => navigate("/gym/newTraining")}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="text-white p-3 rounded-xl shadow-xl text-xl"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
            }}
          >
            {t("gym.historyTraining.addTraining")}
          </motion.button>
        </div>
      ) : (
        <>
          {workouts.map((workout) => (
            <GymTrainingPanel
              key={workout.workoutId}
              workout={workout}
              onDelete={() => handleDelete(workout.workoutId)}
            />
          ))}
          {hasMore && workouts.length > 0 && (
            <div className="w-full flex justify-center">
              <motion.button
                onClick={handleLoadMore}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="w-40 text-white p-3 rounded-xl shadow-xl text-xl mt-4"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
                }}
              >
                {t("gym.historyTraining.loadMore")}
              </motion.button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default GymTrainings;
