import DashboardPanel from "../shared/DashboardPanel";
import doTraining from "../../icons/do_white.svg";
import history from "../../icons/history.svg";
import stats from "../../icons/stats.svg";
import friends from "../../icons/friends2.svg";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'

const RunDashbnoard = () => {
  const textColor = "#010000";
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col flex-grow ">
      <div className="flex-grow flex justify-center items-center">
        <div className="w-3/4 flex flex-col justify-center items-center">
          <h2
            style={{ color: textColor }}
            className="text-[80px] text-center font-bold tracking-tighter"
          >
            Run EVERYDAY
          </h2>
          <h2 className="text-[30px] my-10 md:my-0 tracking-tighter md:px-40 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            nesciunt molestiae Eum nesciunt molestiae suscipit ex! ex! Possimus
            a officia, quas, dolore quaerat similique ipsum rem iure, eum
            repellendus sit qui recusandae porro. Architecto.Y
          </h2>
        </div>
      </div>
      <motion.div
       initial="hidden"
       animate="visible"
       variants={{
         visible: {
           transition: {
             staggerChildren: 0.2,
           },
         },
       }}
        className=" flex-grow flex-wrap flex gap-10 md:mb-0 mb-10 justify-center items-center">
        <DashboardPanel
          title="New training"
          icon={doTraining}
          type="run"
          background="linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)"
          onclick={() => navigate("/run/newTraining")}
        />
        <DashboardPanel
          title="History training"
          icon={history}
          type="run"
          background="linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)"
          onclick={() => navigate("/run/history")}
        />
        <DashboardPanel
          title="Stats"
          icon={stats}
          type="run"
          background="linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)"
          onclick={() => navigate("/run/stats")}
        />
        <DashboardPanel
          title="Friends"
          icon={friends}
          type="run"
          background="linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)"
        />
      </motion.div>
    </div>
  );
};

export default RunDashbnoard;
