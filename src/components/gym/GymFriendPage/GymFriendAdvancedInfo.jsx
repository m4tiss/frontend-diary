
import { formattedDate } from "../../../functions/formatData";
import { calculateDaysWithUs } from "../../../functions/statsCalculations";
import { useContext } from "react";
import DarkModeContext from "../../../providers/DarkModeProvider";
const GymFriendAdvancedInfo = ({ friendInfo }) => {

    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className="w-1/3 flex flex-col justify-center items-center bg-white dark:bg-run-night-element rounded-xl m-10 px-10 shadow-xl gap-5">
          <div class="w-full flex justify-center items-center  flex-wrap gap-5">
            <div 
            style={
                darkMode
                  ? { backgroundColor: "#f85c8c" }
                  : {
                      backgroundImage:
                        "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
                    }
              }
            className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center text">
              <label className="text-4xl">{friendInfo?.friends_count}</label>
              <h2 className="text-xl">Friends</h2>
            </div>
            <div 
            
            style={
                darkMode
                  ? { backgroundColor: "#f85c8c" }
                  : {
                      backgroundImage:
                        "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
                    }
              }
              className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center text">
              <label className="text-4xl">
                {formattedDate(friendInfo?.date_of_birth)}
              </label>
              <h2 className="text-xl">Birth Date</h2>
            </div>
            <div
              style={
                darkMode
                  ? { backgroundColor: "#f85c8c" }
                  : {
                      backgroundImage:
                        "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
                    }
              }
              className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center bg-run-night-contrast text"
            >
              <label className="text-4xl">
                {calculateDaysWithUs(friendInfo?.created_at)}
              </label>
              <h2 className="text-xl">Days on platform</h2>
            </div>
            <div className="min-w-52 min-h-28 rounded-xl text-white text-3xl p-2 flex flex-col justify-center items-center cursor-pointer bg-[#d90429] text">
              <h2>Remove friend</h2>
            </div>
          </div>
        </div>
    );
  };
  
  export default GymFriendAdvancedInfo;
  