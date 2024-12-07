import { Line } from "rc-progress";
import { FaRunning } from "react-icons/fa";
import { CiDumbbell } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { useContext } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ContentContext from "../../providers/ContentProvider";
const AchievementPanel = ({ type, achievement }) => {
  const { isGymContent } = useContext(ContentContext);
  const { t } = useTranslation();

  let icon;
  if (achievement?.type === "workouts") {
    icon = <CiDumbbell size={50} color="white" />;
  } else if (achievement?.type === "distance") {
    icon = <FaRunning size={50} color="white" />;
  } else if (achievement?.type === "friends") {
    icon = <FaUserFriends size={50} color="white" />;
  }

  let lineColor = "#e63946";
  if (achievement?.percent > 30 && achievement?.percent < 80)
    lineColor = "#ffd60a";
  if (achievement?.percent >= 80) lineColor = "#70e000";

  return (
    <motion.div
      whileHover={{ y: -20 }}
      className="w-80 md:w-[500px] h-64 flex flex-col items-center justify-start rounded-2xl
           bg-white dark:bg-run-night-element dark:text-white border-black m-5 relative py-10"
    >
      <div
        className="flex justify-center items-center w-20 h-20 rounded-xl shadow-xl absolute -top-10"
        style={{
          backgroundImage: isGymContent
            ? "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)"
            : "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
        }}
      >
        {icon}
      </div>
      <div className="w-full flex min-h-36 items-center justify-center px-5 text-center flex-col my-2">
        <h2 className="text-2xl font-semibold">{t(`${type}.achievements.${achievement?.title}`)}</h2>
        <span className="text-xl text-wrap">{t(`${type}.achievements.${achievement?.description}`)}</span>
      </div>
      <div className="w-full px-5 font-semibold text-right text-xl">
        {achievement?.percent.toFixed(2)} %
        <Line
          percent={achievement?.percent}
          trailColor="#FFFFFF"
          strokeColor={lineColor}
        />
      </div>
    </motion.div>
  );
};

export default AchievementPanel;
