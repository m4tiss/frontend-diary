import { LineChart, BarChart, PieChart } from "@mui/x-charts";
import SmallStatsPanel from "../shared/SmallStatsPanel";
import GymStatsProfile from "./GymStatsProfile";
import FriendStatsPanel from "../shared/FriendStatsPanel";
import ChartMuscleUsed from "./charts/ChartMuscleUsed";

const StatsGym = () => {
  const GYM_COLOR = "#FF0000";
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
        <div className="w-full m-5 flex justify-center items-center">
          <span className="text-2xl font-semibold">Personal stats</span>
        </div>
        <div className="flex justify-between w-full gap-5">
          <SmallStatsPanel title="Volume"  description="400kg"/> 
          <SmallStatsPanel title="Trainings"  description="12" /> 
          <SmallStatsPanel title="Reps"  description="432" />
          <SmallStatsPanel title="Time"  description="2h 30 min" />
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
            <ChartMuscleUsed/>
        </div>
      </div>

      <div className="w-1/4 flex flex-col  ">
        <div className="flex-grow m-10 ">
          <GymStatsProfile />
          <div className="bg-white flex flex-col rounded-2xl shadow-xl my-10 gap-1">
            <div
              className="flex flex-grow justify-evenly text-2xl font-semibold my-10 
           w-full text-black"
            >
              <span>Friends</span> <span>243</span>
            </div>
            {/* <FriendStatsPanel />
            <FriendStatsPanel />
            <FriendStatsPanel />
            <FriendStatsPanel />
            <FriendStatsPanel /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsGym;
