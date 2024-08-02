import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FriendPanel = ({ user }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/run/friend/${user.user_id}`)}
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      whileHover={{ scale: 1.1 }}
      className="flex flex-col justify-evenly cursor-pointer items-center shadow-xl min-w-40 h-40 bg-white"
    >
      <img
        style={{
          borderRadius: "50%",
          width: "70px",
          height: "70px",
        }}
        className="cursor-pointer object-cover"
        src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${user.profile_photo}`}
      />
      <label className="text-2xl">{user.nickname}</label>
    </motion.div>
  );
};

export default FriendPanel;
