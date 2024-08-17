import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import GymSummaryPanel from './GymSummaryPanel'

const GymWorkoutDetails = () => {
  const location = useLocation();
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
    console.log(selectedExercises)
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
              key="summary"
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
      <div className="bg-white rounded-2xl shadow-xl flex flex-col justify-evenly flex-grow p-10 w-3/4">
        {currentExercise ? (
          <>
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
                {currentExercise.sets.map((set, setIndex) => (
                  <tr key={setIndex}>
                    <td>
                      <input
                        min={0}
                        type="number"
                        step="1"
                        className="bg-[#e9ecef] outline-none w-40 p-2 rounded-2xl"
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
                        className="bg-[#e9ecef] outline-none w-40 p-2 rounded-2xl"
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
            <div className="w-full text-white text-xl flex justify-evenly mt-4">
              <button
                className="bg-red-500 p-2 rounded-2xl"
                onClick={handleRemoveSet}
              >
                Remove set
              </button>
              <button
                className="bg-pink-500 p-2 rounded-2xl"
                onClick={handleAddSet}
              >
                Add set
              </button>
            </div>
          </>
        ) : (
            <GymSummaryPanel workoutData={workoutData} planName={planName}/>
        )}
      </div>
    </div>
  );
};

export default GymWorkoutDetails;
