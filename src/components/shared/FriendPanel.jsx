import { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ContentContext from "../../providers/ContentProvider";

const FriendPanel = ({ user }) => {
  const { isGymContent } = useContext(ContentContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isGymContent) {
      navigate(`/gym/friend/${user.user_id}`);
    } else {
      navigate(`/run/friend/${user.user_id}`);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      whileHover={{ scale: 1.1 }}
      className="flex flex-col justify-evenly cursor-pointer items-center shadow-xl min-w-40 h-40 bg-white"
    >
      <img
        style={{
          borderRadius: "50%",
          width: "70px",
          height: "70px",
        }}
        className="object-cover"
        src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${user.profile_photo}`}
        alt={`${user.nickname}'s profile`}
      />
      <label className="text-2xl">{user.nickname}</label>
    </motion.div>
  );
};

export default FriendPanel;
