import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import FriendsList from "./FriendsList";
import UsersToInvite from "./UsersToInvite";
import FriendsUserProfile from "./FriendsUserProfile";
import FriendsPending from "./FriendsPending";

const FriendsPage = ({ color }) => {

  const [choosenPanel, setChoosenPanel] = useState('Friends');


  const handlePanelChange = (newPanel) => {
    setChoosenPanel(newPanel);
  };

  return (
    <div className="w-full flex justify-center items-stretch flex-grow bg-[#e9ecef]">
      <div className="w-3/4 p-20 flex flex-col gap-20 flex-grow">
      <div className="w-full text-center justify-center items-center text-2xl flex">
          <div
            onClick={() => handlePanelChange('Friends')}
            className={`cursor-pointer w-1/3 p-2 rounded-tl-2xl rounded-bl-2xl ${
              choosenPanel === 'Friends'
                ? `bg-${color}-400 text-white`
                : `bg-white text-${color}-400`
            }`}
          >
            Friends
          </div>
          <div
            onClick={() => handlePanelChange('Users To Invite')}
            className={`cursor-pointer w-1/3 p-2 ${
              choosenPanel === 'Users To Invite'
                ? `bg-${color}-400 text-white`
                : `bg-white text-${color}-400`
            }`}
          >
            Users To Invite
          </div>
          <div
            onClick={() => handlePanelChange('Pending Users')}
            className={`cursor-pointer w-1/3 p-2 rounded-tr-2xl rounded-br-2xl ${
              choosenPanel === 'Pending Users'
                ? `bg-${color}-400 text-white`
                : `bg-white text-${color}-400`
            }`}
          >
            Pending Users
          </div>
        </div>
        
        {choosenPanel === "Friends" && <FriendsList />}
        {choosenPanel === "Users To Invite" && <UsersToInvite />}
        {choosenPanel === "Pending Users" && <FriendsPending />}
      </div>
      <div className="w-1/4 flex flex-col flex-grow">
        <FriendsUserProfile color={color}/>
      </div>
    </div>
  );
};

export default FriendsPage;
