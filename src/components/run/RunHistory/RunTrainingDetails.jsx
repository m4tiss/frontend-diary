import { motion } from "framer-motion";
import ReactStars from "react-stars";
import { createPortal } from "react-dom";
import {
  formattedData,
  formattedDate,
  formattedTime,
  formattedDuration,
} from "../../../functions/formatData";
import { useTranslation } from "react-i18next";

const RunTrainingDetails = ({ toggleDialog, training, onDelete }) => {
  const { t } = useTranslation();
  const handleDelete = () => {
    onDelete();
    toggleDialog();
  };
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleDialog}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.2, opacity: 0 }}
        className="bg-white flex flex-col items-center rounded-xl p-6 shadow-xl w-3/4 h-3/4 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center px-10 justify-between">
          <h2 className="text-4xl">{training.category_name}</h2>
          <div className="flex gap-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              onClick={handleDelete}
              className="mt-4 px-4 py-2 h-fit shadow-xl bg-red-500 text-white rounded"
            >
              {t("shared.actions.delete")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              onClick={toggleDialog}
              className="mt-4 px-4 py-2 h-fit shadow-xl bg-lime-500 text-white rounded"
            >
              {t("shared.actions.edit")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              onClick={toggleDialog}
              className="mt-4 px-4 py-2 h-fit shadow-xl bg-purple-500 text-white rounded"
            >
              {t("shared.actions.close")}
            </motion.button>
          </div>
        </div>
        <div className="flex  w-full flex-grow">
          <div className="flex flex-col items-center justify-center w-1/3">
            <h2 className="text-8xl text-center">
              {formattedDuration(training.duration)}
            </h2>
            <label className="text-3xl">{t("run.general.duration")}</label>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3">
            <h2 className="text-7xl">{formattedData(training.rating || 0)}</h2>
            <ReactStars
              count={5}
              size={70}
              color1="gray"
              color2={"#ffd700"}
              value={training.rating}
              edit={false}
            />
            <label className="text-3xl">{t("run.general.rating")}</label>
          </div>
          <div className="flex flex-col items-center justify-center w-1/3">
            <h2 className="text-8xl text-center">
              {formattedData(training.distance || 0)} km
            </h2>
            <h2 className="text-3xl">{t("run.general.distance")}</h2>
          </div>
        </div>
        <div className="w-full flex my-20 text-4xl text-center">
          <div className="w-1/2">{training.note}</div>
          <div className="w-1/2">
            {t("run.general.averagePulse")}: {training.average_pulse}
          </div>
        </div>
        <div className="w-full justify-center items-center flex gap-5 text-4xl">
          <h2 className=" text-4xl">{formattedTime(training.date)}</h2>
          <h2 className=" text-4xl">{formattedDate(training.date)}</h2>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default RunTrainingDetails;
