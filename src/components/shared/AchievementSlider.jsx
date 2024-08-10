import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import AchievementPanel from "./AchievementPanel";
import AchievementDetails from "./AchievementDetails";
import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";

const AchievementSlider = ({ slidesPerView, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState();
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get(`/${type}/getUserAchievements`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.achievements;
        setAchievements(respone);
      })
      .catch((error) => {
        console.error("Error fetching achievements data:", error);
      });
  }, []);

  const closeDialog = () => {
    setIsOpen(!isOpen);
    setSelectedAchievement(null);
  };

  const setAchievement = (achievement) => {
    setSelectedAchievement(achievement);
    setIsOpen(true);
  };

  return (
    <>
      <Swiper slidesPerView={slidesPerView} grabCursor={true} loop={true}>
        {achievements.map((achievement, index) => (
          <SwiperSlide key={index}>
            <AchievementPanel
              setAchievement={() => setAchievement(achievement)}
              title={achievement.title}
              percent={Math.floor((achievement.value / achievement.goal) * 100)}
              description={achievement.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <AnimatePresence>
        {isOpen && (
          <AchievementDetails
            percent={Math.floor(
              (selectedAchievement.value / selectedAchievement.goal) * 100
            )}
            closeDialog={closeDialog}
            title={selectedAchievement.title}
            description={selectedAchievement.description}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AchievementSlider;
