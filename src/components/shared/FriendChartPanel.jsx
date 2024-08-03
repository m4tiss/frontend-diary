import { motion } from "framer-motion";

const FriendChartPanel = ({ title, icon, type,...props }) => {
  let linearColor = "";
  if (type === "gym")
    linearColor =
      "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)";
  else
    linearColor =
      "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)";

  return (
    <motion.button
      {...props}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      style={{
        backgroundImage: linearColor,
      }}
      className="w-32 flex h-32 rounded-xl text-white flex-col cursor-pointer justify-center items-center"
    >
      {icon}
      <label className="cursor-pointer">{title}</label>
      
    </motion.button>
  );
};

export default FriendChartPanel;
