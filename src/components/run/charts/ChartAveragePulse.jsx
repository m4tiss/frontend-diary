import { LineChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import { format } from "date-fns";
import "react-toastify/dist/ReactToastify.css";

const ChartAveragePulse = ({ friendId }) => {
  const [data, setData] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/chart/averagePulse", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: friendId ? { friend_id: friendId } : {},
      })
      .then((res) => {
        let response = res.data.data;
        console.log(response);
        response.sort((a, b) => new Date(a.date) - new Date(b.date));

        const pulseData = response.map((item) => item.average_pulse);
        const dateLabels = response.map((item) => {
          const date = new Date(item.date);
          const formattedDate = format(date, "dd/MM/yyyy");
          const formattedTime = format(date, "HH:mm");
          return `${formattedDate}\n${formattedTime}`;
        });

        setData(pulseData);
        setXLabels(dateLabels);
      })
      .catch((error) => {
        console.error("Error fetching pulse data:", error);
      });
  }, []);

  return (
    <div className="bg-white flex flex-col justify-center items-center rounded-2xl shadow-xl p-3 w-fit">
      <h2 className="text-2xl p-2">Last training average pulse</h2>
      <LineChart
        width={window.innerWidth > 768 ? 500 : 300}
        height={300}
        series={[{ data: data, label: "Average Pulse", color: "#1DA1F2" }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </div>
  );
};

export default ChartAveragePulse;
