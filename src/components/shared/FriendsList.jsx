import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import FriendPanel from "./FriendPanel";
import { motion } from "framer-motion";

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/getFriends", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.friends;
        setFriends(respone);
      })
      .catch((error) => {
        console.error("Error fetching friends data:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-wrap gap-5">
      {friends.length === 0 ? (
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className="w-full flex justify-center items-center text-4xl"
        >
          No friends available to display
        </motion.div>
      ) : (
        <>
          {friends.map((user, index) => (
            <FriendPanel key={index} user={user} />
          ))}
        </>
      )}
    </div>
  );
};

export default FriendsList;
