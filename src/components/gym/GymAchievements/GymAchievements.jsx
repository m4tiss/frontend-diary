import AchievementPanel from "../../shared/Achievements/AchievementPanel";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import { useTranslation } from "react-i18next";
import axios from "../../../config/axios";

const GymAchievements = () => {
  const { t }= useTranslation();
  const [gymAchievements, setGymAchievements] = useState([]);
  const [socialAchievements, setSocialAchievements] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get(`/gym/achievement/getAll`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.achievements;
        setGymAchievements(respone);
      })
      .catch((error) => {
        console.error("Error fetching achievements data:", error);
      });
  }, []);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get(`/shared/achievement/getAll`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.achievements;
        console.log(respone);
        setSocialAchievements(respone);
      })
      .catch((error) => {
        console.error("Error fetching achievements data:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-col flex-grow justify-evenly items-center bg-[#e9ecef] dark:bg-run-night-background py-10  gap-6">
      <h2 className="text-3xl my-2 dark:text-white">{t('gym.achievements.gym')}</h2>
      <div className="flex flex-wrap gap-8 py-20 justify-center">
        {gymAchievements.map((achievement) => (
          <AchievementPanel
            key={achievement.users_gym_achievement_id}
            type={"gym"}
            achievement={achievement}
          />
        ))}
      </div>
      <h2 className="text-3xl my-2 dark:text-white">{t('shared.achievements.social')}</h2>
      <div className="flex flex-wrap gap-8 py-20 justify-center">
      {socialAchievements.map((achievement) => (
          <AchievementPanel
            key={achievement.users_social_achievement_id}
            type={"shared"}
            achievement={achievement}
          />
        ))}
      </div>
    </div>
  );
};
export default GymAchievements;
