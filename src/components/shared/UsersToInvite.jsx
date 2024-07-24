import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import UserToInvitePanel from "./UserToInvitePanel";
import { IoIosRefresh } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence } from "framer-motion";

const UsersToInvite = () => {
  const [usersToInvite, setUsersToInvite] = useState([]);

  const refreshUsers = () => {
    setUsersToInvite([]);
    const token = getAuthToken();
    axios
      .get("/shared/getThreeRandomUsersToInvite", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const response = res.data.users;
        setUsersToInvite(response);
      })
      .catch((error) => {
        console.error("Error fetching users to invite data:", error);
      });
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const onDeleteFromList = (userId) => {
    setUsersToInvite((prevUsers) =>
      prevUsers.filter((user) => user.user_id !== userId)
    );
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        <div 
          onClick={refreshUsers}
          className="flex justify-center items-center rounded-xl shadow-xl text-5xl bg-white p-2 cursor-pointer">
          <IoIosRefresh />
        </div>
        
        <input
          className="bg-white p-2 text-3xl rounded-xl shadow-xl outline-none"
          type="text"
          placeholder="Search new friend"
        />
      </div>
      <div className="flex justify-center flex-grow gap-5 flex-wrap">
          {usersToInvite.map((user) => (
            <UserToInvitePanel
              onDelete={() => onDeleteFromList(user.user_id)}
              key={user.user_id}
              user={user}
            />
          ))}
      </div>
    </>
  );
};

export default UsersToInvite;
