import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { motion } from "framer-motion";

const UserToInvitePanel = ({ user, onDelete }) => {
  const sendInvitation = async (friend_id) => {
    const token = getAuthToken();
    const resposne = await axios.post(
      "/shared/sendInvitation",
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

  const handleSending = () => {
    sendInvitation(user.user_id);
    onDelete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      whileHover={{ scale: 1.1 }}
      className="flex flex-col justify-evenly items-center shadow-xl p-10 min-w-96 h-96 bg-white"
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
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 500 }}
        style={{
          "background-image":
            "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
        }}
        onClick={handleSending}
        className="text-white p-2 rounded-xl text-xl"
      >
        Send Invitation
      </motion.button>
    </motion.div>
  );
};

export default UserToInvitePanel;
