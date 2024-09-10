import { calculateDaysWithUs } from "../../functions/statsCalculations";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
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
        <ProfileStatsSlide number={friends} description={t('shared.friends.friends')} />
      </SwiperSlide>
      <SwiperSlide>
        <ProfileStatsSlide number={numberOfAllWorkouts} description={t('gym.profile.allTrainings')} />
      </SwiperSlide>
      <SwiperSlide>
        <ProfileStatsSlide
          number={calculateDaysWithUs(created_at)}
          description={t('gym.profile.daysWithUs')}
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default StatsUserProfileSlider;
