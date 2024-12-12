import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GymSummaryPanel from "./GymSummaryPanel";
import { useTranslation } from "react-i18next";

const GymWorkoutDetails = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { selectedExercises, planName } = location.state || {};
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    const initialData = selectedExercises.map((exercise) => ({
      gym_exercise_id: exercise.gym_exercise_id,
      name_exercise: exercise.name_exercise,
      sets: [
        { reps: 0, weight: 0 },
        { reps: 0, weight: 0 },
        { reps: 0, weight: 0 },
      ],
    }));
    setWorkoutData(initialData);
  }, [selectedExercises]);

  const [selectedExercise, setSelectedExercise] = useState(0);

  const handleInputChange = (setIndex, field, value) => {
    setWorkoutData((prevData) => {
      const updatedData = [...prevData];
      updatedData[selectedExercise].sets[setIndex][field] = parseFloat(value);
      return updatedData;
    });
  };

  const handleAddSet = () => {
    setWorkoutData((prevData) => {
      const updatedData = [...prevData];
      updatedData[selectedExercise].sets.push({ reps: 0, weight: 0 });
      return updatedData;
    });
  };

  const handleRemoveSet = () => {
    setWorkoutData((prevData) => {
      const updatedData = [...prevData];
      if (updatedData[selectedExercise].sets.length > 1) {
        updatedData[selectedExercise].sets.pop();
      }
      return updatedData;
    });
  };

  const currentExercise = workoutData[selectedExercise];

  return (
    <div className="w-full flex flex-grow flex-col items-center py-10 xl:px-20 bg-[#e9ecef] dark:bg-run-night-background gap-10 xl:gap-0">
<div
  className="flex flex-col xl:fixed xl:left-0 xl:top-20 xl:pr-14 xl:h-screen text-2xl xl:w-[600px] bg-white p-3 xl:p-5 gap-5 shadow-xl xl:ml-[-560px] hover:ml-0 duration-300"
>
  <div className="absolute top-0 right-0 p-3">☰</div>
  {selectedExercises.length === 0 ? (
    <div className="text-red-500 text-lg">No exercises to display.</div>
  ) : (
    <>
      {selectedExercises.map((exercise, index) => (
        <div
          key={exercise.gym_exercise_id}
          className={`cursor-pointer ${
            selectedExercise === index ? "text-pink-500" : "text-black"
          }`}
          onClick={() => setSelectedExercise(index)}
        >
          {t(`gym.exercises.${exercise.name_exercise}`)}
        </div>
      ))}
      <div
        key="summary"
        className={`cursor-pointer ${
          selectedExercise === -1 ? "text-pink-500" : "text-black"
        }`}
        onClick={() => setSelectedExercise(-1)}
      >
        {t("gym.newTraining.summary")}
      </div>
    </>
  )}
</div>

      <div className="bg-white rounded-2xl shadow-xl flex flex-col justify-evenly items-center flex-grow p-10 w-3/4">
        {currentExercise ? (
          <>
          <div className="flex justify-center items-center w-full text-center text-xl xl:text-4xl text-semibold">{t(`gym.exercises.${currentExercise.name_exercise}`)}</div>
            <table className="w-full bg-white text-lg xl:text-2xl h-fit text-center rounded-lg outline-none border-none">
              <thead>
                <tr>
                  <th>{t("gym.general.reps")}</th>
                  <th></th>
                  <th>{t("gym.general.weight")}</th>
                  <th></th>
                  <th>{t("gym.general.volume")}</th>
                </tr>
              </thead>
              <tbody>
                {currentExercise.sets.map((set, setIndex) => (
                  <tr key={setIndex}>
                    <td>
                      <input
                        min={0}
                        type="number"
                        step="1"
                        className="bg-[#e9ecef] outline-none w-16 xl:w-40 p-2 rounded-2xl"
                        value={set.reps}
                        onChange={(e) =>
                          handleInputChange(setIndex, "reps", e.target.value)
                        }
                      />
                    </td>
                    <td>x</td>
                    <td>
                      <input
                        min={0}
                        type="number"
                        step="0.1"
                        className="bg-[#e9ecef] outline-none w-16 xl:w-40 p-2 rounded-2xl"
                        value={set.weight}
                        onChange={(e) =>
                          handleInputChange(setIndex, "weight", e.target.value)
                        }
                      />
                    </td>
                    <td>=</td>
                    <td>{set.reps * set.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-full text-white text-md xl:text-xl flex justify-evenly mt-4">
              <button
                className="bg-red-500 p-2 rounded-2xl"
                onClick={handleRemoveSet}
              >
                {t("gym.newTraining.removeSet")}
              </button>
              <button
                className="bg-pink-500 p-2 rounded-2xl"
                onClick={handleAddSet}
              >
                {t("gym.newTraining.addSet")}
              </button>
            </div>
          </>
        ) : (
          <GymSummaryPanel workoutData={workoutData} planName={planName} />
        )}
      </div>
    </div>
  );
};

export default GymWorkoutDetails;
