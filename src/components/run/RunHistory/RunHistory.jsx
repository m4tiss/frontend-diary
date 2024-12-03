import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import RunTrainings from "./RunTrainings";

const RunHistory = () => {
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="w-full flex flex-grow flex-col items-center bg-[#e9ecef] dark:bg-gym-night-background gap-10 p-5 xl:p-10">
      <div
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
        }}
        className="min-w-80 xl:min-w-96 rounded-2xl shadow-xl p-10"
      >
        <div className="w-full px-5 xl:px-0 flex flex-grow flex-wrap justify-center">
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
        <RunTrainings startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
};

export default RunHistory;
