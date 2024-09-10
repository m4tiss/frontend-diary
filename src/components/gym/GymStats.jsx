import { useState, useEffect } from "react";
import SmallStatsPanel from "../shared/SmallStatsPanel";
import GymStatsProfile from "./GymStatsProfile";
import FriendStatsPanel from "../shared/FriendStatsPanel";
import ChartMuscleUsed from "./charts/ChartMuscleUsed";
import { useUser } from "../../providers/UserProvider";
import { useTranslation } from "react-i18next";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import ChartDuration from "./charts/ChartDuration";
import { formattedDuration } from "../../functions/formatData";

const StatsGym = () => {
  const { t } = useTranslation();
  const { userInfo } = useUser();
  const [friends, setFriends] = useState([]);
  const [selectedRange, setSelectedRange] = useState("week");
  const [loadingStats, setLoadingStats] = useState(false);

  const [stats, setStats] = useState({
    totalVolume: 0.0,
    totalDuration: "00:00:00",
    avgRating: 0.0,
    totalSets: 0,
    workoutSessions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      const token = getAuthToken();
      try {
        const res = await axios.get("/gym/chart/stats", {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            range: selectedRange,
          },
        });
        const stats = res.data.stats;
        console.log(stats);
        setStats({
          totalVolume: stats.totalVolume,
          totalDuration: stats.totalDuration,
          avgRating: stats.avgRating,
          totalSets: stats.totalSets,
          workoutSessions: stats.workoutSessions,
        });
      } catch (error) {
        console.error("Error fetching stats data:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, [selectedRange]);

  useEffect(() => {
    const fetchFriends = async () => {
      const token = getAuthToken();
      try {
        const res = await axios.get("/shared/getFriends", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const response = res.data.friends;
        console.log(response);
        setFriends(response);
      } catch (error) {
        console.error("Error fetching friends data:", error);
      }
    };

    fetchFriends();
  }, []);

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  const getButtonStyle = (range) => {
    return selectedRange === range
      ? "p-2 min-w-20 border-2 border-red-500 rounded-xl bg-red-500 text-white"
      : "p-2 min-w-20 border-2 border-red-500 rounded-xl";
  };

  return (
    <div className="w-full flex flex-grow bg-[#e9ecef]">
      <div className="w-3/4 flex flex-col p-10 justify-center items-center flex-wrap h-fit">
        <div className="w-full m-5 flex justify-center items-center">
          <span className="text-2xl font-semibold">
            {" "}
            {t("gym.stats.personalStats")}
          </span>
        </div>
        <div className="flex justify-center w-full gap-5 mb-10">
          <button
            className={getButtonStyle("week")}
            onClick={() => handleRangeChange("week")}
          >
            {t("gym.stats.week")}
          </button>
          <button
            className={getButtonStyle("month")}
            onClick={() => handleRangeChange("month")}
          >
            {t("gym.stats.month")}
          </button>
          <button
            className={getButtonStyle("year")}
            onClick={() => handleRangeChange("year")}
          >
            {t("gym.stats.year")}
          </button>
          <button
            className={getButtonStyle("all")}
            onClick={() => handleRangeChange("all")}
          >
            {t("gym.stats.all")}
          </button>
        </div>
        <div className="flex justify-between w-full gap-5">
          <SmallStatsPanel
            title={t("gym.stats.totalVolume")}
            description={stats.totalVolume + " kg"}
            loading={loadingStats}
          />
          <SmallStatsPanel
            title={t("gym.stats.workoutSessions")}
            description={stats.workoutSessions}
            loading={loadingStats}
          />
          <SmallStatsPanel
            title={t("gym.stats.totalSets")}
            description={stats.totalSets}
            loading={loadingStats}
          />
          <SmallStatsPanel
            title={t("gym.stats.totalTime")}
            description={formattedDuration(stats.totalDuration)}
            loading={loadingStats}
          />
        </div>
        <div className="w-full flex justify-between m-5 gap-5">
          <ChartDuration />
          <ChartMuscleUsed range={selectedRange} />
        </div>
      </div>

      <div className="w-1/4 flex flex-col">
        <div className="flex-grow m-10">
          <GymStatsProfile />
          <div className="bg-white dark:bg-run-night-element text-black dark:text-white flex flex-col rounded-2xl shadow-xl my-10 py-10 gap-2">
            <div className="flex flex-grow justify-evenly text-2xl font-semibold w-full">
              <span>{t('shared.friends.friends')}</span> <span>{userInfo.friends_count}</span>
            </div>
            {friends.slice(0, 5).map((user) => (
              <FriendStatsPanel key={user.user_id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsGym;
