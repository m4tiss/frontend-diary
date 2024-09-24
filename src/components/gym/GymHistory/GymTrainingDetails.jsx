import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import axios from "../../../config/axios";
import ReactStars from "react-stars";
import { useTranslation } from "react-i18next";
import { CiStar } from "react-icons/ci";
import { getAuthToken } from "../../../config/auth";
import { MdOutlineNoteAlt } from "react-icons/md";
import { MdOutlineTimer } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { useState, useEffect } from "react";
import {
  formattedDuration,
  formattedDate,
  formattedTime,
  formattedData,
} from "../../../functions/formatData";

const GymTrainingDetails = ({planName, toggleDialog, workoutId, onDelete }) => {
  const { t } = useTranslation();
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [workout, setWorkout] = useState();

  const handleDelete = () => {
    onDelete();
    toggleDialog();
  };

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get(`/gym/workout/${workoutId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let response = res.data.workout;
        console.log(response);
        setWorkout(response);
      });
  }, [workoutId]);

  const currentExercise = workout?.workoutData?.[selectedExercise];

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleDialog}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.2, opacity: 0 }}
        className="bg-white flex flex-col items-center rounded-xl p-6 shadow-xl w-3/4 h-3/4 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center px-10 justify-between">
          <h2 className="text-4xl">{planName}</h2>
          <div className="flex gap-5">
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            onClick={handleDelete}
            className="mt-4 px-4 py-2 h-fit shadow-xl bg-red-500 text-white rounded"
          >
            {t('shared.actions.delete')}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            onClick={toggleDialog}
            className="mt-4 px-4 py-2 h-fit shadow-xl bg-lime-500 text-white rounded"
          >
            {t('shared.actions.edit')}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            onClick={toggleDialog}
            className="mt-4 px-4 py-2 h-fit shadow-xl bg-purple-500 text-white rounded"
          >
            {t('shared.actions.close')}
          </motion.button>
          </div>

        </div>
        <div className="w-full flex flex-grow">
          <div className="flex w-1/6 flex-col justify-center items-center">
            {workout && workout.workoutData && (
              <>
                {workout.workoutData.map((exercise, index) => (
                  <div
                    key={exercise.workoutDetailId}
                    className={`w-full cursor-pointer text-xl text-center py-2 ${
                      selectedExercise === index
                        ? "text-pink-500"
                        : "text-black"
                    }`}
                    onClick={() => setSelectedExercise(index)}
                  >
                    {exercise.exerciseName}
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="w-4/6 flex flex-col justify-center items-center">
            {selectedExercise === -1 ? (
              <div className="text-2xl">Summary of the Workout</div>
            ) : (
              currentExercise && (
                <>
                  <table className="w-full bg-white text-2xl h-fit text-center rounded-lg outline-none border-none">
                    <thead>
                      <tr>
                        <th>{t('gym.general.reps')}</th>
                        <th></th>
                        <th>{t('gym.general.weight')}</th>
                        <th></th>
                        <th>{t('gym.general.volume')}</th>
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
                              className="w outline-none w-40 p-2 rounded-2xl"
                              value={set.reps}
                              disabled={true}
                            />
                          </td>
                          <td>x</td>
                          <td>
                            <input
                              min={0}
                              type="number"
                              step="0.1"
                              className="outline-none w-40 p-2 rounded-2xl"
                              value={set.weight}
                              disabled={true}
                            />
                          </td>
                          <td>=</td>
                          <td>{set.reps * set.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )
            )}
          </div>
          <div className="w-1/6 flex flex-col gap-10 justify-center text-center items-center">
            <div>
              <div className="w-full flex justify-center items-end gap-3">
                <MdOutlineTimer size={35} />
                <h2 className="text-3xl font-semibold">{t('gym.general.duration')}</h2>
              </div>
              <label className="text-xl">
                {formattedDuration(workout?.duration || "00:00:00")}
              </label>
            </div>
            <div>
              <div className="flex justify-center items-end gap-3">
                <CiCalendarDate size={35} />
                <h2 className="text-3xl font-semibold">{t('gym.general.date')}</h2>
              </div>
              <label className="text-xl">{formattedTime(workout?.date)|| "00:00:00"} {formattedDate(workout?.date) || "00:00:00"}</label>
            </div>
            <div>
              <div className="flex justify-center items-end gap-3">
                <CiStar size={35} />
                <h2 className="text-3xl font-semibold">{t('gym.general.rating')}</h2>
              </div>
              <div className="flex justify-center items-center gap-3">
                <h2 className="text-xl">
                  {formattedData(workout?.rating || 0)}
                </h2>
                <ReactStars
                  count={5}
                  size={30}
                  color1="gray"
                  color2={"#ffd700"}
                  value={workout?.rating}
                  edit={false}
                />
              </div>
            </div>
            <div className="max-h-48">
              <div className=" flex justify-center items-end gap-3">
                <MdOutlineNoteAlt size={35} />
                <h2 className="text-3xl font-semibold">{t('gym.general.note')}</h2>
              </div>
              <label>{workout?.note}</label>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default GymTrainingDetails;
