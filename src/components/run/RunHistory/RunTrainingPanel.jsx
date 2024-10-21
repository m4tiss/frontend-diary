import ReactStars from "react-stars";
import { useContext } from "react";
import DarkModeContext from "../../../providers/DarkModeProvider";
import iconDark from "../../../icons/runIconDark.png";
import iconLight from "../../../icons/runIconLight.png";
import RunTrainingDetails from "./RunTrainingDetails";
import { LuMapPin } from "react-icons/lu";
import { LuMapPinOff } from "react-icons/lu";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  formattedData,
  formattedDate,
  formattedTime,
  formattedDuration,
} from "../../../functions/formatData";

const RunTrainingPanel = ({ training, onDelete }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="w-80 sm:w-96 h-80 sm:h-96 flex flex-col items-center justify-evenly rounded-2xl
           bg-white border-black m-5 dark:text-white cursor-pointer dark:bg-run-night-element"
      onClick={toggleDialog}
    >
      <div>
        <h2 className="text-2xl">
          {training.category_name || "UNKNOWN TITLE"}
        </h2>
      </div>
      <div className="flex justify-start w-full px-5  text-xl">
        <span className="text-5xl text-center w-full">
          {formattedData(training.distance || 0)} km
        </span>
      </div>
      <div className="flex items-center justify-evenly w-full px-5 text-xl">
        <span className="text-center">
            {formattedDuration(training.duration || "00:00:00")}
        </span>
        <div>
          {training.coordinates.length > 0 ?(<LuMapPin size={40} />):( <LuMapPinOff size={40}/>)}

        </div>
      </div>

      <div className="w-full flex justify-evenly items-center">
        <h2 className="text-3xl">{formattedData(training.rating || 0)}</h2>
        <ReactStars
          count={5}
          size={30}
          color1="gray"
          color2={"#ffd700"}
          value={training.rating}
          edit={false}
        />
      </div>
      <div className="w-full flex justify-evenly items-center">
        <img width={60} src={darkMode ? iconDark : iconLight} alt="Run Icon" />
        <div className="flex gap-5">
          <h2 className="text-xl">{formattedTime(training.date)}</h2>
          <h2 className="text-xl">{formattedDate(training.date)}</h2>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <RunTrainingDetails
            toggleDialog={toggleDialog}
            training={training}
            onDelete={onDelete}
            hideDelete={false}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RunTrainingPanel;
