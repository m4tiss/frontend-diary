import { motion } from "framer-motion";

const PagePanel = ({ title, icon }) => {
  return (
    <motion.button
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
      }}
      className="w-full flex h-20 rounded-xl justify-center items-center space-x-4"
    >
      {icon}
      <h2 className="text-3xl text-white">{title}</h2>
    </motion.button>
  );
};

export default PagePanel;
