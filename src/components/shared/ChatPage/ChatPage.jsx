import { useUser } from "../../../providers/UserProvider";
import { IoSend } from "react-icons/io5";
import { getAuthToken } from "../../../config/auth";
import { useEffect, useState } from "react";
import axios from "../../../config/axios";
import { PiCursorClick } from "react-icons/pi";
import ChatFriendPanel from "./ChatFriendPanel";
import ChatUserMessagePanel from "./ChatUserMessagePanel";
import ChatFriendMessagePanel from "./ChatFriendMessagePanel";

const ChatPage = () => {
  const { userInfo } = useUser();
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/chat/getPreviewMessages", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: { friend_id: 14 },
      })
      .then((res) => {
        const response = res.data.data;
        console.log(response);
        setPreviewData(response);
      })
      .catch((error) => {
        console.error("Error fetching preview data:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedFriend !== null) {
      console.log("ID" + selectedFriend.user_id);
      const token = getAuthToken();
      axios
        .get("/shared/chat/getConversation", {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: { friend_id: selectedFriend.user_id },
        })
        .then((res) => {
          const response = res.data.data;
          console.log(response);
          setConversation(response);
        })
        .catch((error) => {
          console.error("Error fetching conversation data:", error);
        });
    }
  }, [selectedFriend]);

  const handleFriendSelect = (friend) => {
    setSelectedFriend(friend);
    setNewMessage("");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const token = getAuthToken();
    axios
      .post(
        "/shared/chat/sendMessage",
        {
          friend_id: selectedFriend.user_id,
          message: newMessage,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        const newMsg = {
          content: newMessage,
          sender_id: userInfo.user_id,
          receiver_id: selectedFriend.user_id,
          timestamp: new Date().toISOString(),
          is_read: 0,
        };
        setConversation([...conversation, newMsg]);
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

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
          {previewData.slice(0, 6).map((object, index) => (
            <ChatFriendPanel
              key={index}
              user={object.user}
              lastMessage={object.lastMessage}
              onClick={() => handleFriendSelect(object.user)}
            />
          ))}
        </div>
      </div>
      <div className="w-3/4 p-5 pb-10 flex flex-col">
        {selectedFriend === null ? (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <PiCursorClick size={300} />
            <h2 className="text-5xl">Select friend</h2>
          </div>
        ) : (
          <>
            <div className="flex justify-start items-center gap-5">
              <img
                style={{
                  borderRadius: "50%",
                  width: "80px",
                  height: "80px",
                }}
                className="cursor-pointer object-cover"
                src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${selectedFriend.profile_photo}`}
              />
              <h2 className="text-3xl">{selectedFriend.nickname}</h2>
            </div>
            <div className="flex-grow overflow-y-auto">
              {conversation.map((message, index) => (
                message.sender_id === selectedFriend.user_id ? (
                  <ChatFriendMessagePanel key={index} message={message.content} />
                ) : (
                  <ChatUserMessagePanel key={index} message={message.content} />
                )
              ))}
            </div>
            <div className="bg-white p-2 rounded-full flex justify-between">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="p-2 rounded-full w-full outline-none"
              />
              <button
                style={{
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                }}
                className="p-2 bg-blue-600 flex justify-center items-center text-white"
                onClick={handleSendMessage}
              >
                <IoSend size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
