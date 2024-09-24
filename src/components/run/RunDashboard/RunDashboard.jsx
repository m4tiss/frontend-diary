import DashboardPanel from "../../shared/DashboardPanel";
import doTraining from "../../../icons/do_white.svg";
import history from "../../../icons/history.svg";
import stats from "../../../icons/stats.svg";
import friends from "../../../icons/friends2.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const RunDashbnoard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="w-full flex flex-col flex-grow dark:bg-run-night-background py-10 xl:py-0">
      <div className="flex-grow flex justify-center items-center">
        <div className="text-black dark:text-white w-3/4 flex flex-col justify-center items-center">
          <h2 className="text-[80px] text-center font-bold tracking-tighter">
            {t("run.dashboard.title")}
          </h2>
          <h2 className="text-[30px] my-10 md:my-0 tracking-tighter md:px-40 text-center">
            {t("run.dashboard.description")}
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
        className=" flex-grow flex-wrap flex gap-10 md:mb-0 mb-10 justify-center items-center"
      >
        <DashboardPanel
          title={t("run.dashboard.newTraining")}
          icon={doTraining}
          type="run"
          background="linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)"
          onclick={() => navigate("/run/newTraining")}
        />
        <DashboardPanel
          title={t("run.dashboard.historyTraining")}
          icon={history}
          type="run"
          background="linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)"
          onclick={() => navigate("/run/history")}
        />
        <DashboardPanel
          title={t("run.dashboard.stats")}
          icon={stats}
          type="run"
          background="linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)"
          onclick={() => navigate("/run/stats")}
        />
        <DashboardPanel
          title={t("run.dashboard.friends")}
          icon={friends}
          type="run"
          background="linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)"
          onclick={() => navigate("/run/friends")}
        />
      </motion.div>
    </div>
  );
};

export default RunDashbnoard;
