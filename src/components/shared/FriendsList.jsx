import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { useTranslation } from "react-i18next";
import { getAuthToken } from "../../config/auth";
import FriendPanel from "./FriendPanel";
import { motion } from "framer-motion";

const FriendsList = () => {
  const { t } = useTranslation();
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
        console.log(respone)
        setFriends(respone);
      })
      .catch((error) => {
        console.error("Error fetching friends data:", error);
      });
  }, []);

  return (
    <div className="w-full flex xl:justify-start justify-center flex-wrap gap-5">
      {friends.length === 0 ? (
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className="w-full flex justify-center items-center text-center text-4xl"
        >
         {t('shared.friends.noFriends')}
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
