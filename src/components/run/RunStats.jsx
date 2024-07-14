import { useState, useEffect } from "react";
import { LineChart, BarChart, PieChart } from "@mui/x-charts";
import SmallStatsPanel from "../shared/SmallStatsPanel";
import RunStatsProfile from "../run/RunStatsProfile";
import FriendStatsPanel from "../shared/FriendStatsPanel";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import ChartCategories from './charts/ChartCategories'
import {
  formattedData,
  formattedDate,
  formattedTime,
  formattedDuration,
} from "../../functions/formatData";

const RunStats = () => {
  const GYM_COLOR = "#FF0000";

  const [stats, setStats] = useState({
    distance: 0.0,
    duration: "00:00:00",
    avgRating: 0.0,
    avgPulse: 0,
  });

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
        setStats({
          distance: stats.sumDistance,
          duration: stats.sumDuration,
          avgRating: stats.avgRating,
          avgPulse: stats.avgPulse,
        });
      })
      .catch((error) => {
        console.error("Error fetching pulse data:", error);
      });
  }, []);

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];
  return (
    <div className="w-full flex flex-grow bg-[#e9ecef] ">
      <div className="w-3/4  flex flex-col p-10 justify-center items-center flex-wrap h-fit">
        <div className="w-full m-5 flex justify-between items-center">
          <span className="text-2xl font-semibold">Personal stats</span>
          <div>
            <button className="border-2 p-2 rounded-2xl border-[#E73725] bg-[#E73725] mx-2 text-white shadow-xl">
              Week stats
            </button>
            <button className="border-2 p-2 rounded-2xl border-[#E73725] mx-2 shadow-xl">
              All stats
            </button>
          </div>
        </div>
        <div className="flex justify-between w-full gap-5">
          <SmallStatsPanel
            title="Kilometers"
            description={formattedData(stats.distance)}
            km
          />
          <SmallStatsPanel title="Time" description={stats.duration} />
          <SmallStatsPanel
            title="Average rating"
            description={formattedData(stats.avgRating)}
          />
          <SmallStatsPanel title="Average pulse" description={stats.avgPulse} />
        </div>
        <div className="w-full flex justify-between m-5 gap-5">
          <div className="items-center border-2  bg-white flex flex-col rounded-xl w-full shadow-xl">
            <div className="text-2xl p-2">Weekly volume</div>
            <LineChart
              width={500}
              height={300}
              series={[
                { data: pData, label: "pv", color: GYM_COLOR },
                { data: uData, label: "uv" },
              ]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
            />
          </div>
            <ChartCategories/>
        </div>
        <div className="flex justify-between bg-white rounded-xl w-full shadow-xl">
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            width={1000}
            height={300}
          />
        </div>
      </div>

      <div className="w-1/4 flex flex-col  ">
        <div className="flex-grow m-10 ">
          <RunStatsProfile />
          <div className="bg-white flex flex-col rounded-2xl shadow-xl my-10 gap-1">
            <div
              className="flex flex-grow justify-evenly text-2xl font-semibold my-10 
           w-full text-black"
            >
              <span>Friends</span> <span>243</span>
            </div>
            <FriendStatsPanel />
            <FriendStatsPanel />
            <FriendStatsPanel />
            <FriendStatsPanel />
            <FriendStatsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunStats;
