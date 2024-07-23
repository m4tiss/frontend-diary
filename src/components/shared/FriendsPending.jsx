import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import FriendPendingPanel from "./FriendPendingPanel";
import { AnimatePresence } from "framer-motion";

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
        console.error("Error fetching friends pending data:", error);
      });
  }, []);

  const onDeleteFromList = (userId) => {
    setPendingUsers((prevUsers) =>
      prevUsers.filter((user) => user.user_id !== userId)
    );
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {pendingUsers.length === 0 ? (
        <div className="w-full flex justify-center items-center text-4xl">No pending users</div>
      ) : (
        <AnimatePresence>
          {pendingUsers.map((user) => (
            <FriendPendingPanel
              onDelete={() => onDeleteFromList(user.user_id)}
              key={user.user_id}
              user={user}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default FriendsPending;
