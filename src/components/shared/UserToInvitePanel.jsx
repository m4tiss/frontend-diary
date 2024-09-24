import { useTranslation } from "react-i18next";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import { motion } from "framer-motion";

const UserToInvitePanel = ({ user, onDelete }) => {
  const { t } = useTranslation();
  const sendInvitation = async (friend_id) => {
    const token = getAuthToken();
    const resposne = await axios.post(
      "/shared/sendInvitation",
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

  const handleSending = () => {
    sendInvitation(user.user_id);
    onDelete();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="flex flex-col justify-evenly items-center shadow-xl p-10 min-w-80 xl:min-w-96 h-96 bg-white"
    >
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
      <motion.button
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 500 }}
        onClick={handleSending}
        className="text-white bg-gray-400 p-2 rounded-xl text-xl "
      >
        {t('shared.friends.sendInvitation')}
      </motion.button>
    </motion.div>
  );
};

export default UserToInvitePanel;
