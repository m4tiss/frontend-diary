import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import FriendsList from "./FriendsList";
import UsersToInvite from "./UsersToInvite";
import FriendsUserProfile from "./FriendsUserProfile";
import FriendsPending from "./FriendsPending";

const FriendsPage = () => {
  const [choosenPanel, setChoosenPanel] = useState('Friends');

  const handlePanelChange = (event, newPanel) => {
    if (newPanel !== null) {
      setChoosenPanel(newPanel);
    }
  };

  return (
    <div className="w-full flex justify-center items-start flex-grow bg-[#e9ecef]">
      <div className="w-3/4 h-full p-32 flex flex-col">
        <ToggleButtonGroup
          color="primary"
          value={choosenPanel}
          exclusive
          onChange={handlePanelChange}
          aria-label="Friends and Users To Invite"
        >
          <ToggleButton value="Friends">Friends</ToggleButton>
          <ToggleButton value="Users To Invite">Users To Invite</ToggleButton>
        </ToggleButtonGroup>
        
        {choosenPanel === "Friends" ? <FriendsList /> : <UsersToInvite />}
      </div>
      <div className="w-1/4 flex flex-col">
      <FriendsUserProfile/>
      <FriendsPending/>
      </div>
    </div>
  );
};

export default FriendsPage;
