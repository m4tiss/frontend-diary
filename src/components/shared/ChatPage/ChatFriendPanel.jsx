import { useUser } from "../../../providers/UserProvider";
import {formattedTime} from '../../../functions/formatData'
const ChatFriendPanel = ({ user, lastMessage,onClick }) => {
  const { userInfo } = useUser();
  return (
    <div 
    onClick={onClick}
    className="w-full flex justify-between  items-center h-24 bg-white dark:bg-run-night-background cursor-pointer">
      <div className="flex gap-2">
        <div>
          <img
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
            className="cursor-pointer object-cover"
            src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${user.profile_photo}`}
          />
        </div>
        <div className="flex flex-col cursor-pointer ">
          <h2>{user.nickname}</h2>
          <label className="cursor-pointer">{lastMessage.content}</label>
        </div>
      </div>
      <div>  {lastMessage.timestamp && formattedTime(lastMessage.timestamp)}</div>
    </div>
  );
};

export default ChatFriendPanel;