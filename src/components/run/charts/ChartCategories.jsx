import React, { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import { useTranslation } from "react-i18next";
import axios from "../../../config/axios";
import { PieChart } from "@mui/x-charts";
import SyncLoader from "react-spinners/SyncLoader";
import dayjs from "dayjs";

const ChartCategories = ({ friendId, range = "all", startDate, endDate }) => {
  const { t } = useTranslation();
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        const res = await axios.get("/run/chart/categories", {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            friend_id: friendId || undefined,
            range: range,
            startDate: startDate
              ? dayjs(startDate).format("YYYY-MM-DD HH:mm")
              : undefined,
            endDate: endDate
              ? dayjs(endDate).format("YYYY-MM-DD HH:mm")
              : undefined,
          },
        });
        const categories = res.data.categories;
        setCategoriesData(categories);
      } catch (error) {
        console.error("Error fetching categories data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [friendId, range, startDate, endDate]);

  const transformDataForPieChart = () => {
    return categoriesData.map((category, index) => ({
      value: category.count,
      color: getCategoryColor(index),
      label: category.category_name,
    }));
  };

  const getCategoryColor = (index) => {
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10 bg-white rounded-xl w-full shadow-xl">
        <SyncLoader color="#36A2EB" size={20} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-white text-black rounded-xl w-full shadow-xl">
      <div className="text-center text-xl xl:text-2xl p-2">
        {t("run.chart.runTypesTitle")}
      </div>
      {categoriesData.length > 0 ? (
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
          width={window.innerWidth > 768 ? 500 : 300}
          height={window.innerWidth > 768 ? 200 : 100}
        />
      ) : (
        <div>{t("run.chart.noData")}</div>
      )}
    </div>
  );
};

export default ChartCategories;
