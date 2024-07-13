import { motion } from "framer-motion";
const NavbarButton = ({ bgColor, textColor, text, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 500 }}
      className={`text-xl font-bold w-32 h-10 px-4 rounded-full`}
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};
export default NavbarButton;
