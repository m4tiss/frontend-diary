import { useUser } from "../../../providers/UserProvider";
const ChatFriendPanel = ({ friendId }) => {
  const { userInfo } = useUser();
  return (
    <div className="w-full flex justify-between  items-center h-24 bg-white dark:bg-run-night-background">
      <div className="flex gap-2">
        <div>
          <img
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
            className="cursor-pointer object-cover"
            src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${userInfo?.profile_photo}`}
          />
        </div>
        <div className="flex flex-col ">
          <h2>User</h2>
          <label>message</label>
        </div>
      </div>
      <div>23:40</div>
    </div>
  );
};

export default ChatFriendPanel;
