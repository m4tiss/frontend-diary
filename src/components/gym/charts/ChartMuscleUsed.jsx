import React, { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import { PieChart } from "@mui/x-charts";
import SyncLoader from "react-spinners/SyncLoader";
import DarkModeContext from "../../../providers/DarkModeProvider";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const ChartMuscleUsed = ({ friendId, range = "all" }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [categoriesData, setCategoriesData] = useState({});
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        const res = await axios.get("/gym/chart/categories", {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            friend_id: friendId || undefined,
            range: range,
          },
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
  }, [friendId, range]);

  const transformDataForPieChart = () => {
    return Object.keys(categoriesData).map((category, index) => ({
      value: categoriesData[category].sets,
      color: getCategoryColor(index),
      label: `${category} (${categoriesData[category].percent})`,
    }));
  };

  const getCategoryColor = (index) => {
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#ff5e4e",
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 bg-white rounded-xl w-full shadow-xl">
        <SyncLoader
          color={darkMode ? "#FFFFFF" : "#000000"}
          size={20}
          aria-label="Loading Spinner"
        />
      </div>
    );
  }

  const isEmptyData = Object.keys(categoriesData).length === 0;

  return (
    <div className="flex flex-col items-center py-10 bg-white text-black rounded-xl w-full shadow-xl">
      <div className="text-center text-xl xl:text-2xl p-2">
        {t("gym.chart.muscleUsed")}
      </div>
      {isEmptyData ? (
        <div>{t("gym.chart.noData")}</div>
      ) : (
        <PieChart
          colors={transformDataForPieChart().map((data) => data.color)}
          series={[
            {
              paddingAngle: 1,
              cornerRadius: 5,
              data: transformDataForPieChart(),
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          width={window.innerWidth > 768 ? 550 : 300}
          height={window.innerWidth > 768 ? 200 : 100}
        />
      )}
    </div>
  );
};

export default ChartMuscleUsed;
