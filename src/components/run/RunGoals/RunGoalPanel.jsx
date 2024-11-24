import { formattedDate, formattedData } from "../../../functions/formatData";
import { calculateDaysDiff } from "../../../functions/statsCalculations";
import { useTranslation } from "react-i18next";

const RunGoalPanel = ({ goal }) => {
  const { t } = useTranslation();
  const daysLeft = calculateDaysDiff(goal.finish_date);
  const daysLeftMessage = daysLeft === 1 ? t("run.goals.dayLeft") : t("run.goals.daysLeft");

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

  console.log(`text-[${statusColor}]`);

  return (
    <div className="w-full h-full flex py-5 xl:py-20 gap-5  flex-col items-center dark:text-white dark:bg-run-night-element justify-between bg-white rounded-xl">
      <h2 className="text-2xl xl:text-6xl text-center">{goal.title}</h2>
      <label className="text-xl xl:text-2xl flex items-center justify-center text-center px-5 xl:px-0 xl:min-h-0 min-h-60">{goal.description}</label>
      <div className="w-full flex flex-col justify-center items-center 2xl:flex-row 2xl:justify-evenly text-xl xl:text-2xl">
        <label>{t("run.goals.createdDate")} {formattedDate(goal.create_date)}</label>
        <label>{t("run.goals.finishDate")} {formattedDate(goal.finish_date)}</label>
      </div>
      <label className="text-2xl xl:text-4xl">
        {formattedData(goal.current_goal)} km / {formattedData(goal.goal)} km
      </label>
      <label className="text-2xl xl:text-4xl">
        Status: <span style={{ color: statusColor }}>{statusText}</span>
      </label>
      <h2
        style={{
          "background-image":
            "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
        }}
        className="text-2xl xl:text-5xl w-3/4 p-2 rounded-full shadow-xl text-center text-white"
      >
        {daysLeft} {daysLeftMessage}
      </h2>
    </div>
  );
};

export default RunGoalPanel;
