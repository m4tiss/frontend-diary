import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useTranslation } from "react-i18next";
import gymIcon from "../../../icons/gymIconLight.png";
import {
  formattedDate,
  formattedData,
  formattedDuration,
  formattedTime,
} from "../../../functions/formatData";
import { AnimatePresence } from "framer-motion";
import GymTrainingDetails from "./GymTrainingDetails";

const GymTrainingPanel = ({ workout, onDelete, showDetails }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const getTranslatedPlanName = () => {
    if (i18n.language === "pl" && workout?.planName === "QUICK WORKOUT") {
      return "SZYBKI TRENING";
    }
    return workout?.planName;
  };

  return (
    <div
      className="w-80 sm:w-96 h-80 sm:h-96 flex flex-col items-center justify-evenly rounded-2xl
           bg-white m-5 cursor-pointer"
      onClick={toggleDialog}
    >
      <div>
        <h2 className="text-2xl">{getTranslatedPlanName()}</h2>
      </div>
      <div className="flex justify-start w-full px-5  text-xl">
        <span className="text-5xl text-center w-full">
          {formattedDuration(workout.duration)}
        </span>
      </div>
      <div className="flex justify-evenly w-full px-5 text-xl">
        <span className=" text-center">
          {t("gym.general.sets")}: <span className="">{workout.sets}</span>
        </span>
        <span className="">
          {t("gym.general.weight")}:{" "}
          <span className="">{workout.volume} kg</span>
        </span>
      </div>

      <div className="w-full flex justify-evenly items-center">
        <h2 className="text-3xl">{formattedData(workout.rating)}</h2>
        <ReactStars
          count={5}
          size={30}
          color1="gray"
          color2={"#ffd700"}
          value={workout.rating}
          edit={false}
        />
      </div>
      <div className="w-full flex justify-evenly items-center">
        <img width={80} src={gymIcon} />
        <h2 className="text-xl">{formattedTime(workout.date)}</h2>
        <h2 className="text-xl">{formattedDate(workout.date || "00:00:00")}</h2>
      </div>
      <AnimatePresence>
        {isOpen && showDetails && (
          <GymTrainingDetails
            planName={workout.planName}
            toggleDialog={toggleDialog}
            workoutId={workout.workoutId}
            onDelete={onDelete}
            hideDelete={false}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GymTrainingPanel;
