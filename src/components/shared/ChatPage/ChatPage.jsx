import { useUser } from "../../../providers/UserProvider";
import { IoSend } from "react-icons/io5";
import ChatFriendPanel from "./ChatFriendPanel";
import ChatUserMessagePanel from "./ChatUserMessagePanel";
import ChatFriendMessagePanel from "./ChatFriendMessagePanel";

const ChatPage = () => {
  const { userInfo } = useUser();
  return (
    <div className="w-full flex flex-grow items-stretch bg-[#e9ecef] dark:bg-run-night-background">
      <div className="p-5 w-1/4 flex flex-col gap-10">
        <div className="flex justify-start items-center gap-5">
          <img
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
            className="cursor-pointer object-cover"
            src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${userInfo?.profile_photo}`}
          />
          <h2 className="text-3xl">{userInfo?.nickname}</h2>
        </div>
        <div className="flex flex-col py-10 h-fit px-5 gap-2 bg-white rounded-xl shadow-xl">
          <input
            className="bg-[#e9ecef] p-3 rounded-full outline-none"
            placeholder="Search"
          />
          <ChatFriendPanel />
          <ChatFriendPanel />
          <ChatFriendPanel />
          <ChatFriendPanel />
          <ChatFriendPanel />
        </div>
      </div>
      <div className="w-3/4 p-5 pb-10 flex flex-col">
        <div className="flex justify-start items-center gap-5">
          <img
            style={{
              borderRadius: "50%",
              width: "80px",
              height: "80px",
            }}
            className="cursor-pointer object-cover"
            src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${userInfo?.profile_photo}`}
          />
          <h2 className="text-3xl">{userInfo?.nickname}</h2>
        </div>
        <div className="flex-grow">
            <ChatUserMessagePanel message={"Hello how are you?"}/>
            <ChatFriendMessagePanel message={"It's okayy"}/>
            
        </div>
        <div className="bg-white p-2 rounded-full flex justify-between">
          <input
            type="text"
            placeholder="Type a message..."
            className="p-2 rounded-full w-full outline-none"
          />
          <button
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
            className="p-2 bg-blue-600 flex justify-center items-center text-white"
          >
            <IoSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
