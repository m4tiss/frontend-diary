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


const RunTrainingSlider = () => {
  const [trainings, setTrainings] = useState([]);

  const handleDelete = (id) => {
    const token = getAuthToken();
    axios
      .delete(`/run/workout/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        setTrainings((prevTrainings) => prevTrainings.filter((training) => training.run_workout_id !== id));
        console.log("Przeładowałem")
      })
      .catch((error) => {
        console.error("Error deleting training:", error);
      });
  };

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
        console.log(response);
        setTrainings(response);
      });
  }, []);

  return (
    <Swiper slidesPerView={3} grabCursor={true}>
      {trainings.map((item, index) => (
        <SwiperSlide key={index}>
          <RunTrainingSlide
            training={item}
            onDelete={() => handleDelete(item.run_workout_id)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RunTrainingSlider;
