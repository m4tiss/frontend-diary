import { useEffect, useState } from "react";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import GymFiltrationPanel from "./GymFiltrationPanel";
import GymExercisePanel from "./GymExercisePanel";

const GymQuickWorkout = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 6;

  const categories = ["All", "Chest", "Back", "Biceps", "Triceps","Shoulders","Abs","Legs"];

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get(`gym/exercise/getExercises`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        params:
          selectedCategory === "All" ? {} : { category_name: selectedCategory },
      })
      .then((res) => {
        const response = res.data.exercises;
        console.log(response);
        setAvailableExercises(response);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error("Error fetching Exercises data:", error);
      });
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddExercise = (exercise) => {
    setSelectedExercises((prevSelected) => {
      if (prevSelected.includes(exercise)) {
        return [...prevSelected];
      } else {
        return [...prevSelected, exercise];
      }
    });
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = availableExercises.slice(indexOfFirstExercise, indexOfLastExercise);

  return (
    <div className="w-full flex flex-grow flex-col items-center px-20 bg-[#e9ecef] dark:bg-run-night-background">
      <div className="w-full flex py-20 justify-between h-fit gap-5">
        <div className="flex h-fit gap-5">
        {categories.map((category,index) => (
          <GymFiltrationPanel
            key={index}
            title={category}
            selected={selectedCategory === category}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
        </div>
        <div>
        <input
          className="bg-white p-2 w-96 text-2xl rounded-full shadow-xl outline-none"
          type="text"
          placeholder="Search exercise"
          //value={searchPattern}
          //onChange={handleSearchChange}
        />
        </div>

      </div>

      <div className="flex w-full justify-start gap-10">
        {currentExercises.map((exercise) => (
          <GymExercisePanel
            key={exercise.gym_exercise_id}
            exercise={exercise}
            onClick={() => handleAddExercise(exercise)}
          />
        ))}
      </div>

      <div className="flex w-full justify-between py-10">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-black">{`Page ${currentPage} of ${Math.ceil(availableExercises.length / exercisesPerPage)}`}</span>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === Math.ceil(availableExercises.length / exercisesPerPage)}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <h2 className="text-black w-full text-xl justify-start py-10">
        Selected Exercises
      </h2>
      <div className="flex w-full justify-start gap-10">
        {selectedExercises.map((exercise) => (
          <GymExercisePanel key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default GymQuickWorkout;
