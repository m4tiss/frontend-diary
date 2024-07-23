import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import FriendPanel from "./FriendPanel";

const FriendsList = () => {


  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/getFriends", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.friends;
        console.log(respone);
        setFriends(respone);
      })
      .catch((error) => {
        console.error("Error fetching friends data:", error);
      });
  }, []);



    return (
      <div className="w-full flex gap-5">
      {friends.map((user, index) => (
          <FriendPanel key={index} user={user} />
      ))}
    </div>
    );
  };
  
  export default FriendsList;
  