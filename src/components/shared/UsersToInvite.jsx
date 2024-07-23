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
        console.error("Error fetching pulse data:", error);
      });
  }, []);



  return (
    <div className="flex gap-5 flex-wrap">
      <Swiper
      slidesPerView={4}
      grabCursor={true}
    >
      {usersToInvite.map((user, index) => (
          <SwiperSlide key={index}>
          <UserToInvitePanel user={user} />
          </SwiperSlide>
      ))}
      </Swiper>
    </div>
  );
};

export default UsersToInvite;
