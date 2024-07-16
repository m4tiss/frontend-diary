import pic from "../../images/profile_photo.jpg";
import { BarChart } from "@mui/x-charts";
import { MdModeEdit } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import FriendDivProfile from "../shared/FriendDivProfile";
import lebronImage from "../../images/lebron.png";
import muskImage from "../../images/musk.jpg";
import crisImage from "../../images/cris.jpg";
import { IoMdAdd } from "react-icons/io";
import { Autoplay } from "swiper/modules";
import ProfileStatsSlide from "./ProfileStatsSlide";
import { GiTrophyCup } from "react-icons/gi";
import { TbCategoryPlus } from "react-icons/tb";
import { GiAchievement } from "react-icons/gi";
import PagePanel from "./PagePanel";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import ChartTrainings from "../shared/charts/ChartTrainings";

import SwiperCore from "swiper";

SwiperCore.use([Autoplay]);

const UserProfile = ({ type }) => {
  let linearColor = "";
  if (type === "gym")
    linearColor =
      "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)";
  else
    linearColor =
      "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)";


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
          <h2 className="text-4xl 2xl:text-left text-center font-semibold my-5">
            Friends
          </h2>
          <div className="2xl:w-full  h-44 bg-white rounded-xl flex items-center px-10 justify-evenly shadow-xl">
            <FriendDivProfile nickname="Lebron" profileImage={lebronImage} />
            <FriendDivProfile nickname="Musk" profileImage={muskImage} />
            <FriendDivProfile nickname="Cris" profileImage={crisImage} />
            <div className="flex flex-col justify-center items-center gap-2">
              <IoMdAdd className="rounded-full" size={100} />
              <label className="text-xl">Add Friends</label>
            </div>
          </div>
        </div>

        <div className=" h-fit flex-wrap flex flex-col bg-white p-5 gap-5 my-10 rounded-xl shadow-xl">
          <PagePanel
            title="Show your records"
            icon={<GiTrophyCup size={50} color="white" />}
          />
          <PagePanel
            title="Add category"
            icon={<TbCategoryPlus size={50} color="white" />}
          />
          <PagePanel
            title="Show achievements"
            icon={<GiAchievement size={50} color="white" />}
          />
        </div>
        <div
          style={{
            "background-image": linearColor,
          }}
          className="h-32 mb-10 rounded-xl shadow-xl"
        >
          <Swiper
            autoplay={{ delay: 3000 }}
            slidesPerView={1}
            grabCursor={true}
            loop={true}
          >
            <SwiperSlide>
              <ProfileStatsSlide number={572} description="Friends" />
            </SwiperSlide>
            <SwiperSlide>
              <ProfileStatsSlide number={432} description="All trainings" />
            </SwiperSlide>
            <SwiperSlide>
              <ProfileStatsSlide number={264} description="Days with us" />
            </SwiperSlide>
            <SwiperSlide>
              <ProfileStatsSlide
                number={300}
                description="Comments on platform"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="w-full 2xl:w-1/3 flex flex-col gap-5 2xl:gap-0 justify-evenly items-center">
        <div className="flex flex-col gap-2">
          <div className="w-full 2xl:w-96 h-24 bg-white rounded-xl flex justify-evenly items-center px-10 shadow-xl">
            <div className="flex-grow">
              <label>Email</label>
              <h2>mateusz039@op.pl</h2>
            </div>

            <MdModeEdit className="w-fit" size={30} />
          </div>
          <div className="w-full 2xl:w-96 h-24 bg-white rounded-xl flex justify-evenly items-center  px-10 shadow-xl">
            <div className="flex-grow">
              <label>Date of birth</label>
              <h2>08.05.2002</h2>
            </div>

            <MdModeEdit className="w-fit" size={30} />
          </div>
        </div>
        <ChartTrainings />
      </div>
    </div>
  );
};

export default UserProfile;
