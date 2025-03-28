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
  const [searchPattern, setSearchPattern] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExercisesPage, setSelectedExercisesPage] = useState(1);
  const exercisesPerPage = 6;

  const categories = [
    { name: "All", label: t("gym.categories.All") },
    { name: "Chest", label: t("gym.categories.Chest") },
    { name: "Back", label: t("gym.categories.Back") },
    { name: "Biceps", label: t("gym.categories.Biceps") },
    { name: "Triceps", label: t("gym.categories.Triceps") },
    { name: "Shoulders", label: t("gym.categories.Shoulders") },
    { name: "Abs", label: t("gym.categories.Abs") },
    { name: "Legs", label: t("gym.categories.Legs") },
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
    setSearchPattern("");
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

  const handleSearchChange = (e) => {
    setSearchPattern(e.target.value);
    setCurrentPage(1);
  };

  const filteredExercises = availableExercises.filter((exercise) =>
    exercise.name_exercise.toLowerCase().includes(searchPattern.toLowerCase())
  );

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = filteredExercises.slice(
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
    <div className="w-full flex flex-grow flex-col items-center xl:px-20 py-10 bg-[#e9ecef] dark:bg-run-night-background">
      <div className="w-full flex flex-col xl:flex-row justify-between h-fit gap-5">
        <div className="flex h-fit flex-row flex-wrap justify-center xl:justify-start gap-5">
          {categories.map((category) => (
            <GymFiltrationPanel
              key={category.name}
              title={category.label}
              selected={selectedCategory === category.name}
              onClick={() => handleCategoryClick(category.name)}
            />
          ))}
        </div>
        <div className="flex justify-center items-center">
          <input
            className="bg-white p-4 min-w-80 xl:min-w-96 text-xl rounded-full shadow-xl outline-none"
            type="text"
            placeholder={t("gym.newTraining.searchExercise")}
            value={searchPattern}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <h2 className="text-center xl:text-start text-black dark:text-white w-full text-xl py-5">
        {t("gym.newTraining.avaiableExercises")}
      </h2>

      <div className="flex w-full flex-col xl:flex-row items-center xl:justify-start gap-10">
        {currentExercises.length === 0 ? (
          <div className="w-full flex justify-center items-center text-black dark:text-white h-24 text-4xl">
            {t("gym.newTraining.noExercises")}
          </div>
        ) : (
          currentExercises.map((exercise) => (
            <GymExercisePanel
              height={24}
              key={exercise.gym_exercise_id}
              exercise={exercise}
              onClick={() => handleAddExercise(exercise)}
            />
          ))
        )}
      </div>

      <div className="flex w-full items-center justify-center xl:justify-between gap-10 xl:gap-0 py-10">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          {t("gym.general.previous")}
        </button>
        <span className="text-black dark:text-white">{`${t(
          "gym.general.page"
        )} ${currentPage} of ${Math.ceil(
          filteredExercises.length / exercisesPerPage
        )}`}</span>
        <button
          onClick={() => handlePageChange(1)}
          disabled={
            currentPage ===
            Math.ceil(filteredExercises.length / exercisesPerPage)
          }
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          {t("gym.general.next")}
        </button>
      </div>

      <h2 className="text-center xl:text-start text-black dark:text-white w-full text-xl py-10">
        {t("gym.newTraining.selectedExercises")}
      </h2>
      <div className="flex w-full flex-col xl:flex-row items-center xl:justify-start gap-10">
        {currentSelectedExercises.length === 0 ? (
          <div className="w-full flex justify-center items-center text-black dark:text-white h-24 text-4xl">
            {t("gym.newTraining.noExercises")}
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

      <div className="flex w-full items-center justify-center xl:justify-between gap-10 xl:gap-0 py-10">
        <button
          onClick={() => handleSelectedExercisesPageChange(-1)}
          disabled={selectedExercisesPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          {t("gym.general.previous")}
        </button>
        <span className="text-black dark:text-white">{`${t(
          "gym.general.page"
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
          {t("gym.general.next")}
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
        {t("gym.newTraining.nextStep")}
      </button>
    </div>
  );
};

export default GymQuickWorkout;
