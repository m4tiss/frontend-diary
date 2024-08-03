import React, { useState, useEffect } from "react";
import RunFriendBasicInfo from "./RunFriendBasicInfo";
import { useParams } from "react-router-dom";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import RunFriendAdvancedInfo from "./RunFriendAdvancedInfo";
import RunFriendCharts from "./RunFriendCharts";
import RunFriendActions from "./RunFriendActions";
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
    <div className="w-full flex flex-col flex-grow bg-[#e9ecef] dark:bg-run-night-background">
      <RunFriendBasicInfo friendInfo={friendInfo} />
      <div className="w-full flex justify-center flex-grow">
        <RunFriendAdvancedInfo friendInfo={friendInfo} />
        <RunFriendCharts friendInfo={friendInfo} friendId={friendId}/>
        <RunFriendActions />
      </div>
    </div>
  );
};

export default RunFriendPage;
