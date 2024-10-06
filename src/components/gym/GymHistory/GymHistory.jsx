import GymTrainings from "./GymTrainings";
import { useTranslation } from "react-i18next";

const GymHistory = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-grow flex-col items-center bg-[#e9ecef] dark:bg-gym-night-background gap-10 p-5 xl:p-10">
      <div
        style={{
          "background-image":
            "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
        }}
        className="min-w-80 xl:min-w-96 rounded-2xl shadow-xl p-10"
      >
        <h2 className="text-2xl text-white text-center my-5">
          {t("gym.historyTraining.filtration")}
        </h2>
        <div className="flex justify-between">
          <h2 className="text-white text-2xl">
            {t("gym.historyTraining.category")}
          </h2>
          <select
            //value={category}
            //onChange={handleCategoryChange}
            className="bg-run-night-element text-white p-2 rounded mb-4"
          >
            <option value=""> {t("gym.historyTraining.all")}</option>
            {/* {categories.map((category) => (
              <option key={category.run_category_id} value={category.category_name}>
                {category.category_name}
              </option>
            ))} */}
          </select>
        </div>
      </div>
      <div className="w-full px-5 xl:px-0 flex flex-grow flex-wrap justify-center">
        <GymTrainings />
      </div>
      <button
        // onClick={() =>
        //   navigate("/gym/workoutDetails", {
        //     state: { selectedExercises, planName: "QUICK WORKOUT" },
        //   })
        // }
        className={`w-28 py-3 rounded-2xl bg-lime-500 text-white`}
      >
        Load more
      </button>
    </div>
  );
};

export default GymHistory;
