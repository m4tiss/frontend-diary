import { useTranslation } from "react-i18next";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { motion } from "framer-motion";

const FriendPendingPanel = ({ user, onDelete }) => {
  const { t } = useTranslation();
  const acceptInvitation = async (friend_id) => {
    const token = getAuthToken();
    const resposne = await axios.post(
      "/shared/acceptInvitation",
      { friend_id: friend_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(resposne);
  };

  const handleAccept = async () => {
    try {
      await acceptInvitation(user.user_id);
      onDelete();
    } catch (error) {
      console.error("Error accepting invitation:", error);
    }
  };

  return (
    <motion.div
      className="flex flex-col xl:flex-row justify-evenly items-center shadow-xl gap-5 p-10 w-full h-96 bg-white"
    >
      <div className="flex flex-col items-center gap-5">
      <img
        style={{
          borderRadius: "50%",
          width: "200px",
          height: "200px",
        }}
        className="object-cover"
        src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${user.profile_photo}`}
      />
      <label className="text-2xl">{user.nickname}</label>
      </div>
      <div className="flex flex-col items-center gap-10">
        <h2 className=" hidden xl:flex text-4xl text-center">{user.nickname} {t('shared.friends.invitationText')}</h2>
      <div className="flex gap-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
          className=" bg-lime-400 text-white text-2xl xl:text-4xl p-3 rounded-xl"
          onClick={handleAccept}
        >
         {t('shared.friends.accept')}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
          className=" bg-red-400 text-white text-2xl xl:text-4xl p-3 rounded-xl"
        >
          {t('shared.friends.reject')}
        </motion.button>
      </div>
      </div>
      
    </motion.div>
  );
};

export default FriendPendingPanel;
