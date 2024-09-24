import { BarChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import { useTranslation } from "react-i18next";
import axios from "../../../config/axios";
import SyncLoader from "react-spinners/SyncLoader";
import "react-toastify/dist/ReactToastify.css";

const ChartRating = ({ friendId }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/chart/rating", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: friendId ? { friend_id: friendId } : {},
      })
      .then((res) => {
        let response = res.data.data;

        const formattedData = response.map((item) => ({
          bin: item.bin,
          count: item.count,
        }));

        setData(formattedData);
        console.log(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching sets data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [friendId]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center p-3 w-fit">
        <SyncLoader color="#000000" size={20} aria-label="Loading Spinner" />
      </div>
    );
  }

  const xData = data.map((item) => item.bin);
  const yData = data.map((item) => item.count);

  return (
    <div className="bg-white flex flex-col justify-center items-center rounded-2xl shadow-xl p-3 w-fit">
      <h2 className="text-center text-xl xl:text-2xl p-2">{t('run.chart.ratingTitle')}</h2>
      <BarChart
        color={"#FBC814"}
        xAxis={[{ scaleType: "band", data: xData }]}
        series={[
            { data: yData, color: "#FBC814" },
          ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default ChartRating;
