import RunAchievementSlider from "./RunAchievementSlider";
import RunTrainingSlider from "./RunTrainingSlider";
import { motion } from "framer-motion";
const RunHistory = () => {
  return (
    <div className="w-full flex flex-grow items-stretch bg-[#e9ecef]">
      <div className="flex p-10 justify-center items-center flex-wrap w-full">
        <div className="flex w-full">
          <div
            className="w-3/4"
          >
            <div className="text-4xl m-5 flex">Last Trainings</div>
            <RunTrainingSlider />
          </div>
          <div
            style={{
              "background-image":
                "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
            }}
            className="w-1/4 rounded-2xl shadow-xl mx-5"
          >
            <h2 className="text-2xl text-white text-center my-5">Filtration</h2>
          </div>
        </div>
        <div className="text-4xl m-5">Achievements</div>
        <RunAchievementSlider slidesPerView={4} />
      </div>
    </div>
  );
};

export default RunHistory;
