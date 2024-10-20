import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { RiShareBoxFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  formattedData,
  formattedTime,
  formattedDate,
  formattedDuration,
} from "../../../functions/formatData";
import ReactStars from "react-stars";
import gymIcon from "../../../icons/gymIconLight.png";

const GymPostPanel = ({ post }) => {
  const { t } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  console.log(post);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-1/2 h-80 flex bg-white p-5 rounded-xl">
      <div className="w-1/2 flex flex-col gap-5">
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
        <div className="text-center text-xl min-h-32 max-h-32">
          {post?.description}
        </div>
        <div className="flex gap-5 items-center px-10">
          <div className="cursor-pointer" onClick={handleLike}>
            <motion.div transition={{ type: "spring", stiffness: 300 }}>
              <CiHeart size={35} color={isLiked ? "red" : "black"} />
            </motion.div>
          </div>
          <div>
            <GoComment size={25} />
          </div>
          <div>
            <RiShareBoxFill size={25} />
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col justify-evenly items-center gap-3">
        <div className="flex justify-center items-center gap-10">
          <h2 className="text-2xl text-center">{post?.workout.planName}</h2>
          <img width={80} src={gymIcon} />
        </div>
        <div className="flex justify-start w-full px-5  text-xl">
          <span className="text-5xl text-center w-full">
            {formattedDuration(post?.workout.duration)}
          </span>
        </div>
        <div className="flex justify-evenly w-full px-5 text-xl">
          <span className=" text-center">
            {t("gym.general.sets")}:{" "}
            <span className="">{post?.workout.totalSets}</span>
          </span>
          <span className="">
            {t("gym.general.weight")}:{" "}
            <span className="">{post?.workout.totalVolume} kg</span>
          </span>
        </div>

        <div className="w-full flex justify-evenly items-center">
          <h2 className="text-3xl">{formattedData(post?.workout.rating)}</h2>
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
          <h2 className="text-xl">
            {formattedDate(post?.workout.date || "00:00:00")}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GymPostPanel;
