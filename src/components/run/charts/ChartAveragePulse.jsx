import { LineChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import { useTranslation } from "react-i18next";
import axios from "../../../config/axios";
import { format } from "date-fns";
import SyncLoader from "react-spinners/SyncLoader";
import "react-toastify/dist/ReactToastify.css";

const ChartAveragePulse = ({ friendId }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        const res = await axios.get("/run/chart/averagePulse", {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: friendId ? { friend_id: friendId } : {},
        });

        const response = res.data.data;
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
      } catch (error) {
        console.error("Error fetching pulse data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [friendId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 bg-white rounded-xl w-full shadow-xl">
        <SyncLoader color="#36A2EB" size={20} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <div className="bg-white flex flex-col justify-center items-center rounded-2xl shadow-xl p-3 w-fit">
      <h2 className="text-center text-xl xl:text-2xl p-2">
        {t("run.chart.averagePulseTitle")}
      </h2>
      {data.length > 0 ? (
        <LineChart
          width={window.innerWidth > 768 ? 500 : 300}
          height={300}
          series={[
            {
              data: data,
              label: t("run.general.averagePulse"),
              color: "#1DA1F2",
            },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      ) : (
        <div>{t("run.chart.noData")}</div>
      )}
    </div>
  );
};

export default ChartAveragePulse;
