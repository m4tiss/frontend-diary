import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ChartHeaviestWeight from "../charts/ChartHeaviestWeight";
import ChartMostReps from "../charts/ChartMostReps";

const GymRecords = () => {
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("Bench press");
  const { t } = useTranslation();

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

  const handleCategoryChange = (exercise) => {
    setSelectedExercise(exercise);
  };

  return (
    <div className="w-full flex flex-col 2xl:flex-row flex-grow justify-evenly items-center bg-[#e9ecef] dark:bg-run-night-background py-10 xl:py-0 gap-10 2xl:gap-0">
      <div className="flex flex-col justify-center items-center gap-10 relative w-[300px]">
        <h2 className="text-3xl dark:text-white">{t('gym.general.select')}</h2>
        <div className="bg-gray-200 text-black rounded  w-full max-h-40 2xl:max-h-96 overflow-y-auto">
          {availableExercises.map((exercise) => (
            <div
              key={exercise.gym_exercise_id}
              className={`p-2 cursor-pointer ${
                selectedExercise === exercise.name_exercise
                  ? "bg-pink-400 text-white"
                  : "hover:bg-gray-300"
              }`}
              onClick={() => handleCategoryChange(exercise.name_exercise)}
            >
              {t(`gym.exercises.${exercise.name_exercise}`)}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col xl:flex-row justify-between gap-10">
        <ChartHeaviestWeight name_exercise={selectedExercise} />
        <ChartMostReps name_exercise={selectedExercise} />
      </div>
    </div>
  );
};

export default GymRecords;
