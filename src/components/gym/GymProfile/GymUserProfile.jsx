import { useState, useEffect } from "react";
import FriendDivProfile from "../../shared/FriendDivProfile";
import StatsUserProfileSlider from "../../shared/StatsUserProfileSlider";
import { IoMdAdd } from "react-icons/io";
import { GoGoal } from "react-icons/go";
import { TbTimelineEvent } from "react-icons/tb";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import { AnimatePresence } from "framer-motion";
import { LuGoal } from "react-icons/lu";
import { GiTrophyCup } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import PagePanel from "../../shared/PagePanel";
import { useNavigate } from "react-router-dom";
import { GiAchievement } from "react-icons/gi";
import ChartTrainings from "../../shared/charts/ChartTrainings";
import { formattedDate } from "../../../functions/formatData";
import { TbNotes, TbNotesOff } from "react-icons/tb";
import { useUser } from "../../../providers/UserProvider";
import { ToastContainer, toast } from "react-toastify";
import GymAddRoutine from "../GymRoutine/GymAddRoutine";
import GymRemoveRoutine from "../GymRoutine/GymRemoveRoutine";
import GymAddGoal from "../GymGoals/GymAddGoal"

const GymUserProfile = () => {
  const { t } = useTranslation();
  const { userInfo } = useUser();
  const [isRemoveRoutineOpen, setIsRemoveRoutineOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(false);
  const [isRoutineOpen, setIsRoutineOpen] = useState(false);
  const [visibleFriendsCount, setVisibleFriendsCount] = useState(
    getVisibleFriendsCount()
  );

  const toggleRoutineDialog = () => {
    setIsRoutineOpen((prev) => !prev);
  };

  const successRoutineDialog = () => {
    setIsRoutineOpen((prev) => !prev);
    toast.success("Routine added!");
  };

  const toggleRemoveRoutineDialog = () => {
    setIsRemoveRoutineOpen((prev) => !prev);
  };

  const successRemoveRoutine = () => {
    setIsRemoveRoutineOpen((prev) => !prev);
    toast.success("Routine removed!");
  };

  const toggleGoalDialog = () => {
    setIsGoalOpen((prev) => !prev);
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
    <div className="w-full flex flex-col 2xl:flex-row flex-grow bg-[#e9ecef] dark:bg-gym-night-background">
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
        <div className="w-full overflow-hidden h-44 dark:bg-run-night-element dark:text-white bg-white rounded-xl flex items-center px-10 justify-evenly my-5 shadow-xl">
          {friends.slice(0, visibleFriendsCount).map((user, index) => (
            <FriendDivProfile key={index} user={user} />
          ))}
          <div className="flex flex-col justify-center items-center gap-2">
            <IoMdAdd
              onClick={() => navigate("/gym/friends")}
              className="rounded-full cursor-pointer hover:scale-110 duration-200 hover:rotate-90"
              size={100}
            />
            <label className="text-xl">{t("shared.friends.addFriend")}</label>
          </div>
        </div>

        <div className="h-fit flex-wrap flex dark:bg-run-night-element dark:text-white bg-white p-5 justify-center gap-5 my-5 rounded-xl shadow-xl">
          <PagePanel
            onClick={() => navigate("/gym/records")}
            type={"gym"}
            title={t("gym.profile.showRecords")}
            icon={<GiTrophyCup size={50} color="white" />}
          />
          <PagePanel
            onClick={() => navigate("/gym/posts")}
            type={"gym"}
            title={t('gym.profile.social')}
            icon={<TbTimelineEvent size={50} color="white" />}
          />
          <PagePanel
            onClick={toggleRoutineDialog}
            type={"gym"}
            title={t("gym.profile.addRoutine")}
            icon={<TbNotes size={50} color="white" />}
          />
          <PagePanel
            onClick={toggleRemoveRoutineDialog}
            type={"gym"}
            title={t("gym.profile.removeRoutine")}
            icon={<TbNotesOff size={50} color="white" />}
          />
          <PagePanel
            onClick={toggleGoalDialog}
            type={"gym"}
            title={t("gym.profile.addNewGoal")}
            icon={<GoGoal size={50} color="white" />}
          />
          <PagePanel
            //onClick={() => navigate("/run/goals")}
            type={"gym"}
            title={t("gym.profile.showGoals")}
            icon={<LuGoal size={50} color="white" />}
          />
          <PagePanel
            onClick={() => navigate("/gym/achievements")}
            type={"gym"}
            title={t("gym.profile.showAchievements")}
            icon={<GiAchievement size={50} color="white" />}
          />

          <AnimatePresence>
            {isGoalOpen && (
              <GymAddGoal
              toggleGoalDialog={toggleGoalDialog}
              successGoalDialog={successGoalDialog}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isRemoveRoutineOpen && (
              <GymRemoveRoutine
                toggleRemoveRoutineDialog={toggleRemoveRoutineDialog}
                successRemoveRoutine={successRemoveRoutine}
              />
            )}
          </AnimatePresence>

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
            "backgroundImage": linearColor,
          }}
          className="h-32 mb-5 rounded-xl shadow-xl"
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
              <label>{t("gym.profile.email")}</label>
              <h2 className="text-xl border-white max-w-60 font-semibold">
                {userInfo.email}
              </h2>
            </div>
          </div>
          <div className="w-full h-24 dark:bg-run-night-element dark:text-white bg-white rounded-xl flex justify-evenly items-center  px-10 shadow-xl">
            <div className="flex-grow">
              <label>{t("gym.profile.birth")}</label>
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

export default GymUserProfile;
