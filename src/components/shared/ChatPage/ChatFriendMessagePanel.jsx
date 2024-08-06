import { useUser } from "../../../providers/UserProvider";
const ChatFriendMessagePanel = ({ message }) => {
  const { userInfo } = useUser();
  return (
    <div className="w-full flex justify-start h-14">
      <div className="flex justify-center items-center text-black gap-5 p-3 rounded-full bg-white">
        {/* <img
          style={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
          }}
          className="cursor-pointer object-cover"
          src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${userInfo?.profile_photo}`}
        /> */}
        <label>{message}</label>
      </div>
    </div>
  );
};

export default ChatFriendMessagePanel;
