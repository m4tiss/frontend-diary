import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useUser } from "../../../providers/UserProvider";
import ChartTrainings from "../../shared/charts/ChartTrainings";
import { useState } from "react";

const RunFriendChartModal = ({ toggleDialog, type, friendInfo, friendId }) => {
  const { userInfo } = useUser();

  const renderChartContent = (friendId) => {
    switch (type) {
      case "Pulse":
        return (
          <>
            <h2 className="text-2xl font-semibold">Pulse</h2>
          </>
        );
      case "Trainings":
        return (
          <>
           {friendId === -1 ? <ChartTrainings/> : <ChartTrainings friendId={friendId} />}
          </>
        );
      case "Achievement":
        return (
          <>
            <h2 className="text-2xl font-semibold">View Achievements</h2>
            <label className="text-center px-10">
              Check out your accomplishments and see what goals you've achieved
              so far!
            </label>
            <button className="bg-green-600 p-2 text-white text-2xl rounded">
              View Achievements
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleDialog}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0, y: 300 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.2, opacity: 0, y: 300 }}
        className="bg-white flex flex-col items-center rounded-xl p-6 shadow-xl w-3/4 h-3/4 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center px-10 justify-between">
          <h2 className="text-4xl">Chart {type}</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            onClick={toggleDialog}
            className="mt-4 px-4 py-2 h-fit shadow-xl bg-red-500 text-white rounded"
          >
            Close
          </motion.button>
        </div>
        <div className="w-full flex flex-grow ">
          <div className="w-1/2 flex flex-col items-center flex-grow justify-evenly">
            <div className="flex justify-center items-center gap-5">
              <img
                style={{
                  borderRadius: "50%",
                  width: "80px",
                  height: "80px",
                }}
                className="cursor-pointer object-cover"
                src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${userInfo?.profile_photo}`}
              />
              <h2 className="text-3xl">{userInfo?.nickname}</h2>
            </div>
            {renderChartContent(-1)}
          </div>
          <div className="w-1/2 flex flex-col items-center flex-grow justify-evenly">
            <div className="flex justify-center items-center gap-5">
              <img
                style={{
                  borderRadius: "50%",
                  width: "80px",
                  height: "80px",
                }}
                className="cursor-pointer object-cover"
                src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${friendInfo?.profile_photo}`}
              />
              <h2 className="text-3xl">{friendInfo?.nickname}</h2>
            </div>
            {renderChartContent(friendId)}
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default RunFriendChartModal;
