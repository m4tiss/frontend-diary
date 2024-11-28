import { motion } from "framer-motion";
import { Gauge } from "@mui/x-charts/Gauge";
import { useState } from "react";
import { formattedDate } from "../../../functions/formatData";
import { calculateDaysDiff } from "../../../functions/statsCalculations";
import { useTranslation } from "react-i18next";
import { FaArrowDown } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import chestIcon from "../../../icons/chestIcon.jpg";
import backIcon from "../../../icons/backIcon.jpg";
import bicepsIcon from "../../../icons/bicepsIcon.jpg";
import tricepsIcon from "../../../icons/tricepsIcon.jpg";
import shouldersIcon from "../../../icons/shouldersIcon.jpg";
import absIcon from "../../../icons/absIcon.jpg";
import legsIcon from "../../../icons/legsIcon.jpg";

const icons = {
  Chest: chestIcon,
  Back: backIcon,
  Biceps: bicepsIcon,
  Triceps: tricepsIcon,
  Shoulders: shouldersIcon,
  Abs: absIcon,
  Legs: legsIcon,
};

const GymGoalPanel = ({ goal, deleteGoal }) => {
  const { t } = useTranslation();
  const [flipped, setFlipped] = useState(false);

  const daysLeft = calculateDaysDiff(goal.finish_date);
  const daysLeftMessage =
    daysLeft === 1 ? t("gym.goals.dayLeft") : t("gym.goals.daysLeft");

  const status = {
    color:
      goal?.percent >= 100 ? "#70e000" : daysLeft === 0 ? "#e63946" : "#ffd60a",
    text:
      goal?.percent >= 100
        ? t("gym.goals.completed")
        : daysLeft === 0
        ? t("gym.goals.notCompleted")
        : t("gym.goals.inProgress"),
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
              <div className="w-1/2 flex flex-col  justify-center items-center text-2xl">
                <Gauge
                  value={goal.percent}
                  startAngle={0}
                  endAngle={360}
                  innerRadius="80%"
                  outerRadius="100%"
                />
                {goal.current_goal} / {goal.goal}
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

        <div className="absolute w-12 right-0 bottom-0 h-12 flex justify-center z-50 items-center rounded-br-xl cursor-pointer">
          <RiDeleteBin7Line
            color="red"
            onClick={(event) => {
              event.stopPropagation();
              deleteGoal(goal.run_goal_id);
            }}
            size={30}
          />
        </div>
        <div className="absolute p-2 left-0 bottom-0 flex justify-center items-center rounded-br-xl gap-2">
          <img src={icons[goal.type]} alt={goal.type} className="w-16 h-16" />
          <label className="text-xl font-semibold">{goal.type}</label>
        </div>
      </div>
    </motion.div>
  );
};

export default GymGoalPanel;
