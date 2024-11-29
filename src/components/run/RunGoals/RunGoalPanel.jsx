import { motion } from "framer-motion";
import { useState } from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import { formattedDate, formattedData } from "../../../functions/formatData";
import { calculateDaysDiff } from "../../../functions/statsCalculations";
import { useTranslation } from "react-i18next";
import { FaArrowDown } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";

const RunGoalPanel = ({ goal, deleteGoal }) => {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);

  const daysLeft = calculateDaysDiff(goal.finish_date);
  const daysLeftMessage =
    daysLeft === 1 ? t("run.goals.dayLeft") : t("run.goals.daysLeft");

  const status = {
    color:
      goal?.percent >= 100 ? "#70e000" : daysLeft === 0 ? "#e63946" : "#ffd60a",
    text:
      goal?.percent >= 100
        ? t("run.goals.completed")
        : daysLeft === 0
        ? t("run.goals.notCompleted")
        : t("run.goals.inProgress"),
  };

  const containerStyles =
    "w-80 xl:w-[600px] min-h-96 flex flex-col justify-between items-center rounded-xl relative cursor-pointer";
  const contentStyles =
    "w-full h-full flex flex-col justify-evenly items-center bg-white dark:bg-run-night-element rounded-xl p-5 py-16 absolute backface-hidden";
  const statusBarStyles =
    "absolute left-0 top-0 w-full h-12 flex justify-center items-center rounded-t-xl";

  return (
    <motion.div
      className={containerStyles}
      onClick={() => setFlipped(!flipped)}
      initial={false}
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <div
        className={contentStyles}
        style={!flipped ? {} : { transform: "rotateY(180deg)" }}
      >
        <div
          className={statusBarStyles}
          style={{ backgroundColor: status.color }}
        >
          <span className="text-lg xl:text-2xl text-white">
            {status.text} --- {daysLeft} {daysLeftMessage}
          </span>
        </div>
        <h2 className="text-3xl text-center font-semibold">{goal.title}</h2>

        {!flipped ? (
          <>
            <div className="w-full flex justify-evenly">
              <div className="w-1/2 flex flex-col  justify-center items-center text-xl xl:text-2xl">
                <Gauge
                  height={100}
                  value={goal.percent}
                  startAngle={0}
                  endAngle={360}
                  innerRadius="90%"
                  outerRadius="100%"
                />
                {formattedData(goal.current_goal)} km /{" "}
                {formattedData(goal.goal)} km
              </div>
              <div className="w-1/2 flex flex-col justify-center items-center text-xl xl:text-2xl gap-5">
                <label>{formattedDate(goal.create_date)}</label>
                <FaArrowDown />
                <label>{formattedDate(goal.finish_date)}</label>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full">
            <label className="w-full max-h-48 text-xl xl:text-2xl flex items-center justify-center text-center px-5 xl:px-0">
              {goal.description}
            </label>
          </div>
        )}

        <div className="absolute w-12 right-0 bottom-0 h-12 flex justify-center items-center rounded-br-xl cursor-pointer">
          <RiDeleteBin7Line
            color="red"
            size={30}
            onClick={(event) => {
              event.stopPropagation();
              deleteGoal(goal.run_goal_id);
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default RunGoalPanel;
