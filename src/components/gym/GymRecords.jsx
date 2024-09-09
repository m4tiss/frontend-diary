import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart } from "@mui/x-charts/LineChart";
import ChartHeaviestWeight from "./charts/ChartHeaviestWeight";
import ChartMostReps from "./charts/ChartMostReps";

const GymRecords = () => {
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("Bench press");

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("gym/exercise/getExercises", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const response = res.data.exercises;
        console.log(response);
        setAvailableExercises(response);
      })
      .catch((error) => {
        console.error("Error fetching exercises data:", error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedExercise(e.target.value);
  };

  return (
    <div className="w-full flex flex-grow flex-col justify-evenly items-center bg-[#e9ecef] dark:bg-run-night-background">
      <div className="flex justify-center items-center gap-10">
        <select
          value={selectedExercise}
          onChange={handleCategoryChange}
          className="bg-run-night-element text-white p-2 rounded"
        >
          {availableExercises.map((exercise) => (
            <option
              key={exercise.gym_exercise_id}
              value={exercise.name_exercise}
            >
              {exercise.name_exercise}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between gap-10">
          <ChartHeaviestWeight name_exercise={selectedExercise}/>
          <ChartMostReps name_exercise={selectedExercise}/>
      </div>
    </div>
  );
};

export default GymRecords;
