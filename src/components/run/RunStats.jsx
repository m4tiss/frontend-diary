import { useState, useEffect } from "react";
import { LineChart, BarChart, PieChart } from "@mui/x-charts";
import SmallStatsPanel from "../shared/SmallStatsPanel";
import RunStatsProfile from "../run/RunStatsProfile";
import FriendStatsPanel from "../shared/FriendStatsPanel";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import ChartCategories from "./charts/ChartCategories";
import { useUser } from "../../providers/UserProvider";
import { formattedData, formattedDuration } from "../../functions/formatData";
import ChartDuration from "./charts/ChartDuration";

const RunStats = () => {
  const { userInfo } = useUser();

  const [stats, setStats] = useState({
    distance: 0.0,
    duration: "00:00:00",
    avgRating: 0.0,
    avgPulse: 0,
    activeGoals: 0,
  });
  const [friends, setFriends] = useState([]);
  const [completedRunAchievement,setCompletedRunAchievement] = useState(0);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/chart/stats", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let stats = res.data.stats;
        console.log(stats);
        setStats({
          distance: stats.sumDistance,
          duration: stats.sumDuration,
          avgRating: stats.avgRating,
          avgPulse: stats.avgPulse,
          activeGoals: stats.activeGoals,
        });
      })
      .catch((error) => {
        console.error("Error fetching pulse data:", error);
      });
  }, []);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/getFriends", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.friends;
        console.log(respone);
        setFriends(respone);
      })
      .catch((error) => {
        console.error("Error fetching friends data:", error);
      });
  }, []);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/getCompletedUserAchievements", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.achievements;
        console.log(respone);
        setCompletedRunAchievement(respone.length)
      })
      .catch((error) => {
        console.error("Error fetching achievements data:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-col 2xl:flex-row flex-grow bg-[#e9ecef] dark:bg-run-night-background">
      <div className="w-full 2xl:w-3/4  flex flex-col p-5  items-center">
        <div className="w-full m-5 flex justify-center items-center">
          <span className="text-2xl dark:text-white font-semibold">
            Personal stats
          </span>
        </div>
        <div className="flex flex-col 2xl:flex-row justify-between w-full gap-5">
          <SmallStatsPanel
            title="Total Kilometers"
            description={formattedData(stats.distance)}
            km
          />
          <SmallStatsPanel
            title="Total Time"
            description={formattedDuration(stats.duration)}
          />
          <SmallStatsPanel
            title="Avg. Rating"
            description={formattedData(stats.avgRating)}
          />
          <SmallStatsPanel title="Avg. Pulse" description={stats.avgPulse} />
        </div>
        <div className="w-full flex flex-col 2xl:flex-row justify-between m-5 gap-5">
          <ChartDuration />
          <ChartCategories />
        </div>
        <div className="flex flex-col 2xl:flex-row justify-between w-full gap-5">
          <SmallStatsPanel
            title="Active Goals"
            description={stats.activeGoals}
          />
          <SmallStatsPanel
            title="Last training"
            description="20:00 23-12-2024"
          />
          <SmallStatsPanel
          // run workouts
            title="Avg. Session Duration"
            description="02h 15min 23sec"
          />
          <SmallStatsPanel title="Finish Shared Achievements" description={completedRunAchievement} />
        </div>
      </div>

      <div className="w-full 2xl:w-1/4 flex flex-col">
        <div className="flex-grow m-10 ">
          <RunStatsProfile />
          <div className="bg-white dark:bg-run-night-element text-black dark:text-white flex flex-col rounded-2xl shadow-xl my-10 py-10 gap-2">
            <div className="flex flex-grow justify-evenly text-2xl font-semibold w-full">
              <span>Friends</span> <span>{userInfo.friends_count}</span>
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

export default RunStats;
