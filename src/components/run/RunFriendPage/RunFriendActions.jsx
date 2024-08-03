import { useState } from "react";
import RunFriendActionIcon from "./RunFriendActionsIcon";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { PiSword } from "react-icons/pi";
import { GiAchievement } from "react-icons/gi";
import { motion } from "framer-motion";

const RunFriendActions = () => {
  const [action, setAction] = useState("Chat");

  const renderActionContent = () => {
    switch (action) {
      case "Chat":
        return (
          <>
            <h2 className="text-2xl font-semibold">Chat with your friend</h2>
            <label className="text-center px-10">
              Chat and discuss your training plans, share tips, and keep each
              other motivated!
            </label>
            <button className="bg-blue-600 p-2 text-white text-2xl rounded">
              Start Chat
            </button>
          </>
        );
      case "Fight":
        return (
          <>
            <h2 className="text-2xl font-semibold">Fight with your friend</h2>
            <label className="text-center px-10">
              Challenge your friend to a friendly competition and see who comes
              out on top!
            </label>
            <button className="bg-red-600 p-2 text-white text-2xl rounded">
              Fight with your Friends
            </button>
          </>
        );
      case "Achievement":
        return (
          <>
            <h2 className="text-2xl font-semibold">View Achievements</h2>
            <label className="text-center px-10">
              Check out your accomplishments and see what goals you've achieved
              so far!
            </label>
            <button className="bg-green-600 p-2 text-white text-2xl rounded">
              View Achievements
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-1/3 flex flex-col justify-start items-center bg-white dark:bg-run-night-element rounded-xl m-10 shadow-xl">
      <div className="w-full flex justify-center items-center flex-grow">
        <div className="w-1/6 flex flex-col justify-start items-center gap-4">
          <RunFriendActionIcon
            icon={<IoChatboxEllipsesOutline size={30} />}
            onClick={() => setAction("Chat")}
          />
          <RunFriendActionIcon
            icon={<PiSword size={30} />}
            onClick={() => setAction("Fight")}
          />
          <RunFriendActionIcon
            icon={<GiAchievement size={30} />}
            onClick={() => setAction("Achievement")}
          />
        </div>
        <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="w-5/6 flex flex-col justify-start items-center gap-5">
          {renderActionContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default RunFriendActions;
