import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";

const UsersToInvite = () => {


    const [usersToInvite, setUsersToInvite] = useState([]);

    useEffect(() => {
        const token = getAuthToken();
        axios
          .get("/shared/getUsersToInvite", {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((res) => {
            const respone = res.data.users;
            console.log(respone);
            setUsersToInvite(respone);
          })
          .catch((error) => {
            console.error("Error fetching pulse data:", error);
          });
      }, []);

      const sendInvitation = async (friend_id) => {
        const token = getAuthToken();
        const resposne = await axios.post("/shared/sendInvitation", {friend_id:friend_id}, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          });
          console.log(resposne);
      };
    

    return (
      <div className="">
                {usersToInvite.map((user, index) => (
          <div key={index}>
            <label>{user.nickname} </label>
            <button
              onClick={() => sendInvitation(user.user_id)}
              className="bg-white"
            >
              sendInvitation
            </button>
          </div>
        ))}
        
    </div>
    );
  };
  
  export default UsersToInvite;
  