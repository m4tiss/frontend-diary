import { motion } from "framer-motion";
import RunAchievementSlider from "./RunAchievementSlider";
const RunAchievementPage = () => {
  return (
    <div className="w-full flex flex-col items-stretch flex-grow bg-[#e9ecef]">
        <div className="text-4xl m-5">Achievements</div>

      <div className="flex">
        <RunAchievementSlider slidesPerView={4} />
      </div>

      <div className="text-4xl m-5">Achievements</div>
      <div className="flex">
        <RunAchievementSlider slidesPerView={4} />
      </div>
    </div>
  );
};

export default RunAchievementPage;
