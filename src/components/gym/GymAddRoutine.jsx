import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import { getAuthToken } from "../../config/auth";
import { useTranslation } from "react-i18next";
import GymExercisePanel from "./GymNewTraining/GymExercisePanel";
import GymFiltrationPanel from "./GymNewTraining/GymFiltrationPanel";
import axios from "../../config/axios";
import "react-toastify/dist/ReactToastify.css";

const GymAddRoutine = ({ toggleRoutineDialog, successRoutineDialog }) => {
  const { t } = useTranslation();
  const [routineName, setRoutineName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [availableExercises, setAvailableExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedExercisesPage, setSelectedExercisesPage] = useState(1);
  const [searchPattern, setSearchPattern] = useState("");
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

  const filteredExercises = availableExercises.filter((exercise) =>
    exercise.name_exercise.toLowerCase().includes(searchPattern.toLowerCase())
  );

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

  const handleSubmit = async () => {
    if (!routineName) {
      toast.error("Routine name must be filled");
      return;
    }

    const exercises = selectedExercises.map((exercise) => exercise.name_exercise);
    try {
      const token = getAuthToken();
      const response = await axios.post(
        "/gym/routine",
        { routine_name: routineName, exercises: exercises },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      successRoutineDialog();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleRoutineDialog}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.2, opacity: 0 }}
        className="bg-white flex flex-col rounded-xl p-6 mx-10 shadow-xl w-full h-5/6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between">
          <div className="text-3xl">{t('gym.routine.newRoutine')}</div>

          <div className="flex flex-col justify-center items-center">
            <label>{t('gym.routine.name')}</label>
            <input
              className="bg-[#e9ecef] p-3 w-96 text-lg rounded-full outline-none"
              type="text"
              placeholder={t('gym.routine.name')}
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
            />
          </div>

          <div className="flex gap-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              onClick={toggleRoutineDialog}
              className="mt-4 px-4 py-2 h-fit shadow-xl bg-purple-500 text-white rounded"
            >
              {t('shared.actions.close')}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 h-fit shadow-xl bg-lime-500 text-white rounded"
            >
              {t('gym.routine.save')}
            </motion.button>
          </div>
        </div>

        <div className="w-full flex pt-10 justify-between h-fit gap-5">
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
              placeholder= {t('gym.routine.searchExercise')}
              value={searchPattern} 
              onChange={(e) => setSearchPattern(e.target.value)}
            />
          </div>
        </div>

        <h2 className="text-black w-full text-xl justify-start py-5">
        {t('gym.routine.avaiableExercises')}
        </h2>

        <div className="flex w-full justify-start gap-10">
        {currentExercises.length === 0 ? (
              <div className="w-full flex justify-center items-center text-black h-20 text-2xl">
                 {t('gym.routine.noExercises')}
              </div>
            ) : (
                currentExercises.map((exercise) => (
                <GymExercisePanel
                  height={20}
                  key={exercise.gym_exercise_id}
                  exercise={exercise}
                  onClick={() => handleAddExercise(exercise)}
                />
              ))
            )}
        </div>

        <div className="flex w-full justify-between py-10">
          <button
            onClick={() => handlePageChange(-1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
            {t('gym.general.previous')}
          </button>
          <span className="text-black">{`${t('gym.general.page')} ${currentPage} of ${Math.ceil(
            filteredExercises.length / exercisesPerPage
          )}`}</span>
          <button
            onClick={() => handlePageChange(1)}
            disabled={
              currentPage === Math.ceil(filteredExercises.length / exercisesPerPage)
            }
            className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
          >
           {t('gym.general.next')}
          </button>
        </div>

        <h2 className="text-black w-full text-xl justify-start py-10">
        {t('gym.routine.selectedExercises')}
        </h2>
        <div className="flex w-full justify-start gap-10">
          <div className="flex w-full justify-start gap-10">
            {currentSelectedExercises.length === 0 ? (
              <div className="w-full flex justify-center items-center text-black h-20 text-2xl">
               {t('gym.routine.noExercises')}
              </div>
            ) : (
              currentSelectedExercises.map((exercise) => (
                <GymExercisePanel
                  height={20}
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
           {t('gym.general.previous')}
          </button>
          <span className="text-black">{`${t('gym.general.page')} ${selectedExercisesPage} of ${Math.ceil(
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
            {t('gym.general.next')}
          </button>
        </div>
        <ToastContainer />
      </motion.div>
    </div>,
    document.body
  );
};

export default GymAddRoutine;
