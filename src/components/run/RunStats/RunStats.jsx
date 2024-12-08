import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SmallStatsPanel from "../../shared/Stats/SmallStatsPanel";
import RunStatsProfile from "./RunStatsProfile";
import FriendStatsPanel from "../../shared/Friends/FriendStatsPanel";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import ChartCategories from "./../charts/ChartCategories";
import { useUser } from "../../../providers/UserProvider";
import { formattedData, formattedDuration } from "../../../functions/formatData";
import ChartDuration from "./../charts/ChartDuration";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const RunStats = () => {
  const { t } = useTranslation();
  const { userInfo } = useUser();

  const [stats, setStats] = useState({
    distance: 0.0,
    duration: "00:00:00",
    avgRating: 0.0,
    avgPulse: 0,
    activeGoals: 0,
  });
  const [selectedRange, setSelectedRange] = useState("week");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [friends, setFriends] = useState([]);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    setLoadingStats(true);
    const token = getAuthToken();
    axios
      .get("/run/chart/stats", {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          range: selectedRange,
          startDate: startDate ? dayjs(startDate).format("YYYY-MM-DD HH:mm") : undefined,
          endDate: endDate ? dayjs(endDate).format("YYYY-MM-DD HH:mm") : undefined,
        },
      })
      .then((res) => {
        const stats = res.data.stats;
        console.log(stats);
        setStats({
          distance: stats.sumDistance,
          duration: stats.sumDuration,
          avgRating: stats.avgRating,
          avgPulse: stats.avgPulse,
          activeGoals: stats.activeGoals,
        });
      })
      .catch((error) => {
        console.error("Error fetching stats data:", error);
      })
      .finally(() => {
        setLoadingStats(false);
      });
  }, [selectedRange, startDate, endDate]);

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/shared/getFriends", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const respone = res.data.friends;
        setFriends(respone);
      })
      .catch((error) => {
        console.error("Error fetching friends data:", error);
      });
  }, []);

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    if (range !== "dates") {
      setStartDate(null);
      setEndDate(null);
    }
  };
  

  const getButtonStyle = (range) => {
    return selectedRange === range
      ? "p-2 min-w-20 border-2 border-blue-500 rounded-xl bg-blue-500 text-white"
      : "p-2 min-w-20 border-2 border-blue-500 rounded-xl";
  };

  return (
    <div className="w-full flex flex-col 2xl:flex-row flex-grow bg-[#e9ecef] dark:bg-run-night-background">
      <div className="w-full 2xl:w-3/4 flex flex-col p-5 items-center">
        <div className="w-full m-5 flex justify-center items-center">
          <span className="text-2xl dark:text-white font-semibold">
            {t("run.stats.personalStats")}
          </span>
        </div>
        <div className="flex flex-col text-black dark:text-white 2xl:flex-row justify-center w-full gap-5 mb-10">
          <button
            className={getButtonStyle("week")}
            onClick={() => handleRangeChange("week")}
          >
            {t("run.stats.week")}
          </button>
          <button
            className={getButtonStyle("month")}
            onClick={() => handleRangeChange("month")}
          >
            {t("run.stats.month")}
          </button>
          <button
            className={getButtonStyle("year")}
            onClick={() => handleRangeChange("year")}
          >
            {t("run.stats.year")}
          </button>
          <button
            className={getButtonStyle("all")}
            onClick={() => handleRangeChange("all")}
          >
            {t("run.stats.all")}
          </button>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex sm:flex-row flex-col gap-4 mb-10 items-center">
            <div>
              <DateTimePicker
                className="bg-white rounded-xl outline-none"
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  handleRangeChange("dates");
                }}
                placeholder
                ampm={false}
                renderInput={(params) => (
                  <input
                    {...params}
                    className="bg-run-night-element text-white p-2 rounded w-full"
                  />
                )}
              />
            </div>
            <h2 className="text-3xl">-</h2>
            <div>
              <DateTimePicker
                className="bg-white rounded-xl outline-none"
                value={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  handleRangeChange("dates");
                }}
                ampm={false}
                renderInput={(params) => (
                  <input
                    {...params}
                    className="bg-run-night-element text-white p-2 rounded w-full"
                  />
                )}
              />
            </div>
          </div>
        </LocalizationProvider>
        <div className="flex flex-col 2xl:flex-row justify-between w-full gap-5">
          <SmallStatsPanel
            title={t("run.stats.totalDistance")}
            description={formattedData(stats.distance)}
            loading={loadingStats}
          />
          <SmallStatsPanel
            title={t("run.stats.totalTime")}
            description={formattedDuration(stats.duration)}
            loading={loadingStats}
          />
          <SmallStatsPanel
            title={t("run.stats.averageRating")}
            description={formattedData(stats.avgRating)}
            loading={loadingStats}
          />
          <SmallStatsPanel
            title={t("run.stats.averagePulse")}
            description={stats.avgPulse}
            loading={loadingStats}
          />
        </div>
        <div className="w-full flex flex-col 2xl:flex-row justify-between m-5 gap-5">
          <ChartDuration />
          <ChartCategories range={selectedRange} startDate={startDate} endDate={endDate} />
        </div>
      </div>

      <div className="w-full 2xl:w-1/4 flex flex-col">
        <div className="flex-grow m-10 ">
          <RunStatsProfile />
          <div className="bg-white dark:bg-run-night-element text-black dark:text-white flex flex-col rounded-2xl shadow-xl my-10 py-10 gap-2">
            <div className="flex flex-grow justify-evenly text-2xl font-semibold w-full">
              <span>{t("shared.friends.friends")}</span>{" "}
              <span>{userInfo.friends_count}</span>
            </div>
            {friends.slice(0, 5).map((user) => (
              <FriendStatsPanel key={user.user_id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunStats;
