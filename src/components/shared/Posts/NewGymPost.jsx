import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import GymTrainingPanel from "../../gym/GymHistory/GymTrainingPanel";

const NewGymPost = ({ toggleGym, postAdded }) => {
  const { t } = useTranslation();
  const [workouts, setWorkouts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [textareaInput, setTextareaInput] = useState("");

  const sendPost = async () => {
    if (!selectedWorkout) {
      console.log("No workout selected");
      return;
    }

    if (!textareaInput.trim()) {
      console.log("Description cannot be empty");
      return;
    }

    try {
      const token = getAuthToken();
      const response = await axios.post(
        "/shared/post",
        {
          gym_workout_id: selectedWorkout,
          run_workout_id: null,
          description: textareaInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post added successfully:", response.data);
      postAdded()
      toggleGym()
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const fetchWorkouts = async (currentPage) => {
    const token = getAuthToken();
    try {
      const res = await axios.get("/gym/workout/all/pageable", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          page: currentPage,
        },
      });

      const response = res.data.workouts;
      setWorkouts((prevWorkouts) => [...prevWorkouts, ...response]);
      setHasMore(res.data.hasMore);
    } catch (error) {
      console.error("Error fetching gym workouts:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setWorkouts([]);
    fetchWorkouts(1); 
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchWorkouts(nextPage);
  };

  const handleWorkoutSelect = (workoutId) => {
    setSelectedWorkout((prevSelected) => (prevSelected === workoutId ? null : workoutId));
  };

  const handleTextareaChange = (e) => {
    setTextareaInput(e.target.value);
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleGym}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.2, opacity: 0 }}
        className="bg-[#e9ecef] flex flex-col items-center p-6 shadow-xl w-3/4 h-5/6 overflow-auto gap-10 xl:gap-5 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl">Dodaj post</h2>
          <div className="flex gap-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              onClick={sendPost}
              className="mt-4 px-4 py-2 h-fit shadow-xl bg-lime-500 text-white rounded"
            >
              {t("shared.actions.add")}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              onClick={toggleGym}
              className="mt-4 px-4 py-2 h-fit shadow-xl bg-purple-500 text-white rounded"
            >
              {t("shared.actions.close")}
            </motion.button>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl">Opis</h2>
          <textarea
            className="bg-white w-full h-20 rounded-xl p-3 outline-none text-xl"
            value={textareaInput}
            onChange={handleTextareaChange}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl">Wybierz trening</h2>
          <div className="flex justify-center flex-wrap">
            {workouts.map((workout) => (
              <div
                key={workout.workoutId}
                onClick={() => handleWorkoutSelect(workout.workoutId)}
                className={`${
                  selectedWorkout === workout.workoutId ? "bg-red-500" : ""
                }`}
              >
                <GymTrainingPanel
                  workout={workout}
                  showDetails={false}
                />
              </div>
            ))}
          </div>
          {hasMore && workouts.length > 0 && (
            <div className="w-full flex justify-center">
              <motion.button
                onClick={handleLoadMore}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="w-40 text-white p-3 rounded-xl shadow-xl text-xl mt-4"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
                }}
              >
                {t("gym.historyTraining.loadMore")}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default NewGymPost;
