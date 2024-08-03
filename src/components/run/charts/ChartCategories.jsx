import React, { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import { PieChart } from "@mui/x-charts";

const ChartCategories = ({ friendId }) => {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/chart/categories", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: friendId ? { friend_id: friendId } : {},
      })
      .then((res) => {
        const categories = res.data.categories;
        setCategoriesData(categories);
      })
      .catch((error) => {
        console.error("Error fetching categories data:", error);
      });
  }, []);


  const transformDataForPieChart = () => {
    return categoriesData.map((category, index) => ({
      value: category.count,
      color: getCategoryColor(index), 
      label: category.category_name,
    }));
  };


  const getCategoryColor = (index) => {
    const colors = ["red", "blue", "green", "orange", "purple"]; 
    return colors[index % colors.length]; 
  };

  return (
    <div className="flex flex-col items-center py-10 2xl:py-0 bg-white rounded-xl w-full shadow-xl">
      <div className="text-2xl p-2">Categories</div>
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
    </div>
  );
};

export default ChartCategories;
