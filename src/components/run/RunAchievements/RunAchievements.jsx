import AchievementPanel from "../../shared/AchievementPanel";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";

const RunAchievements = () => {
  const [runAchievements, setRunAchievements] = useState([]);
  const [socialAchievements, setSocialAchievements] = useState([]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get(`/run/achievement/getAll`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.achievements;
        setRunAchievements(respone);
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
      <h2 className="text-3xl my-2">Run Achievements</h2>
      <div className="flex flex-wrap gap-8 py-20 justify-center">
        {runAchievements.map((achievement) => (
          <AchievementPanel
            key={achievement.users_run_achievement_id}
            achievement={achievement}
          />
        ))}
      </div>
      <h2 className="text-3xl my-2">Social Achievements</h2>
      <div className="flex flex-wrap gap-8 py-20 justify-center">
      {socialAchievements.map((achievement) => (
          <AchievementPanel
            key={achievement.users_social_achievement_id}
            achievement={achievement}
          />
        ))}
      </div>
    </div>
  );
};
export default RunAchievements;
