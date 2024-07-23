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
    <>
      <div className="flex justify-evenly">
        <div className="flex justify-center items-center rounded-xl shadow-xl text-5xl bg-white p-2 "> <IoIosRefresh /><button
        //onClick={fetchUsers}
        >
          Refresh
        </button></div>
        
        <input
          className="bg-white p-2 border"
          type="text"
          //value={inputValue}
          //onChange={handleInputChange}
          placeholder="Input"
        />
      </div>
      <div className="flex flex-grow gap-5 flex-wrap">
        <AnimatePresence>
          {usersToInvite.slice(0, 3).map((user) => (
            <UserToInvitePanel
              onDelete={() => onDeleteFromList(user.user_id)}
              key={user.user_id}
              user={user}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default UsersToInvite;
