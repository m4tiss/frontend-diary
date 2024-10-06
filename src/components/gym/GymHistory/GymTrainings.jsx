import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import GymTrainingPanel from "./GymTrainingPanel";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useNavigate } from "react-router-dom";

const GymTrainings = () => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        
        console.log("Przeładowałem");
      })
      .catch((error) => {
        console.error("Error deleting gym workout:", error);
      });
  };
 
  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/gym/workout/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let response = res.data.workouts;
        response = response.sort((a, b) => new Date(b.date) - new Date(a.date));
        setWorkouts(response);
        console.log(response);
      });
  }, []);

  return (
    <>
      {workouts.length === 0 ? (
          <div className="w-full h-96 flex gap-20 flex-col items-center justify-center">
            <h2 className="text-5xl dark:text-white">{t('gym.historyTraining.noTrainings')}</h2>
            <motion.button
              onClick={() => navigate("/gym/newTraining")}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="text-white p-3 rounded-xl shadow-xl text-xl"
              style={{
                "background-image":
                  "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
              }}
            >
             {t('gym.historyTraining.addTraining')}
            </motion.button>
          </div>
      ) : (
        workouts.slice(0,4).map((workout) => (
            <GymTrainingPanel
              workout={workout}
              onDelete={() => handleDelete(workout.workoutId)}
            />
        ))
      )}  
      </>

  );
};

export default GymTrainings;
