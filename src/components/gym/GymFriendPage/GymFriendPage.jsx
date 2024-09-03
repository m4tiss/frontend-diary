import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import FriendBasicInfo from "../../shared/FriendBasicInfo";
import GymFriendAdvancedInfo from "./GymFriendAdvancedInfo";
import GymFriendCharts from "./GymFriendCharts";
import GymFriendActions from './GymFriendActions';
const GymFriendPage = () => {
   const { friendId } = useParams();
  const [friendInfo, setFriendInfo] = useState({});

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/getFriendInfo", {
        params: { friend_id: friendId },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let response = res.data.friendInfo;
        console.log(response);
        setFriendInfo(response);
      })
      .catch((error) => {
        console.error("Error fetching friend info:", error);
      });
  }, [friendId]);

  return (
    <div className="w-full flex flex-col flex-grow bg-[#e9ecef] dark:bg-run-night-background">
      <FriendBasicInfo friendInfo={friendInfo} />
      <div className="w-full flex justify-center flex-grow">
        <GymFriendAdvancedInfo friendInfo={friendInfo} />
        <GymFriendCharts friendInfo={friendInfo} friendId={friendId}/>
        <GymFriendActions />
      </div>
    </div>
  );
};

export default GymFriendPage;
