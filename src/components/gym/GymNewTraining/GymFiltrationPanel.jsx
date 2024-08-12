import { motion } from "framer-motion";

const GymFiltrationPanel = ({ title, selected, onClick }) => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0.5 }}
      animate={{ scale: selected ? 0.9 : 1, opacity: 1 }}
      whileTap={{ scale: 0.5 }}
      onClick={onClick}
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
      }}
      className={`rounded-full flex flex-col justify-center items-center h-14 w-20 text-white cursor-pointer`}
    >
      {title}
    </motion.div>
  );
};

export default GymFiltrationPanel;
