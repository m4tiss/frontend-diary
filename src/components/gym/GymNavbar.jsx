import { TbRun } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import NavbarButton from "../../components/shared/NavbarButton";
import profilePhoto from "../../images/profile_photo.jpg";

const GymNavbar = ({ setNavBarType }) => {
  const GYM_COLOR = "#E73725";
  const RUN_COLOR = "#1DA1F2";

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Error logging out: ", error);
      });
  };

  return (
    <div className="w-full md:h-20 h-fit flex flex-col md:flex-row shadow-xl">
      <div
        className={`flex-grow h-full md:py-0 py-2 bg-[${GYM_COLOR}] flex flex-col md:flex-row items-center justify-between gap-5`}
        style={{
          "background-image":
            "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
            
        }}
      >
        <div className="flex items-center justify-start gap-5">
          <button className="text-2xl text-white mx-5 ">
            <CgGym size={50} />
          </button>
          <h2 className="text-2xl text-white mx-5">YourWebsite</h2>
        </div>
        <div className="flex md:flex-row flex-col items-center justify-start mx-5 gap-5">
          <h2 className="text-white text-2xl">m4tiss</h2>
          <img
            className="rounded-full object-cover"
            width={50}
            height={50}
            src={profilePhoto}
          />
          <NavbarButton
            bgColor="white"
            textColor={`${GYM_COLOR}`}
            text="Logout"
            onClick={() => handleLogout()}
          />
        </div>
      </div>
      <div
        className={`md:w-24 h-full bg-[${RUN_COLOR}] md:py-0 py-2 flex items-center justify-center`}
        style={{
          "background-image":
            "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
        }}
      >
        <button
          className="text-white"
          onClick={() => setNavBarType((prev) => !prev)}
        >
          <TbRun size={50} />
        </button>
      </div>
    </div>
  );
};

export default GymNavbar;
