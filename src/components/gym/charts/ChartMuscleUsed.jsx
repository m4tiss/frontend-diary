import React, { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import { PieChart } from "@mui/x-charts";

const ChartMuscleUsed = ({ friendId }) => {
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/gym/chart/categories", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: friendId ? { friend_id: friendId } : {},
      })
      .then((res) => {
        const response = res.data.categories;
        console.log(response)
        setCategoriesData(response);
      })
      .catch((error) => {
        console.error("Error fetching categories data:", error);
      });
  }, [friendId]);


  const transformDataForPieChart = () => {
    return Object.keys(categoriesData).map((category, index) => ({
      value: categoriesData[category].sets,
      color: getCategoryColor(index), 
      label: `${category} (${categoriesData[category].percent})`,
    }));
  };


  const getCategoryColor = (index) => {
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]; 
    return colors[index % colors.length]; 
  };

  return (
    <div className="flex flex-col items-center py-10 bg-white rounded-xl w-full shadow-xl">
      <div className="text-2xl p-2">Muscle Groups Used</div>
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

export default ChartMuscleUsed;
