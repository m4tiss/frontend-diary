import { useEffect, useState } from "react";
import axios from "../../config/axios";
import { getAuthToken } from "../../config/auth";
import UserToInvitePanel from "./UserToInvitePanel";
import { useTranslation } from "react-i18next";
import { IoIosRefresh } from "react-icons/io";
import { motion} from "framer-motion";

const UsersToInvite = () => {
  const { t } = useTranslation();
  const [usersToInvite, setUsersToInvite] = useState([]);
  const [searchPattern, setSearchPattern] = useState("");

  const inputUsers = (pattern) => {
    if (!pattern) {
      refreshUsers();
      return;
    }
    setUsersToInvite([]);
    const token = getAuthToken();
    axios
      .get("/shared/getUsersToInvite", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          pattern: pattern,
        },
      })
      .then((res) => {
        const response = res.data.users;
        setUsersToInvite(response);
      })
      .catch((error) => {
        console.error("Error fetching users to invite data:", error);
      });
  };

  const refreshUsers = () => {
    setUsersToInvite([]);
    const token = getAuthToken();
    axios
      .get("/shared/getThreeRandomUsersToInvite", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const response = res.data.users;
        setUsersToInvite(response);
      })
      .catch((error) => {
        console.error("Error fetching users to invite data:", error);
      });
  };

  useEffect(() => {
    refreshUsers();
  }, []);

  const handleSearchChange = (event) => {
    const pattern = event.target.value;
    setSearchPattern(pattern);
    inputUsers(pattern);
  };

  const onDeleteFromList = (userId) => {
    setUsersToInvite((prevUsers) =>
      prevUsers.filter((user) => user.user_id !== userId)
    );
  };

  return (
    <>
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="flex justify-center gap-2"
      >
        <div
          onClick={refreshUsers}
          className="flex justify-center items-center rounded-xl shadow-xl text-5xl bg-white p-2 cursor-pointer"
        >
          <IoIosRefresh />
        </div>

        <input
          className="bg-white p-2 text-3xl rounded-xl shadow-xl outline-none"
          type="text"
          placeholder={t('shared.friends.newFriend')}
          value={searchPattern}
          onChange={handleSearchChange}
        />
      </motion.div>
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        className="flex justify-center flex-grow gap-5 flex-wrap"
      >
        {usersToInvite.slice(0,3).map((user) => (
          <UserToInvitePanel
            onDelete={() => onDeleteFromList(user.user_id)}
            key={user.user_id}
            user={user}
          />
        ))}
      </motion.div>
    </>
  );
};

export default UsersToInvite;
