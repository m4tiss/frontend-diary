import { LineChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import { format } from "date-fns";
import SyncLoader from "react-spinners/SyncLoader";
import "react-toastify/dist/ReactToastify.css";

const ChartHeaviestWeight = ({ name_exercise }) => {
  const [data, setData] = useState([]);
  const [xLabels, setXLabels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestSet, setBestSet] = useState(null);

  useEffect(() => {
    const token = getAuthToken();

    axios
      .get("/gym/chart/heaviestWeight", {
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

        const weightsData = response.map((item) => ({
          weight: item.weight,
          reps: item.reps,
        }));

        const dateLabels = response.map((item) => {
          const date = new Date(item.date);
          const formattedDate = format(date, "dd/MM/yyyy");
          const formattedTime = format(date, "HH:mm");
          return `${formattedDate}\n${formattedTime}`;
        });

        setData(weightsData);
        setXLabels(dateLabels);
        const best = weightsData.reduce((prev, curr) => {
          if (curr.weight > prev.weight || (curr.weight === prev.weight && curr.reps > prev.reps)) {
            return curr;
          }
          return prev;
        }, { weight: 0, reps: 0 });

        setBestSet(best);
      })
      .catch((error) => {
        console.error("Error fetching heaviestWeight data:", error);
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
        <h2 className="text-2xl">Heaviest weight in set</h2>
        <LineChart
          width={window.innerWidth > 768 ? 500 : 300}
          height={300}
          series={[
            {
              data: data.map((item) => item.weight),
              label: "Weight",
              color: "#1DA1F2",
            },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          onMarkClick={handlePointClick}

        />
      </div>
      <div className="bg-white text-5xl shadow-2xl flex justify-center items-center p-3">
      {bestSet ? (
          <>
            <h2 className="font-bold">{bestSet.weight} kg&nbsp;</h2>
            <span>x {bestSet.reps}</span>
          </>
        ) : (
          "No Data"
        )}
      </div>
    </div>
  );
};

export default ChartHeaviestWeight;
