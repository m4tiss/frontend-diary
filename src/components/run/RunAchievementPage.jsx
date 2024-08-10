import { motion } from "framer-motion";
import AchievementSlider from "../shared/AchievementSlider";
const RunAchievementPage = () => {
  return (
    <div className="w-full flex flex-col items-stretch flex-grow 
    bg-[#e9ecef] dark:bg-run-night-background dark:text-white">
        <div className="text-4xl m-5">Run Achievements</div>

      <div className="flex">
        <AchievementSlider type={"run"} slidesPerView={4} />
      </div>

      <div className="text-4xl m-5">Shared Achievements</div>
      <div className="flex">
        <AchievementSlider type={"shared"} slidesPerView={4} />
      </div>
    </div>
  );
};

export default RunAchievementPage;
