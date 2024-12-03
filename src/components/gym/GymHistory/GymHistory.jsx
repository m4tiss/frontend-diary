import GymTrainings from "./GymTrainings";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const GymHistory = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="w-full flex flex-grow flex-col items-center bg-[#e9ecef] dark:bg-gym-night-background gap-10 p-5 xl:p-10">
      <div
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
        }}
        className="flex rounded-2xl shadow-xl p-10"
      >
        <div className="flex gap-5">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex sm:flex-row flex-col gap-4">
              <div>
                <h2 className="text-white text-center text-xl mb-2">
                  {t("gym.historyTraining.startDate")}
                </h2>
                <DateTimePicker
                  className="bg-white rounded-xl outline-none"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  ampm={false}
                  renderInput={(params) => (
                    <input
                      {...params}
                      className="bg-run-night-element text-white p-2 rounded w-full"
                    />
                  )}
                />
              </div>
              <div>
                <h2 className="text-white text-center text-xl mb-2">
                  {t("gym.historyTraining.endDate")}
                </h2>
                <DateTimePicker
                  className="bg-white rounded-xl outline-none"
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
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
        </div>
      </div>

      <div className="w-full px-5 xl:px-0 flex flex-grow flex-wrap justify-center">
        <GymTrainings startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
};

export default GymHistory;
