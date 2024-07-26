import React, { createContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('displayMode');
    if (savedMode) {
      setDarkMode(savedMode === 'dark');
    }
  }, []);

  const toggleDisplayMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('displayMode', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDisplayMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContext;
