import GymTrainingSlider from "./GymTrainingSlider";
import { useTranslation } from "react-i18next";

const GymHistory = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex flex-grow items-stretch bg-[#e9ecef] dark:bg-run-night-background gap-10 p-5 xl:p-10">
      <div className="flex flex-col-reverse xl:flex-row w-full gap-10 xl:gap-0">
        <div className="w-full px-5 xl:px-0 xl:w-3/4 flex flex-col items-center justify-evenly flex-grow">
          <GymTrainingSlider />
          <div className="w-full xl:w-1/2 text-center gap-5 p-3 rounded-xl shadow-xl bg-white flex flex-col dark:bg-run-night-element dark:text-white">
            <h2 className="text-5xl">{t('gym.historyTraining.title')}</h2>
            <label className="text-xl">
            {t('gym.historyTraining.description')}
            </label>
          </div>
        </div>
        <div
          style={{
            "background-image":
              "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
          }}
          className="min-w-80 xl:min-w-96 rounded-2xl  shadow-xl p-10"
        >
          <h2 className="text-2xl text-white text-center my-5">{t('gym.historyTraining.filtration')}</h2>
          <div className="flex justify-between">
            <h2 className="text-white text-2xl">{t('gym.historyTraining.category')}</h2>
            <select
              //value={category}
              //onChange={handleCategoryChange}
              className="bg-run-night-element text-white p-2 rounded mb-4"
            >
              <option value=""> {t('gym.historyTraining.all')}</option>
              {/* {categories.map((category) => (
              <option key={category.run_category_id} value={category.category_name}>
                {category.category_name}
              </option>
            ))} */}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymHistory;
