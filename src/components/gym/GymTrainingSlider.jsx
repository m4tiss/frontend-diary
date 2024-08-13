import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import GymTrainingSlide from "./GymTrainingSlide";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { useNavigate } from "react-router-dom";

const GymTrainingSlider = () => {
  const [workouts, setWorkouts] = useState([]);

  const navigate = useNavigate();
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
        console.log(response);
        response = response.sort((a, b) => new Date(b.date) - new Date(a.date));
        setWorkouts(response);
      });
  }, []);

  return (
    <Swiper
      className="w-full flex justify-center items-center text-center"
      slidesPerView={workouts.length === 0 ? 1 : 3}
      grabCursor={true}
    >
      {workouts.length === 0 ? (
        <SwiperSlide key={-1}>
          <div className="w-full h-96 flex gap-20 m-5 flex-col items-center justify-center">
            <h2 className="text-5xl dark:text-white">No available trainings</h2>
            <motion.button
              onClick={() => navigate("/gym/newTraining")}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="text-white p-3 rounded-xl shadow-xl text-xl"
              style={{
                "background-image":
                  "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
              }}
            >
              Add new trainings
            </motion.button>
          </div>
        </SwiperSlide>
      ) : (
        workouts.map((workout) => (
          <SwiperSlide  key={workout.workoutId}>
            <GymTrainingSlide
              workout={workout}
              //onDelete={() => handleDelete(item.run_workout_id)}
            />
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
};

export default GymTrainingSlider;
