import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { motion } from "framer-motion";

const FriendPendingPanel = ({ user, onDelete }) => {
  const acceptInvitation = async (friend_id) => {
    const token = getAuthToken();
    const resposne = await axios.post(
      "/shared/acceptInvitation",
      { friend_id: friend_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(resposne);
  };

  const handleAccept = () => {
    acceptInvitation(user.user_id);
    onDelete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      whileHover={{ scale: 1.1 }}
      className="flex flex-col justify-evenly items-center shadow-xl p-10 w-96 h-96 bg-white"
    >
      <img
        style={{
          borderRadius: "50%",
          width: "200px",
          height: "200px",
        }}
        className="object-cover"
        src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${user.profile_photo}`}
      />
      <label className="text-2xl">{user.nickname}</label>
      <div className="flex gap-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
          className=" bg-lime-400 text-white text-xl p-2 rounded-xl"
          onClick={handleAccept}
        >
          Accept
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
          className=" bg-red-400 text-white text-xl p-2 rounded-xl"
        >
          Reject
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FriendPendingPanel;
