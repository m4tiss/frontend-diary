import { useEffect, useState } from "react";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import GymFiltrationPanel from "./GymFiltrationPanel";
import GymExercisePanel from "./GymExercisePanel";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const GymQuickWorkout = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExercisesPage, setSelectedExercisesPage] = useState(1);
  const exercisesPerPage = 6;

  const categories = [
    "All",
    "Chest",
    "Back",
    "Biceps",
    "Triceps",
    "Shoulders",
    "Abs",
    "Legs",
  ];

  const navigate = useNavigate();

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
      if (
        prevSelected.some((e) => e.gym_exercise_id === exercise.gym_exercise_id)
      ) {
        return [...prevSelected];
      } else {
        return [...prevSelected, exercise];
      }
    });
  };

  const handleRemoveExercise = (exercise) => {
    setSelectedExercises((prevSelected) => {
      return prevSelected.filter(
        (e) => e.gym_exercise_id !== exercise.gym_exercise_id
      );
    });
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  const handleSelectedExercisesPageChange = (direction) => {
    setSelectedExercisesPage((prevPage) => prevPage + direction);
  };

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = availableExercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const indexOfLastSelectedExercise = selectedExercisesPage * exercisesPerPage;
  const indexOfFirstSelectedExercise =
    indexOfLastSelectedExercise - exercisesPerPage;
  const currentSelectedExercises = selectedExercises.slice(
    indexOfFirstSelectedExercise,
    indexOfLastSelectedExercise
  );

  return (
    <div className="w-full flex flex-grow flex-col items-center px-20 bg-[#e9ecef] dark:bg-run-night-background">
      <div className="w-full flex pt-10  justify-between h-fit gap-5">
        <div className="flex h-fit gap-5">
          {categories.map((category, index) => (
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
            className="bg-white p-4 w-96 text-xl rounded-full shadow-xl outline-none"
            type="text"
            placeholder={t("newTraining.searchExercise")}
            //value={searchPattern}
            //onChange={handleSearchChange}
          />
        </div>
      </div>
      <h2 className="text-black w-full text-xl justify-start py-5">
        {t("newTraining.avaiableExercises")}
      </h2>

      <div className="flex w-full justify-start gap-10">
        {currentExercises.map((exercise) => (
          <GymExercisePanel
            height={24}
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
          {t("general.previous")}
        </button>
        <span className="text-black">{`${t(
          "general.page"
        )} ${currentPage} of ${Math.ceil(
          availableExercises.length / exercisesPerPage
        )}`}</span>
        <button
          onClick={() => handlePageChange(1)}
          disabled={
            currentPage ===
            Math.ceil(availableExercises.length / exercisesPerPage)
          }
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          {t("general.next")}
        </button>
      </div>

      <h2 className="text-black w-full text-xl justify-start py-10">
        {t("newTraining.selectedExercises")}
      </h2>
      <div className="flex w-full justify-start gap-10">
        <div className="flex w-full justify-start gap-10">
          {currentSelectedExercises.length === 0 ? (
            <div className="w-full flex justify-center items-center text-black h-24 text-4xl">
              {t("newTraining.noExercises")}
            </div>
          ) : (
            currentSelectedExercises.map((exercise) => (
              <GymExercisePanel
                height={24}
                key={exercise.gym_exercise_id}
                exercise={exercise}
                onClick={() => handleRemoveExercise(exercise)}
              />
            ))
          )}
        </div>
      </div>

      <div className="flex w-full justify-between py-10">
        <button
          onClick={() => handleSelectedExercisesPageChange(-1)}
          disabled={selectedExercisesPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          {t("general.previous")}
        </button>
        <span className="text-black">{`${t(
          "general.page"
        )} ${selectedExercisesPage} of ${Math.ceil(
          selectedExercises.length / exercisesPerPage
        )}`}</span>
        <button
          onClick={() => handleSelectedExercisesPageChange(1)}
          disabled={
            selectedExercisesPage ===
              Math.ceil(selectedExercises.length / exercisesPerPage) ||
            selectedExercises.length === 0
          }
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          {t("general.next")}
        </button>
      </div>

      <button
        onClick={() =>
          navigate("/gym/workoutDetails", {
            state: { selectedExercises, planName: "QUICK WORKOUT" },
          })
        }
        disabled={selectedExercises.length === 0}
        className={`px-16 py-3 rounded-2xl bg-lime-500 text-white ${
          selectedExercises.length === 0 ? `opacity-50` : `opacity-100`
        } `}
      >
        {t("newTraining.nextStep")}
      </button>
    </div>
  );
};

export default GymQuickWorkout;
