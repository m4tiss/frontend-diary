import { motion } from "framer-motion";

const AddGoal = () => {
    return createPortal(
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          //onClick={closeDialog}
        >
          <motion.div
            initial={{ scale: 0.2, opacity: 0, y: 300 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.2, opacity: 0, y: 300 }}
            className="bg-white flex flex-col items-center  rounded-xl p-6 shadow-xl w-96 h-fit overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="bg-red-500 text-white w-full p-2 rounded-xl shadow-xl"
              //onClick={closeDialog}
            >
              Close
            </button>
            {/* <div className="flex flex-col justify-center items-center text-center">
              <h2 className="my-10 text-4xl">{title}</h2>
              <label>{description}</label>
            </div> */}
          </motion.div>
        </div>,
        document.body
      );
};

export default AddGoal;
