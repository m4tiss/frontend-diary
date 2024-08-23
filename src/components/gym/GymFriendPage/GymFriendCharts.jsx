import { TbRun } from "react-icons/tb";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FriendChartPanel from "../../shared/FriendChartPanel";
import { CiDumbbell } from "react-icons/ci";
import { BsHeartPulse } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { GiMuscleUp } from "react-icons/gi";
import { GiWeight } from "react-icons/gi";
import { GiGymBag } from "react-icons/gi";
import GymFriendChartModal from "./GymFriendChartModal";
const GymFriendCharts = ({ friendInfo, friendId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(null);

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-1/3 flex flex-col justify-center items-center bg-white dark:bg-run-night-element rounded-xl m-10 shadow-xl">
      <div className="flex flex-wrap gap-5 justify-center">
      <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Workouts");
          }}
          type={"gym"}
          title="Workouts"
          icon={<CiDumbbell size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Muscles");
          }}
          type={"gym"}
          title="Muscles"
          icon={<GiMuscleUp size={50} color="white" />}
        />

        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Volume");
          }}
          type={"gym"}
          title="Volume"
          icon={<GiWeight size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Friends");
          }}
          type={"gym"}
          title="Friends"
          icon={<FaUserFriends size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Sets");
          }}
          type={"gym"}
          title="Sets"
          icon={<GiGymBag size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Duration");
          }}
          type={"gym"}
          title="Duration"
          icon={<MdOutlineAccessTime size={50} color="white" />}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <GymFriendChartModal
            friendInfo={friendInfo}
            friendId={friendId}
            toggleDialog={toggleDialog}
            type={type}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GymFriendCharts;
