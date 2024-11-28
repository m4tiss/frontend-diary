import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import GymGoalPanel from "./GymGoalPanel";


const GymGoals = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/gym/goal/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const response = res.data.goals;
        
        const sortedGoals = response.sort(
          (a, b) => new Date(b.finish_date) - new Date(a.finish_date)
        );
        console.log(sortedGoals)
        setGoals(sortedGoals);
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
      });
  }, []);

  const deleteGoal = async (goalId) => {
    const token = getAuthToken();
    try {
      await axios.delete(`/gym/goal/${goalId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setGoals((prevGoals) => prevGoals.filter((goal) => goal.gym_goal_id !== goalId));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <div className="w-full flex flex-grow flex-col justify-start bg-[#e9ecef] dark:bg-run-night-background py-10 px-5 gap-10">
      <div className="w-full flex flex-col text-center items-center text-black dark:text-white justify-center gap-5">
        <h2 className="text-7xl">{t("gym.goals.title")}</h2>
        <label className="text-2xl px-10">{t("gym.goals.description")}</label>
      </div>

      <div className="w-full flex justify-center flex-wrap gap-20">
        {goals.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center ">
            <motion.button
              onClick={() => navigate("/run/profile")}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="text-white p-3 rounded-xl shadow-xl text-xl"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
              }}
            >
              {t("run.goals.addGoal")}
            </motion.button>
          </div>
        ) : (
          <>
            {goals.map((goal) => (
              <GymGoalPanel goal={goal} key={goal.gym_goal_id} deleteGoal={deleteGoal} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default GymGoals;
