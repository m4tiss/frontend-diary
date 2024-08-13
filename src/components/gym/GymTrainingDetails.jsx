import { motion } from "framer-motion";
import ReactStars from "react-stars";
import { createPortal } from "react-dom";
import {
  formattedData,
  formattedDate,
  formattedTime,
  formattedDuration,
} from "../../functions/formatData";

const GymTrainingDetails = ({
  toggleDialog,
  workout,
  // onDelete
}) => {
  const handleEdit = () => {
    // onDelete();
    toggleDialog();
  };
  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleDialog}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.2, opacity: 0 }}
        className="bg-white flex flex-col items-center rounded-xl p-6 shadow-xl w-3/4 h-3/4 overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center px-10 justify-between">
          <h2 className="text-4xl">QUICK WORKOUT</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            onClick={toggleDialog}
            className="mt-4 px-4 py-2 h-fit shadow-xl bg-red-500 text-white rounded"
          >
            Close
          </motion.button>
        </div>
        <div className="flex flex-grow">
          <div className="w-3/4">ds</div>
          <div className="w-1/4">aa</div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default GymTrainingDetails;
