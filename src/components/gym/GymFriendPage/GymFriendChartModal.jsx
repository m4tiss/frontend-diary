import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useUser } from "../../../providers/UserProvider";
import ChartTrainings from "../../shared/charts/ChartTrainings";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ChartMuscleUsed from "../charts/ChartMuscleUsed";
import ChartVolume from "../charts/ChartVolume";
import ChartSets from "../charts/ChartSets";
import ChartDuration from "../charts/ChartDuration";
import ChartRating from "../charts/ChartRating";

const GymFriendChartModal = ({ toggleDialog, type, friendInfo, friendId }) => {
  const { t } = useTranslation();
  const { userInfo } = useUser();

  const renderChartContent = (friendId) => {
    switch (type) {
      case "Muscles":
        return (
          <>
            {friendId === -1 ? (
              <ChartMuscleUsed />
            ) : (
              <ChartMuscleUsed friendId={friendId} />
            )}
          </>
        );
      case "Workouts":
        return (
          <>
            {friendId === -1 ? (
              <ChartTrainings />
            ) : (
              <ChartTrainings friendId={friendId} />
            )}
          </>
        );
      case "Volume":
        return (
          <>
            {friendId === -1 ? (
              <ChartVolume />
            ) : (
              <ChartVolume friendId={friendId} />
            )}
          </>
        );
      case "Sets":
        return (
          <>
            {friendId === -1 ? (
              <ChartSets />
            ) : (
              <ChartSets friendId={friendId} />
            )}
          </>
        );

      case "Duration":
        return (
          <>
            {friendId === -1 ? (
              <ChartDuration />
            ) : (
              <ChartDuration friendId={friendId} />
            )}
          </>
        );
      case "Rating":
        return (
          <>
            {friendId === -1 ? (
              <ChartRating />
            ) : (
              <ChartRating friendId={friendId} />
            )}
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
        className="bg-white flex flex-col items-center rounded-xl p-6 shadow-xl w-11/12 h-5/6 xl:w-3/4 xl:h-3/4 overflow-auto gap-10 xl:gap-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex flex-col xl:flex-row items-center px-10 justify-between">
          <h2 className="text-4xl">{t('shared.chart.chart')} {t(`shared.chart.${type}`)}</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            onClick={toggleDialog}
            className="mt-4 px-4 py-2 h-fit shadow-xl bg-red-500 text-white rounded"
          >
            {t('shared.actions.close')}
          </motion.button>
        </div>
        <div className="w-full flex flex-col xl:flex-row flex-grow gap-10 xl:gap-0">
          <div className="w-full xl:w-1/2 flex flex-col items-center flex-grow justify-evenly gap-10 xl:gap-0">
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
          <div className="w-full xl:w-1/2 flex flex-col items-center flex-grow justify-evenly gap-10 xl:gap-0">
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

export default GymFriendChartModal;
