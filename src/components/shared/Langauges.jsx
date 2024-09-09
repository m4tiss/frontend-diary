import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useContext } from "react";
import DarkModeContext from "../../providers/DarkModeProvider";
import { setLanguage } from "../../translation/i18n";

const Languages = () => {
  const { darkMode } = useContext(DarkModeContext);

  const changeLanguage = (lng) => {
    setLanguage(lng);
  };

  const languages = [
    {
      id: 1,
      child: (
        <>
          PL
          <ReactCountryFlag
            countryCode="PL"
            svg
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "0px 4px",
              border: `2px solid ${darkMode ? "white" : "black"} `,
              cursor: 'pointer'
            }}
            title="PL"
          />
        </>
      ),
      onClick: () => changeLanguage('pl')
    },
    {
      id: 2,
      child: (
        <>
          EN
          <ReactCountryFlag
            countryCode="GB"
            svg
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "0px 4px",
              border: `2px solid ${darkMode ? "white" : "black"} `,
              cursor: 'pointer'
            }}
            title="GB"
          />
        </>
      ),
      onClick: () => changeLanguage('gb')
    },
  ];
  
  return (
    <div className="hidden lg:flex flex-col top-[85%] left-0 fixed z-50">
      <ul>
        {languages.map(({ id, child,onClick }) => (
          <li
          onClick={onClick}
            key={id}
            className={
              `flex justify-end gap-5 cursor-pointer
               items-center w-36 h-14 px-2 ml-[-80px] hover:ml-[-20px]
                 ${darkMode ? "text-white" : "text-black"}
                 hover:rounded-md duration-300`
            }
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Languages;
