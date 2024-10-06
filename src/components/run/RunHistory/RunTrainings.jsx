import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import RunTrainingPanel from "./RunTrainingPanel";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useNavigate } from "react-router-dom";

const RunTrainings = ({ categoryName }) => {
  const { t } = useTranslation();
  const [trainings, setTrainings] = useState([]);
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
        console.log("Przeładowałem");
      })
      .catch((error) => {
        console.error("Error deleting training:", error);
      });
  };

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/workout/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: categoryName ? { category_name: categoryName } : {},
      })
      .then((res) => {
        let response = res.data.workouts;
        response = response.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTrainings(response);
        console.log(response);
      });
  }, [categoryName]);

  return (
    <>
      {trainings.length === 0 ? (
        <div className="w-full h-96 flex gap-20 flex-col items-center justify-center">
          <h2 className="text-5xl dark:text-white">
            {" "}
            {t("run.historyTraining.noTrainings")}
          </h2>
          <motion.button
            onClick={() => navigate("/run/newTraining")}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="text-white p-3 rounded-xl shadow-xl text-xl"
            style={{
              "background-image":
                "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
            }}
          >
            {t("run.historyTraining.addTraining")}
          </motion.button>
        </div>
      ) : (
        trainings.map((item) => (
          <RunTrainingPanel
            training={item}
            onDelete={() => handleDelete(item.run_workout_id)}
          />
        ))
      )}
    </>
  );
};

export default RunTrainings;
