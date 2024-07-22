import DashboardPanel from "../shared/DashboardPanel";
import doTraining from "../../icons/do_white.svg";
import history from "../../icons/history.svg";
import stats from "../../icons/stats.svg";
import friends from "../../icons/friends2.svg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const GymDashboard = () => {
  const textColor = "#010000";
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col flex-grow ">
      <div className="flex-grow flex justify-center items-center">
        <div className="w-3/4 flex flex-col justify-center items-center">
          <h2
            style={{ color: textColor }}
            className="text-[80px] text-center  font-bold tracking-tighter"
          >
            TRAINING EVERYDAY
          </h2>
          <h2 className="text-[30px] tracking-tighter md:px-40 text-center">
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
      className=" flex-grow flex flex-wrap gap-10 my-10 md:my-0  justify-center items-center">
        <DashboardPanel
          title="New training"
          icon={doTraining}
          type="gym"
          onclick={() => navigate("/gym/newTraining")}
          background="linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)"
        />
        <DashboardPanel
          title="History training"
          icon={history}
          type="gym"
          onclick={() => navigate("/gym/history")}
          background="linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)"
        />
        <DashboardPanel
          title="Stats"
          icon={stats}
          type="gym"
          onclick={() => navigate("/gym/stats")}
          background="linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)"
        />
        <DashboardPanel
          title="Friends"
          icon={friends}
          type="gym"
          background="linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)"
          onclick={() => navigate("/gym/friends")}
        />
      </motion.div>
    </div>
  );
};

export default GymDashboard;
