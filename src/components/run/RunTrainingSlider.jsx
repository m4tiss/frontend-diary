import React from "react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import RunTrainingSlide from "./RunTrainingSlide";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { useNavigate } from "react-router-dom";

const RunTrainingSlider = ({ categoryName }) => {
  const [trainings, setTrainings] = useState([]);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const token = getAuthToken();
    axios
      .delete(`/run/workout/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        setTrainings((prevTrainings) =>
          prevTrainings.filter((training) => training.run_workout_id !== id)
        );
        console.log("Przeładowałem");
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
        params: categoryName ? { category_name: categoryName } : {},
      })
      .then((res) => {
        let response = res.data.workouts;
        response = response.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTrainings(response);
      });
  }, [categoryName]);

  return (
    <Swiper
      className="w-full flex justify-center items-center text-center"
      slidesPerView={trainings.length === 0 ? 1 : 3}
      grabCursor={true}
    >
      {trainings.length === 0 ? (
        <SwiperSlide key={-1}>
          <div className="w-full h-96 flex gap-20 m-5 flex-col items-center justify-center">
            <h2 className="text-5xl">No available trainings</h2>
            <motion.button
            onClick={() => navigate("/run/newTraining")}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="text-white p-3 rounded-xl shadow-xl text-xl"
              style={{
                "background-image":
                  "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
              }}
            >
              Add new trainings
            </motion.button>
          </div>
        </SwiperSlide>
      ) : (
        trainings.map((item, index) => (
          <SwiperSlide key={index}>
            <RunTrainingSlide
              training={item}
              onDelete={() => handleDelete(item.run_workout_id)}
            />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default RunTrainingSlider;
