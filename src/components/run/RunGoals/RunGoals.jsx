import RunGoalPanel from "./RunGoalPanel";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const RunGoals = () => {
  const [goals, setGoals] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/goal/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const response = res.data.goals;
        const sortedGoals = response.sort(
          (a, b) => new Date(b.finish_date) - new Date(a.finish_date)
        );
        setGoals(sortedGoals);
      })
      .catch((error) => {
        console.error("Error fetching pulse data:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-grow flex-col justify-center bg-[#e9ecef] dark:bg-run-night-background py-10 px-5 gap-10">
      <div className="w-full flex flex-col text-center items-center text-black dark:text-white justify-center gap-5">
        <h2 className="text-7xl">{t("run.goals.title")}</h2>
        <label className="text-2xl px-10">{t("run.goals.description")}</label>
      </div>

      <div
      className="w-full flex justify-center flex-wrap gap-20"
    >
        {goals.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center ">
            <motion.button
              onClick={() => navigate("/run/profile")}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="text-white p-3 rounded-xl shadow-xl text-xl"
              style={{
                "background-image":
                  "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
              }}
            >
              {t("run.goals.addGoal")}
            </motion.button>
          </div>

        ) : (
          <>
            {goals.map((goal, index) => (
              <RunGoalPanel goal={goal} key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RunGoals;
