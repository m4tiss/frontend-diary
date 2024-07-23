import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { motion } from "framer-motion";

const FriendPanel = ({ user }) => {
  return (
    <motion.div
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      whileHover={{ scale: 1.1 }}
      className="flex flex-col justify-evenly cursor-pointer items-center shadow-xl p-10 w-96 h-96 bg-white"
    >
      <img
        style={{
          borderRadius: "50%",
          width: "200px",
          height: "200px",
        }}
        className="cursor-pointer object-cover"
        src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${user.profile_photo}`}
      />
      <label className="text-2xl">{user.nickname}</label>
      <label className="text-xl">{user.description}</label>
    </motion.div>
  );
};

export default FriendPanel;
