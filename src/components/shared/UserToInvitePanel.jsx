import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";




const UserToInvitePanel = ({ user }) => {
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

  return (
    <div className="w-64 h-96 rounded-xl p-3 flex flex-col items-center justify-evenly shadow-xl bg-white">
      <img
        style={{
          borderRadius: "1%",
          width: "250px",
          height: "250px",
        }}
        className="cursor-pointer object-cover"
        src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${user.profile_photo}`}
      />
      <label className="text-xl">{user.nickname} </label>
      <button
        style={{
          "background-image":
            "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
        }}
        onClick={() => sendInvitation(user.user_id)}
        className="text-white p-2 rounded-xl text-xl"
      >
        Send Invitation
      </button>
    </div>
  );
};

export default UserToInvitePanel;
