import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import AchievementPanel from "../shared/AchievementPanel";
import AchievementDetails from "../shared/AchievementDetails";
import { useState } from "react";

const RunAcheviementSlider = ({ slidesPerView }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };



  return (
    <>
      <Swiper slidesPerView={slidesPerView} grabCursor={true} loop={true}>
        <SwiperSlide>
          <AchievementPanel
            toggleDialog={toggleDialog}
            title="Marathon"
            percent={100}
            description="Run 42 km"
          />
        </SwiperSlide>
        <SwiperSlide>
          <AchievementPanel
            toggleDialog={toggleDialog}
            title="Under 3 minutes"
            percent={76}
            description="Run 1 km under 3 minute"
          />
        </SwiperSlide>
        <SwiperSlide>
          <AchievementPanel
            toggleDialog={toggleDialog}
            title="RUN RUN"
            percent={0}
            description="Do 2 runs in one day"
          />
        </SwiperSlide>
        <SwiperSlide>
          <AchievementPanel
            toggleDialog={toggleDialog}
            title="Runner"
            percent={20}
            description="Do 100 trainings"
          />
        </SwiperSlide>
        <SwiperSlide>
          <AchievementPanel
            toggleDialog={toggleDialog}
            title="5"
            percent={100}
            description="Try to bench press 100kg"
          />
        </SwiperSlide>
      </Swiper>
      <AnimatePresence>
        {isOpen && <AchievementDetails percent={94} toggleDialog={toggleDialog} />}
      </AnimatePresence>
    </>
  );
};

export default RunAcheviementSlider;
