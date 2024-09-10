import React, { useState } from "react";
import ReactStars from "react-stars";
import axios from "../../../config/axios";
import { useTranslation } from "react-i18next";
import { getAuthToken } from "../../../config/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GymSummaryPanel = ({ workoutData, planName }) => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    duration: "00:00:00",
    note: "",
    rating: 0.0,
  });

  const navigate = useNavigate();

  const handleAddWorkout = async () => {
    try {
      const workout = {
        duration: data.duration,
        note: data.note,
        rating: data.rating,
        plan_name: planName,
        workout_details: workoutData,
      };

      const token = getAuthToken();
      const resposne = await axios.post("/gym/workout", workout, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log(resposne);
      setData({
        duration: "00:00",
        note: "",
        rating: 0.0,
      });
      toast.success("Workout added!");
      setTimeout(() => navigate("/gym/history"), 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-evenly">
        <div className="flex flex-col">
          <div className="text-left flex w-96 flex-col dark:text-white">
            <label className="px-2 text-xl">{t('gym.general.duration')}</label>
            <input
              value={data.duration}
              onChange={(e) => setData({ ...data, duration: e.target.value })}
              className="text-2xl p-2 rounded-2xl outline-none shadow-xl bg-[#e9ecef] dark:bg-run-night-element "
              placeholder="1h 30min"
            ></input>
          </div>

          <div className="text-left flex w-96 flex-col  rounded-xl p-2  dark:text-white">
            <label className="px-2 text-xl">{t('gym.general.rating')}</label>

            <input
              value={data.rating}
              step={0.1}
              min={0}
              max={5}
              onChange={(e) => setData({ ...data, rating: e.target.value })}
              className="text-2xl p-2 rounded-2xl outline-none shadow-xl bg-[#e9ecef] dark:bg-run-night-element"
              type="number"
              placeholder="20.3"
            ></input>
            <ReactStars
              count={5}
              size={50}
              edit={false}
              value={data.rating}
              color1="#e9ecef"
              color2={"#ffd700"}
            />
          </div>
        </div>
        <div className="text-left flex flex-col dark:text-white">
          <label className="px-2 text-xl">{t('gym.general.note')}</label>
          <textarea
            value={data.note}
            onChange={(e) => setData({ ...data, note: e.target.value })}
            className="resize-none text-2xl p-2 w-80 2xl:w-96 min-h-40 bg-[#e9ecef] shadow-xl rounded-2xl outline-none dark:bg-run-night-element "
            type="text"
            placeholder={t('gym.newTraining.notePlaceholder')}
          ></textarea>
        </div>
      </div>
      <button
        onClick={() => handleAddWorkout()}
        className={`rounded-2xl bg-lime-500 text-xl text-white p-2`}
      >
        {t('gym.newTraining.saveWorkout')}
      </button>
      <ToastContainer/>
    </div>
  );
};

export default GymSummaryPanel;
