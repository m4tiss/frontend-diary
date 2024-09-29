import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import FriendsList from "./FriendsList";
import UsersToInvite from "./UsersToInvite";
import FriendsUserProfile from "./FriendsUserProfile";
import FriendsPending from "./FriendsPending";
import ContentContext from "../../providers/ContentProvider";

const FriendsPage = () => {
  const { t } = useTranslation();
  const [choosenPanel, setChoosenPanel] = useState("Friends");
  const { isGymContent } = useContext(ContentContext);

  const color = isGymContent ? "red" : "blue";

  const handlePanelChange = (newPanel) => {
    setChoosenPanel(newPanel);
  };

  return (
    <div
      className={`w-full flex flex-col-reverse xl:flex-row 
      justify-center items-stretch flex-grow 
      bg-[#e9ecef] 
      ${
        isGymContent
          ? `dark:bg-gym-night-background`
          : `dark:bg-run-night-background`
      }
      py-10 xl:py-0 gap-10 xl:gap-0`}
    >
      <div className="w-full xl:w-3/4 px-5 xl:p-20 flex flex-col gap-20 flex-grow">
        <div className="w-full text-center justify-center items-center text-md xl:text-2xl flex">
          <div
            onClick={() => handlePanelChange("Friends")}
            className={`cursor-pointer w-1/3 min-h-16 flex justify-center items-center p-2 rounded-tl-2xl rounded-bl-2xl 
              ${choosenPanel === "Friends" ? `bg-${color}-400 text-white` : `bg-white`}`}
          >
            {t("shared.friends.friends")}
          </div>
          <div
            onClick={() => handlePanelChange("Users To Invite")}
            className={`cursor-pointer w-1/3 min-h-16 flex justify-center items-center p-2 
              ${choosenPanel === "Users To Invite" ? `bg-${color}-400 text-white` : `bg-white`}`}
          >
            {t("shared.friends.usersToInvite")}
          </div>
          <div
            onClick={() => handlePanelChange("Pending Users")}
            className={`cursor-pointer w-1/3 min-h-16 flex justify-center items-center p-2 rounded-tr-2xl rounded-br-2xl 
              ${choosenPanel === "Pending Users" ? `bg-${color}-400 text-white` : `bg-white`}`}
          >
            {t("shared.friends.pendingUsers")}
          </div>
        </div>

        {choosenPanel === "Friends" && <FriendsList />}
        {choosenPanel === "Users To Invite" && <UsersToInvite />}
        {choosenPanel === "Pending Users" && <FriendsPending />}
      </div>
      <div className="w-full xl:w-1/4 flex flex-col flex-grow px-5 xl:px-0">
        <FriendsUserProfile color={color} />
      </div>
    </div>
  );
};

export default FriendsPage;
