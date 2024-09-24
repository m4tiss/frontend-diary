
import { formattedDate } from "../../../functions/formatData";
import { calculateDaysWithUs } from "../../../functions/statsCalculations";
import { useContext } from "react";
import DarkModeContext from "../../../providers/DarkModeProvider";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
const GymFriendAdvancedInfo = ({ friendInfo }) => {
  const { t } = useTranslation();
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className="w-full xl:w-1/3 flex flex-col justify-center items-center bg-white dark:bg-run-night-element rounded-xl py-5 xl:m-10 xl:px-10 shadow-xl gap-5">
          <div class="w-full flex justify-center items-center  flex-wrap gap-5">
            <div 
            style={
                darkMode
                  ? { backgroundColor: "#f85c8c" }
                  : {
                      backgroundImage:
                        "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
                    }
              }
            className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center text">
              <label className="text-4xl">{friendInfo?.friends_count}</label>
              <h2 className="text-xl">{t('shared.friends.friends')}</h2>
            </div>
            <div 
            
            style={
                darkMode
                  ? { backgroundColor: "#f85c8c" }
                  : {
                      backgroundImage:
                        "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
                    }
              }
              className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center text">
              <label className="text-4xl">
                {formattedDate(friendInfo?.date_of_birth)}
              </label>
              <h2 className="text-xl">{t('shared.profile.birth')}</h2>
            </div>
            <div
              style={
                darkMode
                  ? { backgroundColor: "#f85c8c" }
                  : {
                      backgroundImage:
                        "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
                    }
              }
              className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center bg-run-night-contrast text"
            >
              <label className="text-4xl">
                {calculateDaysWithUs(friendInfo?.created_at)}
              </label>
              <h2 className="text-xl">{t('shared.profile.daysOnPlatform')}</h2>
            </div>
            <div className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col
            justify-center items-center cursor-pointer bg-[#d90429] text gap-2">
              <h2>{t('shared.profile.removeFriend')}</h2>
              <RiDeleteBin6Line/>
            </div>
          </div>
        </div>
    );
  };
  
  export default GymFriendAdvancedInfo;
  