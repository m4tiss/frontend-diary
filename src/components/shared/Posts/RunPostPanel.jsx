import { useState, useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { RiShareBoxFill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import {
  formattedData,
  formattedTime,
  formattedDate,
  formattedDuration,
} from "../../../functions/formatData";
import ReactStars from "react-stars";
import DarkModeContext from "../../../providers/DarkModeProvider";
import RunTrainingDetails from "../../run/RunHistory/RunTrainingDetails";
import iconDark from "../../../icons/runIconDark.png";
import iconLight from "../../../icons/runIconLight.png";
import { LuMapPin, LuMapPinOff } from "react-icons/lu";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useUser } from "../../../providers/UserProvider";
import { RiDeleteBin7Line } from "react-icons/ri";
import CommentsPanel from "./CommentsPanel";

const RunPostPanel = ({ post, onDelete }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { userInfo } = useUser();
  const [isLiked, setIsLiked] = useState(post?.isLike);
  const [likesCount, setLikesCount] = useState(post?.likesCount || 0);
  const [commentsCount, setCommentsCount] = useState(post?.commentsCount || 0);
  const [isOpenWorkout, setIsOpenWorkout] = useState(false);
  const [isOpenComments, setIsOpenComments] = useState(false);

  const toggleComments = () => {
    setIsOpenComments((prev) => !prev);
  };

  const toggleWorkot = () => {
    setIsOpenWorkout(!isOpenWorkout);
  };

  const handleCommentAdd = () => {
    setCommentsCount(commentsCount + 1);
  };

  const handleCommentDelete = () => {
    setCommentsCount(commentsCount - 1);
  };

  const handleLike = async () => {
    try {
      if (isLiked) return;

      const token = getAuthToken();

      const response = await axios.post(
        "/shared/like",
        {
          post_id: post.post_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsLiked(true);
        setLikesCount(likesCount + 1);
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      if (!isLiked) return;

      const token = getAuthToken();

      const response = await axios.post(
        "/shared/like/unlike",
        {
          post_id: post.post_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsLiked(false);
        setLikesCount(likesCount - 1);
      }
    } catch (error) {
      console.error("Error unliking the post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = getAuthToken();

      const response = await axios.delete("/shared/post", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          post_id: post.post_id,
        },
      });

      if (response.status === 200) {
        onDelete(post.post_id);
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  return (
    <div className="w-80 2xl:w-1/2 flex flex-col 2xl:flex-row bg-white p-5 rounded-xl gap-5 relative 2xl:pb-5 pb-14">
      <div className="w-full 2xl:w-1/2 flex flex-col gap-5">
        <div className="flex justify-center items-center gap-2">
          <img
            style={{
              borderRadius: "50%",
              width: "80px",
              height: "80px",
            }}
            className="cursor-pointer object-cover"
            src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${post?.profile_photo}`}
            alt="Profile"
          />
          <h2 className="text-2xl">{post?.nickname}</h2>
        </div>
        <div className="text-center text-xl 2xl:min-h-32">
          {post?.description}
        </div>
        <div className="flex gap-5 items-center 2xl:px-10 px-2">
          <div
            className="flex justify-center items-center gap-1"
            onClick={isLiked ? handleUnlike : handleLike}
          >
            <motion.div
              className="cursor-pointer"
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CiHeart size={35} color={isLiked ? "red" : "black"} />
            </motion.div>
            <h2 className="text-xl">{likesCount}</h2>
          </div>
          <div className="flex justify-center items-center gap-1">
            <motion.div className="cursor-pointer" onClick={toggleComments}>
              <GoComment size={28} />
            </motion.div>
            <h2 className="text-xl">{commentsCount}</h2>
          </div>
          <div className="flex justify-center items-center gap-1">
            <motion.div
              className="cursor-pointer"
              onClick={toggleWorkot}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <RiShareBoxFill size={28} />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full 2xl:w-1/2 flex flex-col justify-evenly items-center gap-3">
        <div className="flex justify-center items-center gap-10">
          <h2 className="text-2xl">
            {post?.workout.category_name || "UNKNOWN TITLE"}
          </h2>
          <img
            width={60}
            src={darkMode ? iconDark : iconLight}
            alt="Run Icon"
          />
        </div>
        <div className="flex justify-start w-full px-5 text-xl">
          <span className="text-5xl text-center w-full">
            {formattedData(post?.workout.distance || 0)} km
          </span>
        </div>
        <div className="flex items-center justify-evenly w-full px-5 text-xl">
          <span className="text-center">
            {formattedDuration(post?.workout.duration || "00:00:00")}
          </span>
          <div>
            {post?.workout.coordinates.length > 0 ? (
              <LuMapPin size={40} />
            ) : (
              <LuMapPinOff size={40} />
            )}
          </div>
        </div>

        <div className="w-full flex justify-evenly items-center">
          <h2 className="text-3xl">
            {formattedData(post?.workout.rating || 0)}
          </h2>
          <ReactStars
            count={5}
            size={30}
            color1="gray"
            color2={"#ffd700"}
            value={post?.workout.rating}
            edit={false}
          />
        </div>
        <div className="w-full flex justify-evenly items-center">
          <h2 className="text-xl">{formattedTime(post?.workout.date)}</h2>
          <h2 className="text-xl">{formattedDate(post?.workout.date)}</h2>
        </div>
      </div>
      {post.user_id === userInfo.user_id && (
        <div
          onClick={handleDelete}
          className="absolute bottom-0 right-0 w-full h-12 2xl:w-12 2xl:h-full bg-red-500 rounded-b-xl 2xl:rounded-b-none 2xl:rounded-tr-xl 2xl:rounded-br-xl text-white flex justify-center items-center cursor-pointer"
        >
          <RiDeleteBin7Line size={30} />
        </div>
      )}
      <AnimatePresence>
        {isOpenWorkout && (
          <RunTrainingDetails
            toggleDialog={toggleWorkot}
            training={post?.workout}
            hideDelete={true}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpenComments && (
          <CommentsPanel
            toggleDialog={toggleComments}
            postId={post?.post_id}
            nickname={post?.nickname}
            onCommentAdd={handleCommentAdd}
            onCommentDelete={handleCommentDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RunPostPanel;
