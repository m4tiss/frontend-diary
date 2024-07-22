import RunGoalPanel from './RunGoalPanel'
import axios from '../../config/axios'
import { getAuthToken } from '../../config/auth';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';




const RunGoals = () => {

  const [goals,setGoals] = useState([])

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/goal/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.goals
        console.log(res.data.goals)
        setGoals(respone)
      })
      .catch((error) => {
        console.error("Error fetching pulse data:", error);
      });
  }, []);


  return (
    <div className="w-full flex flex-grow bg-[#e9ecef]">
      <div className="w-1/2 flex flex-col text-center items-center justify-center gap-5">
        <h2 className="text-black text-7xl">Achieve Your Running Goals</h2>
        <label className="text-black text-2xl px-10">
          Unlock your full potential as a runner with our ultimate guide to
          achieving your running goals. Whether you're aiming to complete your
          first 5K, conquer a marathon, or improve your personal best, this
          guide provides you with the tools and strategies you need. Learn how
          to create an effective training plan, stay motivated, and overcome
          challenges with confidence. Packed with expert advice, inspiring
          stories, and practical tips, this guide will help you cross the finish
          line and celebrate your running achievements. Take the first step
          towards your running success today!
        </label>
      </div>

      <div className="w-1/2 flex px-40 py-20 justify-center items-center">
      <Swiper
      className='w-full h-full shadow-xl'
        slidesPerView={1}
        grabCursor={true}
        spaceBetween={30}
        navigation={true}
        modules={[Navigation]}
  
      >
        {goals.map((goal, index) => (
        <SwiperSlide key={index}>
          <RunGoalPanel
            goal={goal}
          />
        </SwiperSlide>
      ))}
      </Swiper>
      </div>
    </div>
  );
};

export default RunGoals;
