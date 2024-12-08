import React, { useState, useEffect } from "react";
import FriendBasicInfo from "../../shared/FriendBasicInfo";
import { useParams } from "react-router-dom";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import RunFriendAdvancedInfo from "./RunFriendAdvancedInfo";
import RunFriendCharts from "./RunFriendCharts";
const RunFriendPage = () => {
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
    <div className="w-full flex flex-col flex-grow bg-[#e9ecef] dark:bg-run-night-background py-10 xl:px-0 px-5 gap-10 xl:gap-0">
      <FriendBasicInfo friendInfo={friendInfo} />
      <div className="w-full flex flex-col xl:flex-row justify-center flex-grow gap-10 xl:gap-0">
        <RunFriendAdvancedInfo friendInfo={friendInfo} friendId={friendId} />
        <RunFriendCharts friendInfo={friendInfo} friendId={friendId} />
      </div>
    </div>
  );
};

export default RunFriendPage;
