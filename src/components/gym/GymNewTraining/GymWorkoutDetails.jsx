import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const GymWorkoutDetails = () => {
  const location = useLocation();
  const [selectedExercise, setSelectedExercise] = useState(0);
  const { selectedExercises = [] } = location.state || {};
  console.log(selectedExercises);

  return (
    <div className="w-full flex flex-grow flex-col items-center py-10 px-20 bg-[#e9ecef] dark:bg-run-night-background">
      <div className="w-fit flex text-2xl bg-white p-2 gap-5 rounded-tr-2xl rounded-tl-2xl shadow-xl">
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
                {exercise.name_exercise}
              </div>
            ))}
            <div
              key={-1}
              className={`cursor-pointer ${
                selectedExercise === -1 ? "text-pink-500" : "text-black"
              }`}
              onClick={() => setSelectedExercise(-1)}
            >
              Summary
            </div>
          </>
        )}
      </div>
      <div className="bg-white rounded-2xl shadow-xl flex justify-evenly flex-grow p-10 w-3/4">
        <table className="w-full bg-white text-2xl h-fit text-center rounded-lg outline-none border-none">
          <thead>
            <tr>
              <th>Reps</th>
              <th></th>
              <th>Weight</th>
              <th></th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  min={0}
                  type="number"
                  className="bg-[#e9ecef] outline-none w-40 p-2 rounded-2xl"
                />
              </td>
              <td>x</td>
              <td>
                <input
                  min={0}
                  type="number"
                  className="bg-[#e9ecef] outline-none w-40 p-2 rounded-2xl"
                />
              </td>
              <td>=</td>
              <td>210</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GymWorkoutDetails;
