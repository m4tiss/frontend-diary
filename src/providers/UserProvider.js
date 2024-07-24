import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { getAuthToken } from '../config/auth';
import axios from '../config/axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (user) {
      fetchUserInfo();
    } else {
      setUserInfo({});
    }
  }, [user]);

  const fetchUserInfo = () => {
    if (user) {
      const token = getAuthToken();
      axios
        .get("/shared/userInfo", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          let response = res.data.data;
          console.log(response);
          setUserInfo(response);
        });
    }
  };

  const contextValue = {
    user,
    userInfo,
    loading,
    error,
    fetchUserInfo,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
