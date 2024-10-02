import { useState, useEffect } from "react";
import { getAuthToken } from "../../../config/auth";
import ReactStars from "react-stars";
import axios from "../../../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChartAveragePulse from "../charts/ChartAveragePulse";
import ChartDistance from "../charts/ChartDistance";
import { useUser } from "../../../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const validateDuration = (duration) => {
  const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
  return regex.test(duration);
};

const RunNewTraining = () => {
  const { t } = useTranslation();
  const { fetchUserInfo } = useUser();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [chosenPlan, setChosenPlan] = useState(null);
  const [data, setData] = useState({
    run_category_id: 0,
    date: "",
    duration: "03:00:00",
    note: "",
    rating: 0.0,
    average_pulse: 0,
    distance: 0.0,
  });

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/category/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let response = res.data.categories;
        setCategories(response);
      });
  }, []);

  const handleDivClick = (plan) => {
    setChosenPlan(plan);
    setData({ ...data, run_category_id: plan });
  };

  const handleSubmit = async () => {
    if (
      !data.date ||
      !data.duration ||
      !data.rating ||
      !data.average_pulse ||
      !data.distance ||
      chosenPlan == null
    ) {
      toast.error("All fields must be filled");
      return;
    }

    if (!validateDuration(data.duration)) {
      toast.error("Incorrect duration");
      return;
    }

    try {
      const runData = {
        run_category_id: data.run_category_id,
        date: data.date,
        duration: data.duration,
        note: data.note,
        rating: data.rating,
        average_pulse: data.average_pulse,
        distance: data.distance,
        coordinates: []
        };

      const token = getAuthToken();
      const resposne = await axios.post("/run/workout", runData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log(resposne);
      toast.success("Training added!");
      setData({
        run_category_id: 1,
        duration: "00:00",
        note: "",
        rating: 0.0,
        average_pulse: 0,
        distance: 0.0,
      });
      setChosenPlan(null);
      fetchUserInfo();
      setTimeout(() => navigate("/run/history"), 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full flex flex-col 2xl:flex-row flex-grow bg-[#e9ecef] dark:bg-run-night-background">
      <div className="w-full 2xl:w-2/3 flex flex-col 2xl:flex-row justify-center">
        <div className="w-full 2xl:w-1/2 flex flex-col items-center justify-evenly mt-10 2xl:my-10 gap-10">
          <div className="flex flex-col  items-start xl:items-center">
            <label className="px-2 text-xl w-full text-center">
              {t("gym.general.date")}
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DateTimePicker
                  className="bg-white"
                  ampm={false}
                  onChange={(date) =>
                    setData({
                      ...data,
                      date: date ? dayjs(date).format("YYYY-MM-DD HH:mm") : "",
                    })
                  }
                  renderInput={(params) => <input {...params} />}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="text-center flex flex-col dark:text-white">
            <label className="px-2 text-xl">{t("run.general.duration")}</label>
            <input
              value={data.duration}
              onChange={(e) => setData({ ...data, duration: e.target.value })}
              className="text-2xl p-2 rounded-2xl outline-none shadow-xl dark:bg-run-night-element "
              placeholder="1h 30min"
            ></input>
          </div>

          <div className="text-center flex flex-col dark:text-white">
            <label className="px-2 text-xl">
              {t("run.general.averagePulse")}
            </label>
            <input
              value={data.average_pulse}
              onChange={(e) =>
                setData({ ...data, average_pulse: e.target.value })
              }
              className="text-2xl p-2 rounded-2xl outline-none shadow-xl dark:bg-run-night-element"
              placeholder="150"
            ></input>
          </div>
          <div className="text-center flex flex-col dark:text-white">
            <label className="px-2 text-xl">{t("run.general.distance")}</label>
            <input
              value={data.distance}
              onChange={(e) => setData({ ...data, distance: e.target.value })}
              className="text-2xl p-2 rounded-2xl outline-none shadow-xl dark:bg-run-night-element "
              type="number"
              placeholder="20.3"
            ></input>
          </div>
          <div className="text-center flex flex-col  rounded-xl p-2 dark:text-white">
            <label className="px-2 text-xl">{t("run.general.rating")}</label>

            <input
              value={data.rating}
              step={0.1}
              min={0}
              max={5}
              onChange={(e) => setData({ ...data, rating: e.target.value })}
              className="text-2xl p-2 rounded-2xl outline-none shadow-xl dark:bg-run-night-element"
              type="number"
              placeholder="20.3"
            ></input>
            <ReactStars
              count={5}
              size={50}
              edit={false}
              value={data.rating}
              color1="#ffffff"
              color2={"#ffd700"}
            />
          </div>
        </div>
        <div className="w-full 2xl:w-1/2 flex flex-col items-center justify-evenly my-10 gap-10">
          <div className="text-center flex flex-col dark:text-white">
            <label className="px-2 text-xl">{t("run.general.note")}</label>
            <textarea
              value={data.note}
              maxLength={299}
              onChange={(e) => setData({ ...data, note: e.target.value })}
              className="resize-none text-2xl p-2 w-80 2xl:w-96 min-h-40 shadow-xl rounded-2xl outline-none dark:bg-run-night-element "
              type="text"
              placeholder="Best run every..."
            ></textarea>
          </div>

          <div className="max-h-96">
            {categories.map((item, index) => (
              <div
                key={index}
                onClick={() => handleDivClick(item.run_category_id)}
                className={`${
                  chosenPlan === item.run_category_id
                    ? "bg-blue-400"
                    : "bg-white dark:bg-run-night-element"
                }
                ${
                  chosenPlan === item.run_category_id
                    ? "text-white"
                    : "text-black"
                }
                text-2xl shadow-2xl rounded-xl w-64 p-2 my-3 cursor-pointer dark:text-white`}
              >
                {item.category_name}
              </div>
            ))}
          </div>

          <button
            onClick={() => handleSubmit()}
            style={{
              "background-image":
                "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
            }}
            className="text-2xl shadow-2xl text-white hover:scale-110 rounded-xl w-80 2xl:w-96 p-2 my-3 duration-200"
          >
            {t("run.newTraining.doTraining")}
          </button>
        </div>
      </div>
      <div className="w-full 2xl:w-1/3 flex flex-col items-center gap-5 mb-10 2xl:mb-0 2xl:justify-evenly">
        <ChartAveragePulse />
        <ChartDistance />
      </div>
      <ToastContainer />
    </div>
  );
};

export default RunNewTraining;
