import { BarChart } from "@mui/x-charts";
import { getAuthToken } from "../../../config/auth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "../../../config/axios";
import "react-toastify/dist/ReactToastify.css";

const ChartTrainings = ({ friendId }) => {
  const { t, i18n } = useTranslation();
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
      {
        name: t("shared.chart.run"),
        data: [],
        color: "#1DA1F2",
        label: t("shared.chart.run"),
      },
      {
        name: t("shared.chart.gym"),
        data: [],
        color: "#FF0000",
        label: t("shared.chart.gym"),
      },
    ],
  });

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/numberOfWorkouts", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: friendId ? { friend_id: friendId } : {},
      })
      .then((res) => {
        const response = res.data.data;

        const runData = response.run.map((item) => item.count);
        const gymData = response.gym.map((item) => item.count);
        const labels = response.run.map((item) =>
          new Date(item.month).toLocaleString(i18n.language, { month: "long" })
        );

        setChartData({
          xAxis: [
            {
              scaleType: "band",
              data: labels,
              label: t("shared.chart.months"),
               
            },
          ],
          yAxis: [{ label: t("shared.chart.trainings") }],
          series: [
            {
              name: t("shared.chart.run"),
              data: runData,
              color: "#1DA1F2",
              label: t("shared.chart.run"),
            },
            {
              name: t("shared.chart.gym"),
              data: gymData,
              color: "#FF0000",
              label: t("shared.chart.gym"),
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching trainings data:", error);
      });
  }, [friendId, t, i18n.language]);

  return (
    <div className="bg-white text-black flex flex-col justify-center items-center rounded-2xl shadow-xl p-3 w-fit">
      <h2 className="text-center text-xl xl:text-2xl p-2">{t('shared.chart.workouts')}</h2>
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
