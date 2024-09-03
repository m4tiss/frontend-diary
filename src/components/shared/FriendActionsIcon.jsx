import ContentContext from "../../providers/ContentProvider";
import { useContext } from "react";
const FriendActionIcon = ({ icon, onClick }) => {
  const { isGymContent } = useContext(ContentContext);

  return (
    <button
      onClick={onClick}
      className={`${
        isGymContent ? "bg-red-500" : "bg-blue-500"
      } p-2 flex justify-center items-center h-12 w-12 rounded-xl text-white`}
    >
      {icon}
    </button>
  );
};

export default FriendActionIcon;
