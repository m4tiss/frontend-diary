import { formattedDate, formattedData } from "../../functions/formatData";
import { calculateDaysDiff } from "../../functions/statsCalculations";

const RunGoalPanel = ({ goal }) => {
  const daysLeft = calculateDaysDiff(goal.finish_date);
  const daysLeftMessage = daysLeft === 1 ? "DAY LEFT" : "DAYS LEFT";

  const percentageCompleted = (goal.current_goal / goal.goal) * 100;

  let statusColor = "";
  let statusText = "";
  if(daysLeft === 0 ) {
    statusColor = "#e63946"
    statusText = "Not completed"
}
  else if (percentageCompleted >= 0 && percentageCompleted < 100 ) {
    statusColor = "#ffd60a";
    statusText = "In progress"
  } else if (percentageCompleted >= 100) {
    statusColor = "#70e000";
    statusText = "Completed"
  }

  console.log(`text-[${statusColor}]`);

  return (
    <div className="w-full h-full flex py-20 flex-col items-center dark:text-white dark:bg-run-night-element justify-between bg-white shadow-xl rounded-xl">
      <h2 className="text-6xl text-center">{goal.title}</h2>
      <label className="text-2xl text-center">{goal.description}</label>
      <div className="w-full flex justify-evenly text-2xl">
        <label>Created Date: {formattedDate(goal.create_date)}</label>
        <label>Finish Date: {formattedDate(goal.finish_date)}</label>
      </div>
      <label className="text-4xl">
        {formattedData(goal.current_goal)} km / {formattedData(goal.goal)} km
      </label>
      <label className="text-2xl">
        Status: <span style={{ color: statusColor }}>{statusText}</span>
      </label>
      <h2
        style={{
          "background-image":
            "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
        }}
        className="text-5xl w-3/4 p-2 rounded-full shadow-xl text-center text-white"
      >
        {daysLeft} {daysLeftMessage}
      </h2>
    </div>
  );
};

export default RunGoalPanel;
