import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { RiShareBoxFill } from "react-icons/ri";
import { motion } from "framer-motion";
import {
  formattedData,
  formattedTime,
  formattedDate,
  formattedDuration,
} from "../../../functions/formatData";
import ReactStars from "react-stars";
import { useContext } from "react";
import DarkModeContext from "../../../providers/DarkModeProvider";
import iconDark from "../../../icons/runIconDark.png";
import iconLight from "../../../icons/runIconLight.png";
import { LuMapPin } from "react-icons/lu";
import { LuMapPinOff } from "react-icons/lu";

const RunPostPanel = ({ post }) => {
  const { darkMode } = useContext(DarkModeContext);
  const [isLiked, setIsLiked] = useState(false);
  console.log(post);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-80 2xl:w-1/2 flex flex-col 2xl:flex-row bg-white p-5 rounded-xl gap-5">
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
          />
          <h2 className="text-2xl">{post?.nickname}</h2>
        </div>
        <div className="text-center text-xl  2xl:min-h-32">
          {post?.description}
        </div>
        <div className="flex gap-5 items-center 2xl:px-10 px-2">
          <div
            className="flex justify-center items-center gap-1"
            onClick={handleLike}
          >
            <motion.div
              className="cursor-pointer"
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CiHeart size={35} color={isLiked ? "red" : "black"} />
            </motion.div>
            <h2 className="text-xl">13</h2>
          </div>
          <div className="flex justify-center items-center gap-1">
            <motion.div className="cursor-pointer">
              <GoComment size={28} />
            </motion.div>
            <h2 className="text-xl">16</h2>
          </div>
          <div>
            <RiShareBoxFill size={28} />
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
        <div className="flex justify-start w-full px-5  text-xl">
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
          <h2 className="text-3xl">{formattedData(post?.workout.rating || 0)}</h2>
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
    </div>
  );
};

export default RunPostPanel;
