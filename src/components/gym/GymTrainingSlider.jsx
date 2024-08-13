import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import GymTrainingSlide from "./GymTrainingSlide";
import axios from '../../config/axios';
import { getAuthToken } from "../../config/auth";

const GymTrainingSlider = () => {

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/gym/workout/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let response = res.data.workouts;
        console.log(response)
        response = response.sort((a, b) => new Date(b.date) - new Date(a.date));
        //setTrainings(response);
      });
  }, []);

  return (
    <Swiper slidesPerView={3} grabCursor={true}>
      <SwiperSlide>
        <GymTrainingSlide
          title="UPPER A"
          duration="1h 30 min"
          sets={8}
          rating={4.8}
        />
      </SwiperSlide>
      <SwiperSlide>
        <GymTrainingSlide
          title="UPPER B"
          duration="2h 15 min"
          sets={12}
          rating={3.5}
        />
      </SwiperSlide>
      <SwiperSlide>
        <GymTrainingSlide
          title="LOWER A"
          duration="1h 10 min"
          sets={3}
          rating={2.1}
        />
      </SwiperSlide>
      <SwiperSlide>
        <GymTrainingSlide
          title="LOWER B"
          duration="30 min"
          sets={14}
          rating={4.9}
        />
      </SwiperSlide>
      <SwiperSlide>
        <GymTrainingSlide title="5" />
      </SwiperSlide>
    </Swiper>
  );
};

export default GymTrainingSlider;
