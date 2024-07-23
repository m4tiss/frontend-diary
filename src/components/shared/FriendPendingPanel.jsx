import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";

const FriendPendingPanel = ({ user }) => {
  return (
    <div className="flex justify-evenly items-center h-24 rounded-xl w-96 bg-white">
      <div className="flex justify-center items-center gap-2">
        <img
          style={{
            borderRadius: "50%",
            width: "70px",
            height: "70px",
          }}
          className="cursor-pointer object-cover"
          src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${user.profile_photo}`}
        />
        <label className="text-xl">{user.nickname}</label>
      </div>
      <div className="flex justify-center items-center gap-2">
        <button className=" bg-lime-400 text-white text-xl p-2 rounded-xl">
          Accept
        </button>
        <button className=" bg-red-400 text-white text-xl p-2 rounded-xl">
          Reject
        </button>
      </div>
    </div>
  );
};

export default FriendPendingPanel;
