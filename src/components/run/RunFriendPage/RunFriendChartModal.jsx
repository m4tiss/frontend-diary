import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const RunFriendChartModal = ({ toggleDialog, type }) => {

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleDialog}
    >
      <motion.div
      
      initial={{ scale: 0.2, opacity: 0, y: 300 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.2, opacity: 0, y: 300 }}
        className="bg-white flex flex-col items-center rounded-xl p-6 shadow-xl w-3/4 h-3/4 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center px-10 justify-between">
          <h2 className="text-4xl">Chart {type}</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            onClick={toggleDialog}
            className="mt-4 px-4 py-2 h-fit shadow-xl bg-red-500 text-white rounded"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default RunFriendChartModal;
