import { motion } from "framer-motion";
import { createPortal } from "react-dom";

const CommentsPanel = ({ toggleDialog }) => {
  return createPortal(
    <div
      className="fixed inset-0 w-full h-full flex items-end justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleDialog}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="w-[800px] h-5/6 bg-white rounded-t-2xl p-5"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{y: "100%"}}
        transition={{ type: "tween", duration: 0.5 }}
      >
        
      </motion.div>
    </div>,
    document.body
  );
};

export default CommentsPanel;
