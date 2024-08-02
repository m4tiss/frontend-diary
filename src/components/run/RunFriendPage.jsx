import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { formattedDate } from "../../functions/formatData";
import { calculateDaysWithUs } from "../../functions/statsCalculations";
import ChartAveragePulse from "./charts/ChartAveragePulse";
import { TbRun } from "react-icons/tb";
import FriendChartPanel from "../shared/FriendChartPanel";
import { CiDumbbell } from "react-icons/ci";
import { BsHeartPulse } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { useContext } from "react";
import DarkModeContext from "../../providers/DarkModeProvider";
import { TbCategory } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
const RunFriendPage = () => {
  const { id } = useParams();
  const [friendInfo, setFriendInfo] = useState({});
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/getFriendInfo", {
        params: { friend_id: id },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let response = res.data.friendInfo;
        console.log(response);
        setFriendInfo(response);
      })
      .catch((error) => {
        console.error("Error fetching friend info:", error);
      });
  }, [id]);

  return (
    <div className="w-full flex flex-col flex-grow bg-[#e9ecef] dark:bg-run-night-background">
      <div className="w-full flex items-center h-fit justify-evenly my-10">
        <img
          style={{
            borderRadius: "50%",
            width: "250px",
            height: "250px",
          }}
          className="cursor-pointer object-cover shadow-xl border-2 border-black dark:border-white my-5"
          src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${friendInfo?.profile_photo}`}
        />
        <div className="bg-white dark:bg-run-night-element min-w-96 w-1/2 gap-5 flex flex-col dark:text-white text-center p-2 rounded-xl shadow-xl">
          <h2 className="text-3xl font-semibold">{friendInfo?.nickname}</h2>
          <p className="text-lg">{friendInfo?.description}</p>
        </div>
      </div>
      <div className="w-full flex justify-center flex-grow">
        <div className="w-1/3 flex flex-col justify-start items-center bg-white dark:bg-run-night-element rounded-xl m-10 px-10 shadow-xl gap-5">
          <h2 className="text-3xl my-5 dark:text-white">Informations</h2>
          <div className="w-96 rounded-xl text-white text-3xl p-2 flex justify-evenly bg-run-night-contrast text">
            <h2 className="font-semibold">Friends</h2>
            <label>{friendInfo?.friends_count}</label>
          </div>
          <div className="w-96 rounded-xl text-white text-3xl p-2 flex justify-evenly bg-run-night-contrast text">
            <h2 className="font-semibold">Birth Date</h2>
            <label>{formattedDate(friendInfo?.date_of_birth)}</label>
          </div>
          <div 
          style={
            darkMode
              ? { backgroundColor: "#2a2a42" }
              : {
                  backgroundImage:
                   "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
                }
          }
          className="w-96 rounded-xl text-white text-3xl p-2 flex justify-evenly bg-run-night-contrast text">
            <h2 className="font-semibold">Days on platform</h2>
            <label>{calculateDaysWithUs(friendInfo?.created_at)}</label>
          </div>
          <div className="w-96 rounded-xl text-white text-3xl p-2 flex justify-center cursor-pointer bg-[#d90429] text">
            <h2 className="font-semibold">Remove friend</h2>
          </div>
        </div>
        <div className="w-1/3 flex flex-col justify-start items-center bg-white dark:bg-run-night-element rounded-xl m-10 shadow-xl">
          <h2 className="text-3xl my-5 dark:text-white">Charts</h2>
          <div className="flex flex-wrap gap-5 justify-center">
            <FriendChartPanel
              type={"run"}
              title="Average pulse"
              icon={<BsHeartPulse size={50} color="white" />}
            />
            <FriendChartPanel
              type={"run"}
              title="Trainings"
              icon={<CiDumbbell size={50} color="white" />}
            />
            <FriendChartPanel
              type={"run"}
              title="Distance"
              icon={<TbRun size={50} color="white" />}
            />
            <FriendChartPanel
              type={"run"}
              title="Friends"
              icon={<FaUserFriends size={50} color="white" />}
            />
            <FriendChartPanel
              type={"run"}
              title="Categories"
              icon={<TbCategory size={50} color="white" />}
            />
            <FriendChartPanel
              type={"run"}
              title="Time"
              icon={<MdOutlineAccessTime size={50} color="white" />}
            />
          </div>
        </div>
        <div className="w-1/3 flex justify-center items-center bg-white dark:bg-run-night-element rounded-xl m-10 shadow-xl">
          <h2 className="text-3xl">Actions</h2>
        </div>
      </div>
    </div>
  );
};

export default RunFriendPage;
