import { useState, useEffect } from "react";
import { LineChart, BarChart, PieChart } from "@mui/x-charts";
import SmallStatsPanel from "../shared/SmallStatsPanel";
import GymStatsProfile from "./GymStatsProfile";
import FriendStatsPanel from "../shared/FriendStatsPanel";
import ChartMuscleUsed from "./charts/ChartMuscleUsed";
import { useUser } from "../../providers/UserProvider";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import ChartDuration from "./charts/ChartDuration";
import { formattedDuration } from "../../functions/formatData";

const StatsGym = () => {
  const { userInfo } = useUser();
  const [friends, setFriends] = useState([]);

  const [stats, setStats] = useState({
    totalVolume: 0.0,
    totalDuration: "00:00:00",
    avgRating: 0.0,
    totalSets: 0,
    workoutSessions: 0,
  });

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/gym/chart/stats", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let stats = res.data.stats;
        console.log(stats)
        setStats({
          totalVolume: stats.totalVolume,
          totalDuration: stats.totalDuration,
          avgRating: stats.avgRating,
          totalSets: stats.totalSets,
          workoutSessions: stats.workoutSessions,
        });
      })
      .catch((error) => {
        console.error("Error fetching stats data:", error);
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

  return (
    <div className="w-full flex flex-grow bg-[#e9ecef] ">
      <div className="w-3/4  flex flex-col p-10 justify-center items-center flex-wrap h-fit">
        <div className="w-full m-5 flex justify-center items-center">
          <span className="text-2xl font-semibold">Personal stats</span>
        </div>
        <div className="flex justify-between w-full gap-5">
          <SmallStatsPanel title="Total Volume" description={stats.totalVolume + " kg"} />
          <SmallStatsPanel title="Workout Sessions" description={stats.workoutSessions} />
          <SmallStatsPanel title="Total Sets" description={stats.totalSets} />
          <SmallStatsPanel title="Total Time" description={formattedDuration(stats.totalDuration)} />
        </div>
        <div className="w-full flex justify-between m-5 gap-5">
          <ChartDuration />
          <ChartMuscleUsed />
        </div>
        <div className="flex justify-between w-full gap-5">
          <SmallStatsPanel title="Volume" description="400kg" />
          <SmallStatsPanel title="Trainings" description="12" />
          <SmallStatsPanel title="Reps" description="432" />
          <SmallStatsPanel title="Time" description="2h 30 min" />
        </div>
      </div>

      <div className="w-1/4 flex flex-col  ">
        <div className="flex-grow m-10 ">
          <GymStatsProfile />
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

export default StatsGym;
