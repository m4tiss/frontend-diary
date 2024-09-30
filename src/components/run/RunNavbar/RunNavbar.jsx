import { TbRun } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { auth } from "../../../config/firebase";
import { signOut } from "firebase/auth";
import NavbarButton from "../../shared/NavbarButton";
import { useNavigate } from "react-router-dom";
import { LuMoonStar } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import { motion } from "framer-motion";
import { useUser } from "../../../providers/UserProvider";
import DarkModeContext from "../../../providers/DarkModeProvider";
import ContentContext from "../../../providers/ContentProvider";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const RunNavbar = ({ setNavBarType }) => {
  const RUN_COLOR = "#1DA1F2";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userInfo } = useUser();
  const { darkMode, toggleDisplayMode } = useContext(DarkModeContext);
  const { setGymContent } = useContext(ContentContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
      localStorage.removeItem("token");
  };
  
  
  const toggle = () => {
    setNavBarType((prev) => !prev)
    setGymContent()
  };

  return (
    <div className="w-full h-fit md:h-20 flex md:flex-row flex-col shadow-2xl items-center">
      <div
        className={`w-full md:w-24 md:py-0 py-2  h-full flex items-center justify-center`}
        style={
          darkMode
            ? { backgroundColor: "#1b1b1b" }
            : {
                backgroundImage:
                  "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
              }
        }
      >
        <button
          className="text-2xl text-white"
          onClick={toggle}
        >
          <CgGym size={50} />
        </button>
      </div>
      <div
        className="flex-grow h-full w-full md:py-0 py-2 flex md:flex-row flex-col items-center justify-between gap-5"
        style={
          darkMode
            ? { backgroundColor: "#2a2a42" }
            : {
                backgroundImage:
                 "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
              }
        }
      >
        <div className="flex flex-col md:flex-row  items-center justify-between mx-5 gap-5">
          <NavbarButton
            bgColor="white"
            textColor={`${RUN_COLOR}`}
            text={t("shared.navbar.logout")}
            onClick={() => handleLogout()}
          />
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            onClick={() => navigate("/run/profile")}
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
            className="cursor-pointer object-cover"
            width={50}
            height={50}
            src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${userInfo.profile_photo}`}
          />
          <h2 className="text-white text-2xl">{userInfo.nickname}</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <motion.button
            onClick={toggleDisplayMode}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className={`dark:bg-white dark:text-run-night-element bg-run-night-element text-white text-xl flex justify-center gap-2 items-center font-bold min-w-44 h-10 px-4 rounded-full`}
          >
            {darkMode ? (
              <>
                {t("shared.navbar.lightMode")} <LuSun />
              </>
            ) : (
              <>
                {t("shared.navbar.nightMode")} <LuMoonStar />
              </>
            )}
          </motion.button>
          <h2 className="text-2xl text-white mx-5 flex">YourDiary</h2>
          <button
            onClick={() => navigate("/run/dashboard")}
            className="text-2xl text-white mx-5"
          >
            <TbRun size={50} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default RunNavbar;
