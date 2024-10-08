import { TbRun } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { auth } from "../../../config/firebase";
import { signOut } from "firebase/auth";
import NavbarButton from "../../../components/shared/NavbarButton";
import { LuMoonStar } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "../../../providers/UserProvider";
import DarkModeContext from "../../../providers/DarkModeProvider";
import ContentContext from "../../../providers/ContentProvider";
import { useTranslation } from "react-i18next";
import { useContext } from "react";

const GymNavbar = ({ setNavBarType }) => {
  const GYM_COLOR = "#E73725";

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { userInfo } = useUser();
  const { darkMode, toggleDisplayMode } = useContext(DarkModeContext);
  const { setRunContent } = useContext(ContentContext);

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
    setNavBarType((prev) => !prev);
    setRunContent();
  };

  return (
    <div className="w-full md:h-20 h-fit flex flex-col md:flex-row shadow-xl">
      <div
        className={` flex-grow h-full md:py-0 py-2 flex flex-col md:flex-row items-center justify-between gap-5`}
        style={
          darkMode
            ? { backgroundColor: "#1b1b1b" }
            : {
                backgroundImage:
                  "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
              }
        }
      >
        <div className="flex flex-col md:flex-row items-center justify-start gap-5">
          <button
            onClick={() => navigate("/gym/dashboard")}
            className="text-2xl text-white mx-5 "
          >
            <CgGym size={50} />
          </button>
          <h2 className="text-2xl text-white mx-5">YourDiary</h2>
          <motion.button
            onClick={toggleDisplayMode}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className={`dark:bg-white dark:text-black bg-black text-white flex justify-center items-center gap-2 text-xl font-bold min-w-44 h-10 px-4 rounded-full`}
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
        </div>
        <div className="flex md:flex-row flex-col items-center justify-start mx-5 gap-5">
          <h2 className="text-white text-2xl">{userInfo?.nickname || ""}</h2>
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            onClick={() => navigate("/gym/profile")}
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
            className="cursor-pointer object-cover"
            src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${userInfo?.profile_photo}`}
          />
          <NavbarButton
            bgColor="white"
            textColor={`${GYM_COLOR}`}
            text={t("shared.navbar.logout")}
            onClick={() => handleLogout()}
          />
        </div>
      </div>
      <div
        className={`md:w-24 h-full md:py-0 py-2 flex items-center justify-center`}
        style={
          darkMode
            ? { backgroundColor: "#2a2a42" }
            : {
                backgroundImage:
                  "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
              }
        }
      >
        <button className="text-white" onClick={toggle}>
          <TbRun size={50} />
        </button>
      </div>
    </div>
  );
};

export default GymNavbar;
