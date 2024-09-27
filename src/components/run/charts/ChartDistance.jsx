import { LineChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import { useTranslation } from "react-i18next";
import axios from "../../../config/axios";
import { format } from "date-fns";
import "react-toastify/dist/ReactToastify.css";

const ChartDistance = ({ friendId }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/chart/distance", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: friendId ? { friend_id: friendId } : {},
      })
      .then((res) => {
        let response = res.data.data;
        response.sort((a, b) => new Date(a.date) - new Date(b.date));

        const distanceData = response.map((item) => item.distance);
        const dateLabels = response.map((item) => {
          const date = new Date(item.date);
          const formattedDate = format(date, "dd/MM/yyyy");
          const formattedTime = format(date, "HH:mm");
          return `${formattedDate}\n${formattedTime}`;
        });

        setData(distanceData);
        setXLabels(dateLabels);
      })
      .catch((error) => {
        console.error("Error fetching distance data:", error);
      });
  }, []);

  return (
    <div className="bg-white text-black flex flex-col justify-center items-center rounded-2xl shadow-xl p-3 w-fit">
      <h2 className="text-center text-xl xl:text-2xl p-2">{t('run.chart.distanceTitle')}</h2>
      <LineChart
        width={window.innerWidth > 768 ? 500 : 300}
        height={300}
        series={[{ data: data, label: t('run.general.distance'), color: "#FF0000" }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </div>
  );
};

export default ChartDistance;
