import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import FriendPendingPanel from "./FriendPendingPanel";

const FriendsPending = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/getPendingUsers", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.pendingUsers;
        setPendingUsers(respone);
      })
      .catch((error) => {
        console.error("Error fetching pulse data:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-col gap-5">
      {pendingUsers.map((user, index) => (
          <FriendPendingPanel key={index} user={user} />
      ))}
    </div>
  );
};

export default FriendsPending;
