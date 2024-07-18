import { useEffect } from "react";
import pic from "../../images/profile_photo.jpg";
import { MdModeEdit } from "react-icons/md";

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


import { useState } from "react";



const UserProfile = ({ type }) => {
  let linearColor = "";
  if (type === "gym")
    linearColor =
      "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)";
  else
    linearColor =
      "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)";

  const [editEmail, setEditEmail] = useState(false);
  const [email, setEmail] = useState("mateusz039@op.pl");
  const [userInfo, setUserInfo] = useState({})

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/userInfo", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let response = res.data.data;
        setUserInfo(response)
        setEmail(response.email)
      });
  }, []);

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
              <label className="px-2">Email</label>
              {!editEmail ? (
                <h2 className="text-xl px-2 max-w-60 font-semibold">{email}</h2>
              ) : (
              <input
                className="text-xl px-2 bg-gray-300 font-semibold rounded-xl outline-none w-fit"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                maxLength={25}
              />
              )}
            </div>
            {!editEmail ? (<MdModeEdit
              onClick={()=> setEditEmail((prev)=>(!prev))}
              className="w-fit cursor-pointer hover:scale-125 duration-200"
              size={30}
            />): (<button
            onClick={()=> setEditEmail((prev)=>(!prev))}  
            className="text-4xl text-lime-400 cursor-pointer hover:scale-125 duration-200">✓</button>)}
            
          </div>
          <div className="w-full h-24 bg-white rounded-xl flex justify-evenly items-center  px-10 shadow-xl">
            <div className="flex-grow">
              <label>Date of birth</label>
              <h2 className="text-xl font-semibold">{formattedDate(userInfo.date_of_birth || "0000-00-00")}</h2>
            </div>
            <MdModeEdit
              className="cursor-pointer hover:scale-125 duration-200 w-fit"
              size={30}
            />
          </div>
        </div>
        <ChartTrainings />
      </div>
    </div>
  );
};

export default UserProfile;
