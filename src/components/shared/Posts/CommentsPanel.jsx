import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import CommentPanel from "./CommentPanel";
import { useState, useEffect } from "react";

const CommentsPanel = ({ toggleDialog, postId, nickname }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get("/shared/comment/getAll", {
          params: {
            post_id: postId,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setComments(response.data);
      } catch (error) {
        console.error("Błąd podczas dodawania posta:", error);
      }
    };

    getAllPosts();
  }, []);

  // const sendPost = async () => {
  //   try {
  //     const token = getAuthToken();
  //     const response = await axios.post(
  //       "/shared/comment",
  //       {
  //         post_id: postId,
  //         description: "komentarz elegancki",
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

  const { t } = useTranslation();
  return createPortal(
    <div
      className="fixed inset-0 w-full h-full flex items-end justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleDialog}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-[800px] h-5/6 bg-white rounded-t-2xl p-5 gap-5"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween", duration: 0.5 }}
      >
        <div className="flex flex-col 2xl:flex-row justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Post użytkownika {nickname}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            onClick={toggleDialog}
            className="mt-4 px-4 py-2 h-fit shadow-xl bg-purple-500 text-white rounded"
          >
            {t("shared.actions.close")}
          </motion.button>
        </div>
        <div className="flex flex-col items-start flex-grow gap-3">
          {comments.map((comment) => (
            <CommentPanel key={comment.comment_id} comment={comment} />
          ))}
        </div>
        <div className="h-12 bg-red-600">ds</div>
      </motion.div>
    </div>,
    document.body
  );
};

export default CommentsPanel;
