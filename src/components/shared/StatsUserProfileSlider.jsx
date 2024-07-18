import { calculateDaysWithUs } from "../../functions/statsCalculations";
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
const StatsUserProfileSlider = ({ created_at }) => {
  return (
    <Swiper
      autoplay={{ delay: 3000 }}
      slidesPerView={1}
      grabCursor={true}
      loop={true}
    >
      <SwiperSlide>
        <ProfileStatsSlide number={572} description="Friends" />
      </SwiperSlide>
      <SwiperSlide>
        <ProfileStatsSlide number={432} description="All trainings" />
      </SwiperSlide>
      <SwiperSlide>
        <ProfileStatsSlide
          number={calculateDaysWithUs(created_at)}
          description="Days with us"
        />
      </SwiperSlide>
      <SwiperSlide>
        <ProfileStatsSlide number={300} description="Comments on platform" />
      </SwiperSlide>
    </Swiper>
  );
};

export default StatsUserProfileSlider;
