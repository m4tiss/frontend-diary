import { useEffect } from "react";
import pic from "../../images/profile_photo.jpg";

import FriendDivProfile from "../shared/FriendDivProfile";
import StatsUserProfileSlider from './StatsUserProfileSlider'
import lebronImage from "../../images/lebron.png";
import muskImage from "../../images/musk.jpg";
import crisImage from "../../images/cris.jpg";
import { IoMdAdd } from "react-icons/io";
import { getAuthToken } from "../../config/auth";
import axios from '../../config/axios'


import { GiTrophyCup } from "react-icons/gi";
import { TbCategoryPlus } from "react-icons/tb";
import { GiAchievement } from "react-icons/gi";
import PagePanel from "./PagePanel";

import ChartTrainings from "../shared/charts/ChartTrainings";
import {formattedDate} from "../../functions/formatData"


import { useUser } from '../../providers/UserProvider'

const UserProfile = ({ type }) => {

  const { userInfo } = useUser();

  let linearColor = "";
  if (type === "gym")
    linearColor =
      "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)";
  else
    linearColor =
      "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)";

  return (
    <div className="w-full flex flex-col 2xl:flex-row flex-grow bg-[#e9ecef]">
      <div className="2xl:w-1/3 px-5 2xl:px-0 flex flex-col justify-center items-center">
        <img
          className="border-2 border-black my-5 rounded-full shadow-xl"
          width={250}
          src={pic}
        />
        <div className="bg-white 2xl:w-96 w-full text-center mx-20 p-2 rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold">{userInfo.nickname}</h2>
          <p className="text-lg  text-center">
           {userInfo.description}
          </p>
        </div>
      </div>
      <div className="2xl:w-1/3 flex px-5 2xl:px-0 flex-col ">
        <h2 className="text-4xl 2xl:text-left  text-center font-semibold my-5">
          Friends
        </h2>
        <div className="w-full  h-44 bg-white rounded-xl flex items-center px-10 justify-evenly shadow-xl">
          <FriendDivProfile nickname="Lebron" profileImage={lebronImage} />
          <FriendDivProfile nickname="Musk" profileImage={muskImage} />
          <FriendDivProfile nickname="Cris" profileImage={crisImage} />
          <div className="flex flex-col justify-center items-center gap-2">
            <IoMdAdd className="rounded-full" size={100} />
            <label className="text-xl">Add Friends</label>
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
          <StatsUserProfileSlider created_at={userInfo.created_at}/>
        </div>
      </div>
      <div className="w-full 2xl:w-1/3 mb-10 2xl:mb-0 flex flex-col gap-5 2xl:gap-0 justify-evenly items-center">
        <div className="flex flex-col 2xl:w-96 gap-2 px-5 2xl:px-0 w-full">
          <div className="w-full h-24  bg-white rounded-xl  flex justify-evenly items-center px-10 shadow-xl">
            <div className="flex-grow flex flex-col">
              <label>Email</label>
                <h2 className="text-xl border-white max-w-60 font-semibold">{userInfo.email}</h2>
            </div>
          </div>
          <div className="w-full h-24 bg-white rounded-xl flex justify-evenly items-center  px-10 shadow-xl">
            <div className="flex-grow">
              <label>Date of birth</label>
              <h2 className="text-xl font-semibold">{formattedDate(userInfo.date_of_birth || "0000-00-00")}</h2>
            </div>
          </div>
        </div>
        <ChartTrainings />
      </div>
    </div>
  );
};

export default UserProfile;
