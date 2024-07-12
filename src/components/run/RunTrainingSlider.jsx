import React from "react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import RunTrainingSlide from "./RunTrainingSlide";
import axios from '../../config/axios'
import { getAuthToken } from "../../config/auth";

const RunTrainingSlider = () => {

  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const token = getAuthToken()
    axios.get("/run/workout/all",{
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    ).then((res) => {
      const response = res.data.workouts;
      console.log(response)
      setTrainings(response);
    });
  }, []);

  return (
    <Swiper
      slidesPerView={3}
      grabCursor={true}
    >
{/* {trainings.map((item, index) => (
        <SwiperSlide key={index}>
          <TrainingRunPanel
            title={item.title || "UNKNOWN TITLE"}
            duration={item.duration || "UNKNOWN DURATION"}
            distance={item.distance || 0}
            sets={item.sets || 0}
            rating={item.rating || 0}
          />
        </SwiperSlide>
      ))} */}
      
      <SwiperSlide>
        <RunTrainingSlide
          title="LONG RUN"
          duration="2h 15 min"
          distance={4.3}
          sets={12}
          rating={3.5}
        />
      </SwiperSlide>
      <SwiperSlide>
        <RunTrainingSlide
          title="EASY RUN"
          duration="1h 10 min"
          distance={33.3}
          sets={3}
          rating={2.1}
        />
      </SwiperSlide>
      <SwiperSlide>
        <RunTrainingSlide
          title="LONG RUN"
          duration="30 min"
          distance={14.3}
          sets={14}
          rating={4.9}
        />
      </SwiperSlide>
      <SwiperSlide>
        <RunTrainingSlide title="5" />
      </SwiperSlide>
    </Swiper>
  );
};

export default RunTrainingSlider;
