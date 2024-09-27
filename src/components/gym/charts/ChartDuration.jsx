import { LineChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

const convertDurationToSeconds = (duration) => {
  const [hours, minutes, seconds] = duration.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const convertSecondsToDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
};

const ChartDuration = ({ friendId }) => {
  const [data, setData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/gym/chart/duration", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: friendId ? { friend_id: friendId } : {},
      })
      .then((res) => {
        let response = res.data.data;
        //console.log("API Response:", response); // Debug
        response.sort((a, b) => new Date(a.date) - new Date(b.date));

        const durationData = response.map((item) => {
          const seconds = convertDurationToSeconds(item.duration);
          //console.log("Converted to seconds:", seconds); // Debug
          return seconds;
        });

        const dateLabels = response.map((item) => {
          const date = new Date(item.date);
          const formattedDate = format(date, "dd/MM/yyyy");
          const formattedTime = format(date, "HH:mm");
          return `${formattedDate}\n${formattedTime}`;
        });

        setData(durationData);
        setXLabels(dateLabels);
       // console.log("Duration Data:", durationData);
        //console.log("Date Labels:", dateLabels);
      })
      .catch((error) => {
        console.error("Error fetching duration data:", error);
      });
  }, [friendId]);

  return (
    <div className="bg-white text-black flex flex-col justify-center items-center rounded-2xl shadow-xl p-3 w-full">
      <h2 className="text-center text-xl xl:text-2xl  p-2">{t('gym.chart.durationTitle')}</h2>
      <LineChart
        width={window.innerWidth > 768 ? 500 : 300}
        height={300}
        series={[{ data: data, label: t('gym.general.duration'), color: "#FF0000" }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
        yAxis={[{
          scaleType: "linear",
          valueFormatter: (value) => convertSecondsToDuration(value),
        }]}
        // tooltip={{
        //   valueFormatter: (params) => {
        //     const value = params.value;
        //     return convertSecondsToDuration(value);
        //   },
        // }}
      />
    </div>
  );
};

export default ChartDuration;
