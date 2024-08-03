import { TbRun } from "react-icons/tb";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FriendChartPanel from "../../shared/FriendChartPanel";
import { CiDumbbell } from "react-icons/ci";
import { BsHeartPulse } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import RunFriendChartModal from "./RunFriendChartModal";
const RunFriendCharts = ({ friendInfo, friendId }) => {
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
            setType("Pulse");
          }}
          type={"run"}
          title="Pulse"
          icon={<BsHeartPulse size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Trainings");
          }}
          type={"run"}
          title="Trainings"
          icon={<CiDumbbell size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Distance");
          }}
          type={"run"}
          title="Distance"
          icon={<TbRun size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Friends");
          }}
          type={"run"}
          title="Friends"
          icon={<FaUserFriends size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Categories");
          }}
          type={"run"}
          title="Categories"
          icon={<TbCategory size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Time");
          }}
          type={"run"}
          title="Time"
          icon={<MdOutlineAccessTime size={50} color="white" />}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <RunFriendChartModal
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

export default RunFriendCharts;
