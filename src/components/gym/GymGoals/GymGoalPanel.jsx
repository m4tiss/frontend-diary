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
  const daysLeft = calculateDaysDiff(goal.finish_date);
  const daysLeftMessage =
    daysLeft === 1 ? t("run.goals.dayLeft") : t("run.goals.daysLeft");

  let statusColor = "";
  let statusText = "";

  if (goal?.percent >= 100) {
    statusColor = "#70e000";
    statusText = t("run.goals.completed");
  } else if (daysLeft === 0) {
    statusColor = "#e63946";
    statusText = t("run.goals.notCompleted");
  } else if (goal?.percent >= 0 && goal?.percent < 100) {
    statusColor = "#ffd60a";
    statusText = t("run.goals.inProgress");
  }

  return (
    <div className="w-80 xl:w-[600px] min-h-80 bg-white dark:bg-run-night-element flex flex-col justify-between items-center rounded-xl p-5 py-16 gap-5 relative">
      <div
        className="absolute left-0 top-0 w-full h-12 flex justify-center items-center rounded-t-xl"
        style={{ backgroundColor: statusColor }}
      >
        <span className="text-lg xl:text-2xl text-white">
          {statusText} --- {daysLeft} {daysLeftMessage}
        </span>
      </div>
      <h2 className="text-3xl text-center">{goal.title}</h2>
      <div className="w-full flex justify-evenly">
        <label className="w-1/2 text-xl xl:text-2xl flex items-center justify-center text-center px-5 xl:px-0">
          {goal.description}
        </label>
        <div className="w-1/2 flex flex-col justify-center items-center text-xl xl:text-2xl gap-5">
          <label>{formattedDate(goal.create_date)}</label>
          <FaArrowDown />
          <label>{formattedDate(goal.finish_date)}</label>
        </div>
      </div>

      <label className="text-2xl">
        {goal.current_goal} / {goal.goal}
      </label>

      {/* Delete icon */}
      <div
        className="absolute w-12 right-0 bottom-0 h-12 flex justify-center items-center rounded-br-xl cursor-pointer"
       // onClick={() => deleteGoal(goal.gym_goal_id)}
      >
        <RiDeleteBin7Line color="red" size={30} />
      </div>

      <div
        className="absolute p-2 left-0 bottom-0 flex justify-center items-center rounded-br-xl gap-2"
      >
        <img
          src={icons[goal.type]}
          alt={goal.type}
          className="w-16 h-16"
        /> <label className="text-xl font-semibold">{goal.type}</label>
      </div>
    </div>
  );
};

export default GymGoalPanel;
