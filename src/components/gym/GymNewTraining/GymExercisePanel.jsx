import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import chestIcon from '../../../icons/chestIcon.jpg';
import backIcon from '../../../icons/backIcon.jpg';
import bicepsIcon from '../../../icons/bicepsIcon.jpg';
import tricepsIcon from '../../../icons/tricepsIcon.jpg';
import shouldersIcon from '../../../icons/shouldersIcon.jpg';
import absIcon from '../../../icons/absIcon.jpg';
import legsIcon from '../../../icons/legsIcon.jpg';

const icons = {
  'chestIcon.jpg': chestIcon,
  'backIcon.jpg': backIcon,
  'bicepsIcon.jpg': bicepsIcon,
  'tricepsIcon.jpg': tricepsIcon,
  'shouldersIcon.jpg': shouldersIcon,
  'absIcon.jpg': absIcon,
  'legsIcon.jpg': legsIcon,
};

const GymExercisePanel = ({ height, exercise, onClick }) => {

const { t } = useTranslation();
const iconPath = icons[exercise.photo_exercise];
  return (
    <motion.div
      onClick={onClick}
      initial={{ scale: 0.5, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.7 }}
      className={`rounded-2xl shadow-xl px-5 text-center flex items-center gap-5 justify-center bg-white h-${height} w-64 text-black cursor-pointer`}
    >
      <h2>{t(`gym.exercises.${exercise.name_exercise}`)}</h2>
      <img
              src={iconPath}
              alt={t(`gym.exercises.${exercise.name_exercise}Icon`)}
       height={70} width={70}/>
      
    </motion.div>
  );
};

export default GymExercisePanel;
