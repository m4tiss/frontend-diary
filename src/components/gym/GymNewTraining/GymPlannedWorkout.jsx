import { useEffect, useState } from "react";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useNavigate } from "react-router-dom";

const GymPlannedWorkout = () => {
  const [chosenPlan, setChosenPlan] = useState(null);
  const [routines, setRoutines] = useState([]);
  const navigate = useNavigate();

  const handleDivClick = (plan) => {
    setChosenPlan(plan);
  };

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get(`gym/routine/all`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const response = res.data.routines;
        setRoutines(response);
      })
      .catch((error) => {
        console.error("Error fetching routine data:", error);
      });
  }, []);

  const handleSubmit = async () => {
    const token = getAuthToken();
    try {
      const res = await axios.get(`gym/routine/exercises`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: { gym_routine_id: chosenPlan.gym_routine_id },
      });

      const response = res.data.exercises;
      navigate("/gym/workoutDetails", {
        state: {
          selectedExercises: response,
          planName: chosenPlan.name_routine,
        },
      });
    } catch (error) {
      console.error("Error fetching exercises data:", error);
    }
  };

  return (
    <div className="w-full flex flex-grow flex-col 2xl:flex-row justify-center bg-[#e9ecef] dark:bg-run-night-background">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-5xl my-10 font-semibold">Planned Workout</h2>
        {routines.map((routine) => (
          <div
            key={routine.gym_routine_id}
            onClick={() => handleDivClick(routine)}
            className={`${chosenPlan === routine ? "bg-red-500" : "bg-white"}
          ${chosenPlan === routine ? "text-white" : "text-black"}
           text-2xl shadow-2xl rounded-xl w-96 p-2 my-3 cursor-pointer`}
          >
            {routine.name_routine}
          </div>
        ))}
        <button
          disabled={routines.length === 0}
          onClick={handleSubmit}
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
          }}
          className={`text-2xl shadow-2xl text-white hover:scale-110 rounded-xl w-96 p-2 my-3 duration-200
        ${routines.length === 0 ? "opacity-50" : "opacity-100"}
        `}
        >
          Do training
        </button>
      </div>
    </div>
  );
};

export default GymPlannedWorkout;
