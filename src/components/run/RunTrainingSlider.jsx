import React from "react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import RunTrainingSlide from "./RunTrainingSlide";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { format } from "date-fns";

const formattedData = (distance) => {
  return distance.toFixed(1);
};

const formattedDate = (dateString) => {
  const date = new Date(dateString);
  console.log(dateString);
  return format(date, "dd-MM-yyyy");
};

const formattedDuration = (duration) => {
  const [hours, minutes, seconds] = duration.split(':').map(Number);
  let formatted = '';

  if (hours > 0) {
    formatted += `${hours}h `;
  }
  if (minutes > 0) {
    formatted += `${minutes}min `;
  }
  if (seconds > 0) {
    formatted += `${seconds}sec`;
  }

  return formatted.trim();
};

const RunTrainingSlider = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/workout/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let response = res.data.workouts;
        response = response.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTrainings(response);
      });
  }, []);

  return (
    <Swiper slidesPerView={3} grabCursor={true}>
      {trainings.map((item, index) => (
        <SwiperSlide key={index}>
          <RunTrainingSlide
            title={item.category_name || "UNKNOWN TITLE"}
            duration={formattedDuration(item.duration || "00:00:00")}
            date={formattedDate(item.date)}
            distance={formattedData(item.distance || 0)}
            rating={formattedData(item.rating || 0)}
          />
        </SwiperSlide>
      ))}

      <SwiperSlide>
        <RunTrainingSlide
          title="LONG RUN"
          duration="2h 15 min"
          distance={4.3}
          rating={3.5}
        />
      </SwiperSlide>
      <SwiperSlide>
        <RunTrainingSlide
          title="EASY RUN"
          duration="1h 10 min"
          distance={33.3}
          rating={2.1}
        />
      </SwiperSlide>
      <SwiperSlide>
        <RunTrainingSlide
          title="LONG RUN"
          duration="30 min"
          distance={14.3}
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
