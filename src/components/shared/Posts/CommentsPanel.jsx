import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import CommentPanel from "./CommentPanel";
import { useState, useEffect } from "react";
import { useUser } from "../../../providers/UserProvider";
import { IoMdSend } from "react-icons/io";

const CommentsPanel = ({ toggleDialog, postId, nickname }) => {
  const { userInfo } = useUser();
  const [comments, setComments] = useState([]);
  const { t } = useTranslation();
  const [newComment, setNewComment] = useState("");

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
        console.error("Błąd podczas pobierania komentarzy:", error);
      }
    };

    getAllPosts();
  }, [postId]);

  const sendComment = async () => {
    if (!newComment.trim()) return;

    try {
      const token = getAuthToken();
      const response = await axios.post(
        "/shared/comment",
        {
          post_id: postId,
          description: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      setComments((prevComments) => [
        {
          comment_id: response.data.comment_id,
          description: newComment,
          nickname: userInfo.nickname,
          profile_photo: userInfo.profile_photo,
        },
        ...prevComments,
      ]);

      setNewComment("");
      console.log("Komentarz dodany pomyślnie:", response.data);
    } catch (error) {
      console.error("Błąd podczas dodawania komentarza:", error);
    }
  };

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
        <div className="h-14 flex items-center">
          <img
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
            className="object-cover"
            src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${userInfo.profile_photo}`}
          />
          <input
            className="flex-grow h-full border-b-2 border-black outline-none px-5"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={"Komentarz"}
          />
          <div className="cursor-pointer" onClick={sendComment}>
            <IoMdSend size={40} />
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default CommentsPanel;
