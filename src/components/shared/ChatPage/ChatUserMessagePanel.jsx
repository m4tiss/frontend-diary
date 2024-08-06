import { useUser } from "../../../providers/UserProvider";
const ChatUserMessagePanel = ({ message }) => {
  const { userInfo } = useUser();
  return (
    <div className="w-full flex justify-end h-14">
      <div className="flex justify-center items-center text-white gap-5 p-3 rounded-full bg-run-night-contrast">
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

export default ChatUserMessagePanel;
