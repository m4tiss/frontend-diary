import { useState, useEffect } from "react";

import FriendDivProfile from "../shared/FriendDivProfile";
import StatsUserProfileSlider from "../shared/StatsUserProfileSlider";
import { IoMdAdd } from "react-icons/io";
import { GoGoal } from "react-icons/go";
import { getAuthToken } from "../../config/auth";
import axios from "../../config/axios";
import { AnimatePresence } from "framer-motion";
import { LuGoal } from "react-icons/lu";
import { GiTrophyCup } from "react-icons/gi";
import { TbCategoryPlus } from "react-icons/tb";
import { GiAchievement } from "react-icons/gi";
import PagePanel from "../shared/PagePanel";
import { useNavigate } from "react-router-dom";
import ChartTrainings from "../shared/charts/ChartTrainings";
import { formattedDate } from "../../functions/formatData";

import { useUser } from "../../providers/UserProvider";
import RunAddGoal from "./RunAddGoal";
import { ToastContainer, toast } from "react-toastify";

const RunUserProfile = () => {
  const { userInfo } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  const successDialog = () => {
    setIsOpen((prev) => !prev);
    toast.success("Goal added!");
  };

  const navigate = useNavigate();

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/getFriends", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.friends;
        console.log(respone);
        setFriends(respone);
      })
      .catch((error) => {
        console.error("Error fetching friends data:", error);
      });
  }, []);

  let linearColor =
    "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)";

  return (
    <div className="w-full flex flex-col 2xl:flex-row flex-grow bg-[#e9ecef]">
      <div className="2xl:w-1/3 px-5 2xl:px-0 flex flex-col justify-center items-center">
        <img
          style={{
            borderRadius: "50%",
            width: "250px",
            height: "250px",
          }}
          className="cursor-pointer object-cover shadow-xl border-2 border-black my-5"
          src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${userInfo.profile_photo}`}
        />
        <div className="bg-white 2xl:w-96 w-full text-center mx-20 p-2 rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold">{userInfo.nickname}</h2>
          <p className="text-lg  text-center">{userInfo.description}</p>
        </div>
      </div>
      <div className="2xl:w-1/3 flex px-5 2xl:px-0 flex-col ">
        <h2 className="text-4xl 2xl:text-left  text-center font-semibold my-5">
          Friends
        </h2>
        <div className="w-full  h-44 bg-white rounded-xl flex items-center px-10 justify-evenly shadow-xl">
          {friends.slice(0, 3).map((user, index) => (
            <FriendDivProfile key={index} user={user} />
          ))}
          <div className="flex flex-col justify-center items-center gap-2">
            <IoMdAdd
            onClick={() => navigate("/run/friends")}
            className="rounded-full cursor-pointer hover:scale-110 duration-200 hover:rotate-90" size={100} />
            <label className="text-xl">Add Friends</label>
          </div>
        </div>

        <div className="h-fit flex-wrap flex bg-white p-5 justify-center gap-5 my-10 rounded-xl shadow-xl">
          <PagePanel
            type={"run"}
            title="Show records"
            icon={<GiTrophyCup size={50} color="white" />}
          />
          <PagePanel
            type={"run"}
            title="Add category"
            icon={<TbCategoryPlus size={50} color="white" />}
          />
          <PagePanel
            onClick={() => navigate("/run/achievements")}
            type={"run"}
            title="Show achievements"
            icon={<GiAchievement size={50} color="white" />}
          />
          <PagePanel
            onClick={toggleDialog}
            type={"run"}
            title="Add new goal"
            icon={<GoGoal size={50} color="white" />}
          />
          <PagePanel
            onClick={() => navigate("/run/goals")}
            type={"run"}
            title="Show goals"
            icon={<LuGoal size={50} color="white" />}
          />
          <PagePanel
            type={"run"}
            title="..."
            icon={<GoGoal size={50} color="white" />}
          />
          <AnimatePresence>
            {isOpen && (
              <RunAddGoal
                toggleDialog={toggleDialog}
                successDialog={successDialog}
              />
            )}
          </AnimatePresence>
        </div>
        <div
          style={{
            "background-image": linearColor,
          }}
          className="h-32 mb-10 rounded-xl shadow-xl"
        >
          <StatsUserProfileSlider
            friends={userInfo.friends_count}
            created_at={userInfo.created_at}
          />
        </div>
      </div>
      <div className="w-full 2xl:w-1/3 mb-10 2xl:mb-0 flex flex-col gap-5 2xl:gap-0 justify-evenly items-center">
        <div className="flex flex-col 2xl:w-96 gap-2 px-5 2xl:px-0 w-full">
          <div className="w-full h-24  bg-white rounded-xl  flex justify-evenly items-center px-10 shadow-xl">
            <div className="flex-grow flex flex-col">
              <label>Email</label>
              <h2 className="text-xl border-white max-w-60 font-semibold">
                {userInfo.email}
              </h2>
            </div>
          </div>
          <div className="w-full h-24 bg-white rounded-xl flex justify-evenly items-center  px-10 shadow-xl">
            <div className="flex-grow">
              <label>Date of birth</label>
              <h2 className="text-xl font-semibold">
                {formattedDate(userInfo.date_of_birth || "0000-00-00")}
              </h2>
            </div>
          </div>
        </div>
        <ChartTrainings />
        <ToastContainer />
      </div>
    </div>
  );
};

export default RunUserProfile;
