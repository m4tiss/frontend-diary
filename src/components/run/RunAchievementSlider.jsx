import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import AchievementPanel from '../shared/AchievementPanel';

const RunAcheviementSlider = ({slidesPerView}) => {
    return (
      <Swiper
        slidesPerView={slidesPerView}
        grabCursor={true}
        loop={true}
      >
        <SwiperSlide>
          <AchievementPanel title="Marathon" percent={100} description="Run 42 km" />
        </SwiperSlide>
        <SwiperSlide>
          <AchievementPanel title="Under 3 minutes" percent={76} description="Run 1 km under 3 minute"/>
        </SwiperSlide>
        <SwiperSlide>
          <AchievementPanel title="RUN RUN" percent={0} description="Do 2 runs in one day" />
        </SwiperSlide>
        <SwiperSlide>
          <AchievementPanel title="Runner" percent={20} description="Do 100 trainings" />
        </SwiperSlide>
        <SwiperSlide>
          <AchievementPanel title="5" percent={100} description="Try to bench press 100kg"/>
        </SwiperSlide>
      </Swiper>
    );
};

export default RunAcheviementSlider;
