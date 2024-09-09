import { useState, useEffect } from "react";
import { TbNotesOff } from "react-icons/tb";
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
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import PagePanel from "../shared/PagePanel";
import { useNavigate } from "react-router-dom";
import ChartTrainings from "../shared/charts/ChartTrainings";
import { formattedDate } from "../../functions/formatData";
import { TbNotes } from "react-icons/tb";

import { useUser } from "../../providers/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import GymAddRoutine from "./GymAddRoutine";

const RunUserProfile = () => {
  const { userInfo } = useUser();
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [isRoutineOpen, setIsRoutineOpen] = useState(false);
  const [visibleFriendsCount, setVisibleFriendsCount] = useState(
    getVisibleFriendsCount()
  );

  const toggleGoalDialog = () => {
    setIsGoalOpen((prev) => !prev);
  };

  const toggleRoutineDialog = () => {
    setIsRoutineOpen((prev) => !prev);
  };

  const successRoutineDialog = () => {
    setIsRoutineOpen((prev) => !prev);
    toast.success("Routine added!");
  };

  const successGoalDialog = () => {
    setIsGoalOpen((prev) => !prev);
    toast.success("Goal added!");
  };

  function getVisibleFriendsCount() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      return 1;
    } else if (screenWidth < 1024) {
      return 2;
    } else {
      return 3;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setVisibleFriendsCount(getVisibleFriendsCount());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)";

  return (
    <div className="w-full flex flex-col 2xl:flex-row flex-grow bg-[#e9ecef] dark:bg-run-night-background">
      <div className="2xl:w-1/3 px-5 2xl:px-0 flex flex-col justify-center items-center">
        <img
          style={{
            borderRadius: "50%",
            width: "250px",
            height: "250px",
          }}
          className="cursor-pointer object-cover shadow-xl border-2 border-black dark:border-white my-5"
          src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${userInfo.profile_photo}`}
        />
        <div className="bg-white dark:bg-run-night-element dark:text-white 2xl:w-96 w-full text-center mx-20 p-2 rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold">{userInfo.nickname}</h2>
          <p className="text-lg text-center overflow-x-hidden">
            {userInfo.description}
          </p>
        </div>
      </div>
      <div className="2xl:w-1/3 flex px-5 2xl:px-0 flex-col ">
        <h2 className="text-4xl 2xl:text-left dark:text-white  text-center font-semibold my-5">
          Friends
        </h2>
        <div className="w-full overflow-hidden h-44 dark:bg-run-night-element dark:text-white bg-white rounded-xl flex items-center px-10 justify-evenly shadow-xl">
          {friends.slice(0, visibleFriendsCount).map((user, index) => (
            <FriendDivProfile key={index} user={user} />
          ))}
          <div className="flex flex-col justify-center items-center gap-2">
            <IoMdAdd
              onClick={() => navigate("/gym/friends")}
              className="rounded-full cursor-pointer hover:scale-110 duration-200 hover:rotate-90"
              size={100}
            />
            <label className="text-xl">Add Friends</label>
          </div>
        </div>

        <div className="h-fit flex-wrap flex dark:bg-run-night-element dark:text-white bg-white p-5 justify-center gap-5 my-10 rounded-xl shadow-xl">
          <PagePanel
            onClick={() => navigate("/gym/records")}
            type={"gym"}
            title="Show records"
            icon={<GiTrophyCup size={50} color="white" />}
          />
          <PagePanel
            onClick={toggleRoutineDialog}
            type={"gym"}
            title="Add routine"
            icon={<TbNotes size={50} color="white" />}
          />
          <PagePanel
            //onClick={() => navigate("/run/achievements")}
            type={"gym"}
            title="Show achievements"
            icon={<GiAchievement size={50} color="white" />}
          />
          <PagePanel
           //onClick={toggleGoalDialog}
            type={"gym"}
            title="Add new goal"
            icon={<GoGoal size={50} color="white" />}
          />
          <PagePanel
            //onClick={() => navigate("/run/goals")}
            type={"gym"}
            title="Show goals"
            icon={<LuGoal size={50} color="white" />}
          />
          <PagePanel
            onClick={() => navigate("/gym/chats")}
            type={"gym"}
            title="Chats"
            icon={<IoChatboxEllipsesOutline size={50} color="white" />}
          />
          
          {/* <AnimatePresence>
            {isGoalOpen && (
              <RunAddGoal
                toggleGoalDialog={toggleGoalDialog}
                successGoalDialog={successGoalDialog}
              />
            )}
          </AnimatePresence> */}

          <AnimatePresence>
            {isRoutineOpen && (
              <GymAddRoutine
                toggleRoutineDialog={toggleRoutineDialog}
                successRoutineDialog={successRoutineDialog}
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
          <div className="w-full h-24 dark:bg-run-night-element dark:text-white bg-white rounded-xl  flex justify-evenly items-center px-10 shadow-xl">
            <div className="flex-grow flex flex-col">
              <label>Email</label>
              <h2 className="text-xl border-white max-w-60 font-semibold">
                {userInfo.email}
              </h2>
            </div>
          </div>
          <div className="w-full h-24 dark:bg-run-night-element dark:text-white bg-white rounded-xl flex justify-evenly items-center  px-10 shadow-xl">
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
