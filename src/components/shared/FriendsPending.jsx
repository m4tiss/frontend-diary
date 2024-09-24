import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import FriendPendingPanel from "./FriendPendingPanel";
import { motion,AnimatePresence } from "framer-motion";
import { EffectFlip } from 'swiper/modules';
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';

import { useUser } from "../../providers/UserProvider";


const FriendsPending = () => {
  const { t } = useTranslation();
  const [pendingUsers, setPendingUsers] = useState([]);
  const { fetchUserInfo } = useUser();

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
    console.log("usuwanie z listy w friends pending")
    fetchUserInfo();
  };

  return (
    <div className="w-full flex gap-5">
      {pendingUsers.length === 0 ? (
        <motion.div 
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="w-full flex justify-center items-center text-center text-4xl">
           {t('shared.friends.noPending')}
        </motion.div>
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
