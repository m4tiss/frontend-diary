import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import AchievementPanel from "../shared/AchievementPanel";
import AchievementDetails from "../shared/AchievementDetails";
import { useState } from "react";

const RunAcheviementSlider = ({ slidesPerView }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState();

  const closeDialog = () => {
    setIsOpen(!isOpen);
    setSelectedAchievement(null);
  };

  const setAchievement = (achievement) => {
    setSelectedAchievement(achievement);
    setIsOpen(true);
  };

  const achievements = [
    {
      title: "Marathon",
      percent: 100,
      description: "Run 42 km",
    },
    {
      title: "Under 3 minutes",
      percent: 76,
      description: "Run 1 km under 3 minute",
    },
    {
      title: "RUN RUN",
      percent: 0,
      description: "Do 2 runs in one day",
    },
    {
      title: "Runner",
      percent: 20,
      description: "Do 100 trainings",
    },
    {
      title: "5",
      percent: 100,
      description: "Try to bench press 100kg",
    },
  ];

  return (
    <>
    <Swiper 
    slidesPerView={slidesPerView} 
    grabCursor={true} 
    loop={true}

    >
      {achievements.map((achievement, index) => (
        <SwiperSlide key={index}>
          <AchievementPanel
            setAchievement={() => setAchievement(achievement)}
            title={achievement.title}
            percent={achievement.percent}
            description={achievement.description}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    <AnimatePresence>
      {isOpen && (
        <AchievementDetails
          percent={selectedAchievement.percent}
          closeDialog={closeDialog}
          title={selectedAchievement.title}
          description={selectedAchievement.description}
        />
      )}
    </AnimatePresence>
  </>
  );
};

export default RunAcheviementSlider;
