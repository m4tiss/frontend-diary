import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const NewGymPost = ({ toggleGym }) => {
  const { t } = useTranslation();
  // const sendPost = async () => {
  //   try {
  //     const token = getAuthToken();
  //     const response = await axios.post(
  //       "/shared/post",
  //       {
  //         gym_workout_id: null,
  //         run_workout_id: 82,
  //         description: "Opis treningu biegowego",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Post dodany pomyślnie:", response.data);
  //   } catch (error) {
  //     console.error("Błąd podczas dodawania posta:", error);
  //   }
  // };

  //   useEffect(() => {
  //     const getAllPosts = async () => {
  //       try {
  //         const token = getAuthToken();
  //         const response = await axios.get("/shared/post/getAll", {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         setPosts(response.data);
  //       } catch (error) {
  //         console.error("Błąd podczas dodawania posta:", error);
  //       }
  //     };

  //     getAllPosts();
  //   }, []);

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleGym}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.2, opacity: 0 }}
        className="bg-white flex flex-col items-center rounded-xl p-6 shadow-xl w-3/4 h-3/4 overflow-auto gap-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center">
          <h2 className="text-2xl">Dodaj post</h2>
          <div className="flex gap-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              //onClick={handleSubmit}
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
          <textarea className="bg-gray-200 w-full h-40 rounded-xl p-3 outline-none text-xl" />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl">Wybierz trening</h2>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default NewGymPost;
