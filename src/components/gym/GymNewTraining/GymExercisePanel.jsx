import { motion } from "framer-motion";

const GymExercisePanel = ({ exercise, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ scale: 0.5, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.7 }}
      className={`rounded-2xl shadow-xl flex flex-col items-center justify-center bg-white h-24 w-64 text-black cursor-pointer`}
    >
      {exercise.name_exercise}
    </motion.div>
  );
};

export default GymExercisePanel;
