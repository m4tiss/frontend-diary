import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const NewRunPost = ({ toggleRun }) => {
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
      onClick={toggleRun}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.2, opacity: 0 }}
        className="bg-white flex flex-col items-center rounded-xl p-6 shadow-xl w-3/4 h-3/4 overflow-auto gap-10 xl:gap-0"
        onClick={(e) => e.stopPropagation()}
      >
        run run
      </motion.div>
    </div>,
    document.body
  );
};

export default NewRunPost;
