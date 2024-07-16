import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import AchievementPanel from '../shared/AchievementPanel';

const GymAcheviementSlider = () => {
    return (
      <Swiper
        slidesPerView={4}
        grabCursor={true}
        loop={true}
      >
        <SwiperSlide>
          <AchievementPanel title="Bench press 100kg" percent={100} description="Try to bench press 100kg" />
        </SwiperSlide>
        <SwiperSlide>
          <AchievementPanel title="10 pull ups" percent={76} description="Do 10 pull ups in 1 set"/>
        </SwiperSlide>
        <SwiperSlide>
          <AchievementPanel title="Big boy" percent={0} description="Reach 80 kilos" />
        </SwiperSlide>
        <SwiperSlide>
          <AchievementPanel title="Dropset now" percent={20} description="Do 5 sets in one exercise" />
        </SwiperSlide>
        <SwiperSlide>
          <AchievementPanel title="5" percent={100} description="Try to bench press 100kg"/>
        </SwiperSlide>
      </Swiper>
    );
};

export default GymAcheviementSlider;
