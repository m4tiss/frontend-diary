import { LineChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import { format } from "date-fns";
import SyncLoader from "react-spinners/SyncLoader";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";

const ChartMostReps = ({ name_exercise }) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestSet, setBestSet] = useState(null);

  useEffect(() => {
    const token = getAuthToken();

    axios
      .get("/gym/chart/mostReps", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          name_exercise: name_exercise,
        },
      })
      .then((res) => {
        let response = res.data.data;
        console.log(response);

        response.sort((a, b) => new Date(a.date) - new Date(b.date));

        const repsData = response.map((item) => ({
          weight: item.weight,
          reps: item.reps,
        }));

        const dateLabels = response.map((item) => {
          const date = new Date(item.date);
          return `${format(date, "dd/MM/yyyy")}\n${format(date, "HH:mm")}`;
        });

        setData(repsData);
        setXLabels(dateLabels);

        const best = repsData.reduce(
          (prev, curr) => {
            if (
              curr.reps > prev.reps ||
              (curr.reps === prev.reps && curr.weight > prev.weight)
            ) {
              return curr;
            }
            return prev;
          },
          { weight: 0, reps: 0 }
        );

        setBestSet(best);
      })
      .catch((error) => {
        console.error("Error fetching mostReps data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name_exercise]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center p-3 w-fit">
        <SyncLoader color="#000000" size={20} aria-label="Loading Spinner" />
      </div>
    );
  }

  const handlePointClick = (event, point) => {
    const selectedData = data[point.dataIndex];
    setBestSet(selectedData);
  }; 

  return (
    <div className="flex flex-col gap-10">
      <div className="bg-white flex flex-col justify-center items-center rounded-2xl shadow-xl p-3 w-fit">
        <h2 className="text-2xl">{t('chart.mostReps')}</h2>
        <LineChart
          width={window.innerWidth > 768 ? 500 : 300}
          height={300}
          series={[
            {
              data: data.map((item) => item.reps),
              label: t('general.reps'),
              color: "#A020F0",
            },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          onMarkClick={handlePointClick}
          />
      </div>
      <div className="bg-white text-5xl shadow-2xl flex justify-center items-center p-3">
        {bestSet ? (
          <>
            <span>{bestSet.weight} kg x&nbsp;</span>
            <h2 className="font-bold">{bestSet.reps}</h2>
          </>
        ) : (
          "No Data"
        )}
      </div>
    </div>
  );
};

export default ChartMostReps;
