import React from "react";
import { motion } from "framer-motion";
const DashboardPanel = ({ title, icon, onclick, background }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -60 }}
      transition={{ duration: 0.2 }}
      onClick={onclick}
      className={`w-60 h-60 border-2 rounded-xl shadow-xl flex flex-col cursor-pointer`}
      style={{ backgroundImage: `${background}` }}
    >
      <div className="h-1/2 flex justify-center items-end">
        <img src={icon} alt="Icon" className="w-20 h-20 object-contain" />
      </div>
      <div className="h-1/2 flex justify-center items-center">
        <h2 className="text-white font-semibold tracking-widest text-center text-xl">
          {title}
        </h2>
      </div>
    </motion.div>
  );
};

export default DashboardPanel;
