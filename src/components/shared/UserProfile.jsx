import pic from "../../images/profile_photo.jpg";
import { BarChart } from "@mui/x-charts";
import { MdModeEdit } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import FriendDivProfile from "../shared/FriendDivProfile"
import lebronImage from "../../images/lebron.png";
import muskImage from "../../images/musk.jpg";
import crisImage from "../../images/cris.jpg";
import { IoMdAdd } from "react-icons/io";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import SwiperCore from "swiper";

SwiperCore.use([Autoplay]);


const UserProfile = ({type}) => {

    let linearColor = ""
    if( type === "gym") linearColor = "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)"
    else linearColor = "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)"


  const data = {
    xAxis: [
      {
        scaleType: "band",
        data: ["May", "June", "July", "August", "September"],
        label: "Months",
      },
    ],
    yAxis: [{ label: "Trainings" }],
    series: [
      { name: "Run", data: [2, 7, 3, 13, 2], color: "#1DA1F2", label: "Run" },
      { name: "Gym", data: [3, 4, 1, 15, 5], color: "#FF0000", label: "Gym" },
    ],
  };

  return (
    <div className="w-full flex flex-col 2xl:flex-row flex-grow bg-[#e9ecef]">
      <div className="2xl:w-1/3 flex flex-col justify-center items-center">
        <img
          className="border-2 border-black my-5 rounded-full shadow-xl"
          width={250}
          src={pic}
        />
        <div className="bg-white text-center mx-20 p-2 rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold">m4tiss</h2>
          <p className="text-lg  text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing eunt numquam
            amet similique. Aliquid.
          </p>
        </div>
      </div>
      <div className="2xl:w-1/3 flex flex-col ">
        <div>
          <h2 className="text-4xl 2xl:text-left text-center font-semibold my-5">Friends</h2>
          <div className="2xl:w-full  h-44 bg-white rounded-xl flex items-center px-10 justify-evenly shadow-xl">
            <FriendDivProfile nickname="Lebron" profileImage={lebronImage}/>
            <FriendDivProfile nickname="Musk" profileImage={muskImage}/>
            <FriendDivProfile nickname="Cris" profileImage={crisImage}/>
            <div className="flex flex-col justify-center items-center gap-2">
              <IoMdAdd className="rounded-full" size={100} />
              <label className="text-xl">Add Friends</label>
            </div>
          </div>
        </div>

        <div className="flex-grow bg-white my-10 rounded-xl shadow-xl"></div>
        <div
          style={{
            "background-image": linearColor,
          }}
          className="h-32 my-10 rounded-xl shadow-xl"
        >
          <Swiper
            autoplay={{ delay: 3000 }}
            slidesPerView={1}
            grabCursor={true}
            loop={true}
          >
            <SwiperSlide>
              <div className="w-full h-32 flex flex-col justify-center items-center">
                <h2 className="text-6xl text-white">572</h2>
                <h2 className="text-xl text-white">Friends</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-32 flex flex-col justify-center items-center">
                <h2 className="text-6xl text-white">432</h2>
                <h2 className="text-xl text-white">All trainings</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-32 flex flex-col justify-center items-center">
                <h2 className="text-6xl text-white">264</h2>
                <h2 className="text-xl text-white">Days with us</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="w-full h-32 flex flex-col justify-center items-center">
                <h2 className="text-6xl text-white">300</h2>
                <h2 className="text-xl text-white">Comments on platform</h2>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="w-full 2xl:w-1/3 flex flex-col gap-5 2xl:gap-0 justify-evenly items-center">
          <div className="flex flex-col gap-2">
            <div className="w-full 2xl:w-96 h-24 bg-white rounded-xl flex justify-evenly items-center p-2 shadow-xl">
              <div>
                <label>Email</label>
                <h2>mateusz039@op.pl</h2>
              </div>

              <MdModeEdit size={30} />
            </div>
            <div className="w-full 2xl:w-96 h-24 bg-white rounded-xl flex justify-evenly items-center p-2 shadow-xl">
              <div>
                <label>Date of birth</label>
                <h2>08.05.2002</h2>
              </div>

              <MdModeEdit size={30} />
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-xl">
            <BarChart
              xAxis={data.xAxis}
              yAxis={data.yAxis}
              series={data.series}
              width={window.innerWidth > 768 ? 500 : 300}
              height={300}
            />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
