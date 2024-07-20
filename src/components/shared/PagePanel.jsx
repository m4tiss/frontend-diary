import { motion } from "framer-motion";

const PagePanel = ({ title, icon, type }) => {
  let linearColor = "";
  if (type === "gym")
    linearColor =
      "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)";
  else
    linearColor =
      "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      style={{
        backgroundImage: linearColor,
      }}
      className="w-72 flex h-20 rounded-xl justify-center items-center space-x-4"
    >
      {icon}
      <h2 className="2xl:text-2xl text-xl text-white">{title}</h2>
    </motion.button>
  );
};

export default PagePanel;
