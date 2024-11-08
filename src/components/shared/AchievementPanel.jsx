import { Line } from "rc-progress";
import { GiWeight,GiGymBag } from "react-icons/gi";
import { FaUserFriends } from "react-icons/fa";
const AchievementPanel = ({ achievement }) => {
  let icon;
  if (achievement?.type === "workouts") {
    icon = <GiWeight size={50} color="white" />;
  } else if (achievement?.type === "sets") {
    icon = <GiGymBag size={50} color="white"  />;
  } else if (achievement?.type === "friends") {
    icon = <FaUserFriends size={50} color="white"  />;
  }



  let lineColor = "#e63946";
  if (achievement?.percent > 30 && achievement?.percent < 80) lineColor = "#ffd60a";
  if (achievement?.percent >= 80) lineColor = "#70e000";

  return (
    <div
      className="w-96 h-64 flex flex-col items-center justify-start rounded-2xl
           bg-white dark:bg-run-night-element dark:text-white border-black m-5 cursor-pointer relative py-10"
    >
      <div
        className="flex justify-center items-center w-20 h-20 rounded-xl shadow-xl absolute -top-10"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
        }}
      >
        {icon}
      </div>
      <div className="w-full flex items-center justify-center px-5 text-center flex-col my-2">
        <h2 className="text-2xl font-semibold">{achievement?.title}</h2>
        <span className="text-xl text-wrap">{achievement?.description}</span>
      </div>
      <div className="w-full px-5 font-semibold text-right text-xl">
        {achievement?.percent}%
        <Line percent={achievement?.percent} trailColor="#FFFFFF" strokeColor={lineColor} />
      </div>
    </div>
  );
};

export default AchievementPanel;
