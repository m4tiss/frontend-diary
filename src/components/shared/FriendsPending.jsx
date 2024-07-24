import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import FriendPendingPanel from "./FriendPendingPanel";
import { AnimatePresence } from "framer-motion";
import { EffectFlip } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';


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
        const response = res.data.pendingUsers;
        setPendingUsers(response);
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
    <div className="w-full flex gap-5">
      {pendingUsers.length === 0 ? (
        <div className="w-full flex justify-center items-center text-4xl">
          No pending users
        </div>
      ) : (
        <Swiper
          effect="flip"
          className="w-full h-full"
          navigation={true}
          modules={[Navigation,EffectFlip]}
        >
          <AnimatePresence>
            {pendingUsers.map((user) => (
              <SwiperSlide key={user.user_id}>
                <FriendPendingPanel
                  onDelete={() => onDeleteFromList(user.user_id)}
                  user={user}
                />
              </SwiperSlide>
            ))}
          </AnimatePresence>
        </Swiper>
      )}
    </div>
  );
};

export default FriendsPending;
