import GymAchievementSlider from "./GymAchievementSlider";
import GymTrainingSlider from "./GymTrainingSlider";

const GymHistory = () => {
  return (
    <div className="w-full flex flex-grow items-stretch bg-[#e9ecef]">
      <div className="flex p-10 justify-center items-center flex-wrap w-full">
        <div className="flex w-full">
          <div className="w-3/4">
            <div className="text-4xl m-5 flex">Last Trainings</div>
            <GymTrainingSlider />
          </div>
          <div
            style={{
              "background-image":
                "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
            }}
            className="w-1/4 rounded-2xl shadow-xl mx-5"
          >
            <h2 className="text-2xl text-white text-center my-5">Filtration</h2>
          </div>
        </div>
        <div className="text-4xl m-5">Achievements</div>
        <GymAchievementSlider />
      </div>
    </div>
  );
};

export default GymHistory;
