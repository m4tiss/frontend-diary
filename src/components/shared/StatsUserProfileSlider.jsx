import { calculateDaysWithUs } from "../../functions/statsCalculations";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import ProfileStatsSlide from "./ProfileStatsSlide";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
SwiperCore.use([Autoplay]);

const StatsUserProfileSlider = ({ friends, created_at }) => {
  const [numberOfAllWorkouts, setNumberOfAllWorkouts] = useState(0);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/numberOfAllWorkouts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.data
        setNumberOfAllWorkouts(respone);
      })
      .catch((error) => {
        console.error("Error fetching friends data:", error);
      });
  }, []);

  return (
    <Swiper
      autoplay={{ delay: 3000 }}
      slidesPerView={1}
      grabCursor={true}
      loop={true}
    >
      <SwiperSlide>
        <ProfileStatsSlide number={friends} description="Friends" />
      </SwiperSlide>
      <SwiperSlide>
        <ProfileStatsSlide number={numberOfAllWorkouts} description="All trainings" />
      </SwiperSlide>
      <SwiperSlide>
        <ProfileStatsSlide
          number={calculateDaysWithUs(created_at)}
          description="Days with us"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default StatsUserProfileSlider;
