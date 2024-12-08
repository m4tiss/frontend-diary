import { TbRun } from "react-icons/tb";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import FriendChartPanel from "../../shared/Friends/FriendChartPanel";
import { CiDumbbell } from "react-icons/ci";
import { BsHeartPulse } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import RunFriendChartModal from "./RunFriendChartModal";
import { useTranslation } from "react-i18next";
const RunFriendCharts = ({ friendInfo, friendId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState(null);
  const { t } = useTranslation();

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full xl:w-1/3 flex flex-col justify-center items-center bg-white dark:bg-run-night-element rounded-xl py-5 xl:m-10 xl:px-10 shadow-xl">
      <div className="flex flex-wrap gap-5 justify-center">
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Pulse");
          }}
          type={"run"}
          title={t('run.general.averagePulse')}
          icon={<BsHeartPulse size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Trainings");
          }}
          type={"run"}
          title={t('run.general.trainings')}
          icon={<CiDumbbell size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Distance");
          }}
          type={"run"}
          title={t('run.general.distance')}
          icon={<TbRun size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Rating");
          }}
          type={"run"}
          title={t('run.general.rating')}
          icon={<CiStar size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Categories");
          }}
          type={"run"}
          title={t('run.general.category')}
          icon={<TbCategory size={50} color="white" />}
        />
        <FriendChartPanel
          onClick={() => {
            toggleDialog();
            setType("Duration");
          }}
          type={"run"}
          title={t('run.general.duration')}
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
