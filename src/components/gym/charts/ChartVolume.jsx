import { LineChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import { format } from "date-fns";
import SyncLoader from "react-spinners/SyncLoader";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const ChartVolume = ({ friendId }) => {
  const [data, setData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/gym/chart/volume", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: friendId ? { friend_id: friendId } : {},
      })
      .then((res) => {
        let response = res.data.volume;
        console.log(response);
        response.sort((a, b) => new Date(a.date) - new Date(b.date));

        const distanceData = response.map((item) => item.totalVolume);
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
        console.error("Error fetching volume data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [friendId]);

  if (loading) {
    return (
      <div  className="flex flex-col justify-center items-center p-3 w-fit">
        <SyncLoader color="#000000" size={20} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <div className="bg-white text-black flex flex-col justify-center items-center rounded-2xl shadow-xl p-3 w-fit">
      <h2 className="text-center text-xl xl:text-2xl p-2">{t('gym.chart.volumeTitle')}</h2>
      <LineChart
        width={window.innerWidth > 768 ? 500 : 300}
        height={300}
        series={[{ data: data, label: t('gym.general.volume'), color: "#FF0000" }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </div>
  );
};

export default ChartVolume;
