import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useContext } from "react";
import DarkModeContext from "../../../providers/DarkModeProvider";
import { setLanguage } from "../../../translation/i18n";

const Languages = () => {
  const { darkMode } = useContext(DarkModeContext);

  const changeLanguage = (lng) => {
    setLanguage(lng);
  };

  const flagStyles = {
    borderRadius: "50%",
    objectFit: "cover",
    margin: "0px 4px",
    border: `2px solid ${darkMode ? "white" : "black"}`,
  };

  const languages = [
    {
      id: 1,
      code: "PL",
      countryCode: "PL",
      label: "PL",
      onClick: () => changeLanguage("pl"),
    },
    {
      id: 2,
      code: "GB",
      countryCode: "GB",
      label: "EN",
      onClick: () => changeLanguage("gb"),
    },
  ];

  return (
    <>
      <div className="w-full lg:hidden absolute  top-[10%] pointer-events-none flex justify-between">
        {languages.map(({ id, countryCode, onClick }) => (
          <div
            key={id}
            onClick={onClick}
            className={`flex justify-center items-center w-12 h-12 rounded-full
              ${darkMode ? "text-white" : "text-black"} cursor-pointer z-50 pointer-events-auto`}
          >
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              style={{
                ...flagStyles,
                width: "32px",
                height: "32px",
              }}
              title={countryCode}
            />
          </div>
        ))}
      </div>

      <div className="hidden lg:flex flex-col top-[85%] left-0 fixed z-50">
        <ul>
          {languages.map(({ id, label, countryCode, onClick }) => (
            <li
              key={id}
              onClick={onClick}
              className={`flex justify-end gap-5 cursor-pointer items-center w-36 h-14 px-2 ml-[-80px] hover:ml-[-20px]
                ${darkMode ? "text-white" : "text-black"} hover:rounded-md duration-300`}
            >
              {label}
              <ReactCountryFlag
                countryCode={countryCode}
                svg
                style={{
                  ...flagStyles,
                  width: "40px",
                  height: "40px",
                }}
                title={countryCode}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Languages;
