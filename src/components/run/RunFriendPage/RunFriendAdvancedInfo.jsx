import { formattedDate } from "../../../functions/formatData";
import { calculateDaysWithUs } from "../../../functions/statsCalculations";
import { useContext } from "react";
import DarkModeContext from "../../../providers/DarkModeProvider";
import { useNavigate } from "react-router-dom";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";
const RunFriendAdvancedInfo = ({ friendInfo, friendId }) => {
  const { darkMode } = useContext(DarkModeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRemoveFriend = async () => {
    const token = getAuthToken();
    try {
      console.log(friendInfo);
      await axios.delete("/shared/deleteFriend", {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: { friend_id: friendId },
      });
      navigate("/run/friends");
    } catch (error) {
      console.error("Failed to remove friend:", error);
    }
  };

  return (
    <div className="w-full xl:w-1/3 flex flex-col justify-center items-center bg-white dark:bg-run-night-element rounded-xl py-5 xl:m-10 xl:px-10 shadow-xl gap-5">
      <div class="w-full flex justify-center items-center flex-wrap gap-5">
        <div
          style={
            darkMode
              ? { backgroundColor: "#0a84ff" }
              : {
                  backgroundImage:
                    "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
                }
          }
          className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center text"
        >
          <label className="text-4xl">{friendInfo?.friends_count}</label>
          <h2 className="text-xl">{t('shared.friends.friends')}</h2>
        </div>
        <div
          style={
            darkMode
              ? { backgroundColor: "#0a84ff" }
              : {
                  backgroundImage:
                    "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
                }
          }
          className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center text"
        >
          <label className="text-4xl">
            {formattedDate(friendInfo?.date_of_birth)}
          </label>
          <h2 className="text-xl">{t('shared.profile.birth')}</h2>
        </div>
        <div
          style={
            darkMode
              ? { backgroundColor: "#0a84ff" }
              : {
                  backgroundImage:
                    "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
                }
          }
          className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center bg-run-night-contrast text"
        >
          <label className="text-4xl">
            {calculateDaysWithUs(friendInfo?.created_at)}
          </label>
          <h2 className="text-xl">{t('shared.profile.daysOnPlatform')}</h2>
        </div>
        <div
          onClick={handleRemoveFriend}
          className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center cursor-pointer bg-[#d90429] text"
        >
          <h2>{t('shared.profile.removeFriend')}</h2>
          <RiDeleteBin6Line/>
        </div>
      </div>
    </div>
  );
};

export default RunFriendAdvancedInfo;
