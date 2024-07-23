import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import UserToInvitePanel from "./UserToInvitePanel";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence } from "framer-motion";

const UsersToInvite = () => {
  const [usersToInvite, setUsersToInvite] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/getUsersToInvite", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.users;
        console.log(respone);
        setUsersToInvite(respone);
      })
      .catch((error) => {
        console.error("Error fetching users to invite data:", error);
      });
  }, []);

  const onDeleteFromList = (userId) => {
    setUsersToInvite((prevUsers) =>
      prevUsers.filter((user) => user.user_id !== userId)
    );
  };

  return (
    <div className="flex flex-grow gap-5 flex-wrap">
      <AnimatePresence>
        {usersToInvite.map((user) => (
          <UserToInvitePanel
            onDelete={() => onDeleteFromList(user.user_id)}
            key={user.user_id}
            user={user}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default UsersToInvite;
