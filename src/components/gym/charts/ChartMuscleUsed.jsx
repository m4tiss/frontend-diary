import React, { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import { PieChart } from "@mui/x-charts";
import SyncLoader from "react-spinners/SyncLoader";

const ChartMuscleUsed = ({ friendId }) => {
  const [categoriesData, setCategoriesData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        const res = await axios.get("/gym/chart/categories", {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: friendId ? { friend_id: friendId } : {},
        });
        setCategoriesData(res.data.categories || {});
        console.log(res.data.categories);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [friendId]);

  const transformDataForPieChart = () => {
    return Object.keys(categoriesData).map((category, index) => ({
      value: categoriesData[category].sets,
      color: getCategoryColor(index),
      label: `${category} (${categoriesData[category].percent}%)`,
    }));
  };

  const getCategoryColor = (index) => {
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 bg-white rounded-xl w-full shadow-xl">
        <SyncLoader color="#FF6384" size={20} aria-label="Loading Spinner" />
      </div>
    );
  }

  const isEmptyData = Object.keys(categoriesData).length === 0;

  return (
    <div className="flex flex-col items-center py-10 bg-white rounded-xl w-full shadow-xl">
      <div className="text-2xl p-2">Muscle Groups Used</div>
      {isEmptyData ? (
        <div>No data available</div>
      ) : (
        <PieChart
          colors={transformDataForPieChart().map((data) => data.color)}
          series={[
            {
              paddingAngle: 1,
              cornerRadius: 5,
              data: transformDataForPieChart(),
            },
          ]}
          width={window.innerWidth > 768 ? 500 : 300}
          height={window.innerWidth > 768 ? 200 : 100}
        />
      )}
    </div>
  );
};

export default ChartMuscleUsed;
