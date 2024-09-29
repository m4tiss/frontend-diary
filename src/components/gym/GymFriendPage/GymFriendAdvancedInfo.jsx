import { formattedDate } from "../../../functions/formatData";
import { calculateDaysWithUs } from "../../../functions/statsCalculations";
import { useNavigate } from "react-router-dom";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const GymFriendAdvancedInfo = ({ friendInfo, friendId }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRemoveFriend = async () => {
    const token = getAuthToken();
    try {
      await axios.delete("/shared/deleteFriend", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { friend_id: friendId },
      });
      navigate("/gym/friends");
    } catch (error) {
      console.error("Failed to remove friend:", error.response?.data || error.message);
    }
  };

  const StatCard = ({ value, label }) => (
    <div
      style={{
        backgroundImage: `linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)`,
      }}
      className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center"
    >
      <span className="text-4xl">{value}</span>
      <h2 className="text-xl">{label}</h2>
    </div>
  );

  return (
    <section className="w-full xl:w-1/3 flex flex-col justify-center items-center bg-white dark:bg-run-night-element rounded-xl py-5 xl:m-10 xl:px-10 shadow-xl gap-5">
      <div className="w-full flex justify-center items-center flex-wrap gap-5">
        <StatCard
          value={friendInfo?.friends_count}
          label={t("shared.friends.friends")}
        />
        <StatCard
          value={formattedDate(friendInfo?.date_of_birth)}
          label={t("shared.profile.birth")}
        />
        <StatCard
          value={calculateDaysWithUs(friendInfo?.created_at)}
          label={t("shared.profile.daysOnPlatform")}
        />
        <div
          onClick={handleRemoveFriend}
          className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center cursor-pointer bg-[#d90429]"
        >
          <h2>{t("shared.profile.removeFriend")}</h2>
          <RiDeleteBin6Line />
        </div>
      </div>
    </section>
  );
};

export default GymFriendAdvancedInfo;