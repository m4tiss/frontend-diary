import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";

import "react-toastify/dist/ReactToastify.css";

const GymAddRoutine = ({ toggleRemoveRoutineDialog, successRemoveRoutine }) => {
  const { t } = useTranslation();
  const [routines, setRoutines] = useState([]);

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


  const handleDelete = (gym_routine_id) => {
    const token = getAuthToken();
    axios
      .delete(`/gym/routine/${gym_routine_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        setRoutines((prevRoutines) =>
          prevRoutines.filter((routine) => routine.gym_routine_id !== gym_routine_id)
        );
          successRemoveRoutine();
      })
      .catch((error) => {
        console.error("Error deleting routine:", error);
        toast.error(t("Error removing routine"));
      });
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleRemoveRoutineDialog}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.2, opacity: 0 }}
        className="bg-white flex flex-col rounded-xl p-6 mx-10 shadow-xl w-full h-4/6 overflow-y-auto gap-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-5">
          <h2 className="text-2xl">{t('gym.profile.removeRoutine')}</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            onClick={toggleRemoveRoutineDialog}
            className="mt-4 px-4 py-2 h-fit shadow-xl bg-purple-500 text-white rounded"
          >
            {t("shared.actions.close")}
          </motion.button>
        </div>
        <div className="flex gap-10 flex-wrap flex-grow justify-center items-center">
          {routines.length === 0 ? (
            <div className="">brak rutyn</div>
          ) : (
            routines.map((routine) => (
              <div
                className="w-80 h-60 rounded-xl"
                key={routine.gym_routine_id}
              >
                <div className="flex justify-center items-center border-2 border-gray-300 rounded-t-2xl h-40 text-2xl">
                  {routine.name_routine}
                </div>
                <div className="w-full h-20 flex justify-center items-center border-2 border-red-600 bg-red-600 rounded-b-2xl ">
                  <motion.div
                    className="cursor-pointer"
                    whileHover={{ rotate: 45 }}
                    onClick={() => handleDelete(routine.gym_routine_id)}
                  >
                    <RiDeleteBin6Line size={50} color="white" />
                  </motion.div>
                </div>
              </div>
            ))
          )}
        </div>
        <ToastContainer />
      </motion.div>
    </div>,
    document.body
  );
};

export default GymAddRoutine;
