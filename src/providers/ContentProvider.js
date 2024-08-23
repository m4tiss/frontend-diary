import React, { createContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [isGymContent, setIsGymContent] = useState(() => {
    const savedContent = localStorage.getItem('content');
    return savedContent ? savedContent === 'gym' : true;
  });

  useEffect(() => {
    localStorage.setItem('content', isGymContent ? 'gym' : 'run');
  }, [isGymContent]);

  const toggleContent = () => {
    setIsGymContent((prev) => !prev);
  };

  const setGymContent = () => {
    setIsGymContent(true);
  };

  const setRunContent = () => {
    setIsGymContent(false);
  };

  return (
    <ContentContext.Provider value={{ isGymContent, toggleContent, setGymContent, setRunContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;
