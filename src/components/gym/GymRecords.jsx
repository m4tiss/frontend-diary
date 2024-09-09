import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart } from "@mui/x-charts/LineChart";
import ChartHeaviestWeight from "./charts/ChartHeaviestWeight";

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
        <div className="flex flex-col gap-10">
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col items-center p-2">
            <h2 className="text-2xl">Most reps in set</h2>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              width={500}
              height={300}
            />
          </div>
          <div className="bg-white text-5xl shadow-2xl flex flex-col items-center p-3">
            70 kg x 12
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymRecords;
