import ReactStars from "react-stars";
import pic from "../../icons/runIcon.png";
import RunTrainingDetails from "./RunTrainingDetails";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { formattedData, formattedDate, formattedTime, formattedDuration} from '../../functions/formatData'


const RunTrainingSlide = ({ training, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="w-96 h-96 flex flex-col items-center justify-evenly rounded-2xl
           bg-white border-black m-5 cursor-pointer shadow-xl"
      onClick={toggleDialog}
    >
      <div>
        <h2 className="text-2xl">
          {training.category_name || "UNKNOWN TITLE"}
        </h2>
      </div>
      <div className="flex justify-start w-full px-5  text-xl">
        <span className="text-5xl text-center  w-full">
          {formattedData(training.distance || 0)} km
        </span>
      </div>
      <div className="flex justify-evenly w-full px-5  text-xl">
        <span className=" text-center">
          <span className="">
            {formattedDuration(training.duration || "00:00:00")}
          </span>
        </span>
        <span className="">
          <span className="">2:30/km</span>
        </span>
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
      <div className=" w-full flex justify-evenly items-center">
        <img width={60} src={pic} />
        <div className="flex gap-5">
          <h2 className=" text-xl">{formattedTime(training.date)}</h2>
          <h2 className=" text-xl">{formattedDate(training.date)}</h2>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <RunTrainingDetails
            toggleDialog={toggleDialog}
            training={training}
            onDelete={onDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RunTrainingSlide;
