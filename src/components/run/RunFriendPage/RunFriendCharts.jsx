import { TbRun } from "react-icons/tb";
import FriendChartPanel from "../../shared/FriendChartPanel";
import { CiDumbbell } from "react-icons/ci";
import { BsHeartPulse } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
const RunFriendCharts = () => {
    return (
        <div className="w-1/3 flex flex-col justify-center items-center bg-white dark:bg-run-night-element rounded-xl m-10 shadow-xl">
          <div className="flex flex-wrap gap-5 justify-center">
            <FriendChartPanel
              type={"run"}
              title="Average pulse"
              icon={<BsHeartPulse size={50} color="white" />}
            />
            <FriendChartPanel
              type={"run"}
              title="Trainings"
              icon={<CiDumbbell size={50} color="white" />}
            />
            <FriendChartPanel
              type={"run"}
              title="Distance"
              icon={<TbRun size={50} color="white" />}
            />
            <FriendChartPanel
              type={"run"}
              title="Friends"
              icon={<FaUserFriends size={50} color="white" />}
            />
            <FriendChartPanel
              type={"run"}
              title="Categories"
              icon={<TbCategory size={50} color="white" />}
            />
            <FriendChartPanel
              type={"run"}
              title="Time"
              icon={<MdOutlineAccessTime size={50} color="white" />}
            />
          </div>
        </div>
    );
  };
  
  export default RunFriendCharts;
  