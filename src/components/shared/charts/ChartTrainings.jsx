import { BarChart } from "@mui/x-charts";
import { getAuthToken } from "../../../config/auth";
import { useEffect, useState } from "react";
import axios from "../../../config/axios";
import "react-toastify/dist/ReactToastify.css";

const ChartTrainings = () => {
  const [chartData, setChartData] = useState({
    xAxis: [
      {
        scaleType: "band",
        data: [],
        label: "Months",
      },
    ],
    yAxis: [{ label: "Trainings" }],
    series: [
      { name: "Run", data: [], color: "#1DA1F2", label: "Run" },
      { name: "Gym", data: [], color: "#FF0000", label: "Gym" },
    ],
  });

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/numberOfWorkouts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const response = res.data.data;

        const runData = response.run.map(item => item.count);
        const gymData = response.gym.map(item => item.count);
        const labels = response.run.map(item => new Date(item.month).toLocaleString('en-US', { month: 'long' }));

        setChartData({
          xAxis: [
            {
              scaleType: "band",
              data: labels,
              label: "Months",
            },
          ],
          yAxis: [{ label: "Trainings" }],
          series: [
            { name: "Run", data: runData, color: "#1DA1F2", label: "Run" },
            { name: "Gym", data: gymData, color: "#FF0000", label: "Gym" },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching trainings data:", error);
      });
  }, []);

  return (
    <div className=" dark:bg-run-night-element dark:text-white bg-white shadow-xl rounded-xl">
      <BarChart
        xAxis={chartData.xAxis}
        yAxis={chartData.yAxis}
        series={chartData.series}
        width={window.innerWidth > 768 ? 500 : 300}
        height={300}
      />
    </div>
  );
};

export default ChartTrainings;
