import SyncLoader from "react-spinners/SyncLoader";
import DarkModeContext from "../../../providers/DarkModeProvider";
import { useContext } from "react";
const SmallStatsPanel = ({ title, description, loading }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="w-full min-h-28 flex flex-col bg-[white] dark:bg-run-night-element dark:text-white rounded-2xl items-center justify-start shadow-xl p-5">
      <div className="flex justify-start text-xl mb-2 font-semibold">
        {title}
      </div>
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full">
          <SyncLoader
            color={darkMode ? "#FFFFFF" : "#000000"}
            size={10}
            aria-label="Loading Spinner"
          />
        </div>
      ) : (
        <div className="flex justify-start text-3xl font-semibold">
          {description}
        </div>
      )}
    </div>
  );
};

export default SmallStatsPanel;
