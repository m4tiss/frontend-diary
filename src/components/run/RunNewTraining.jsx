import { LineChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../config/auth";
import ReactStars from "react-stars";
import axios from "../../config/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChartAveragePulse from "./charts/ChartAveragePulse";
import ChartDistance from "./charts/ChartDistance";

const validateDuration = (duration) => {
  const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
  return regex.test(duration);
};

const RunNewTraining = () => {
  const [categories, setCategories] = useState([]);
  const [chosenPlan, setChosenPlan] = useState(null);
  const [data, setData] = useState({
    run_category_id: 0,
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
        console.log(response);
        setCategories(response);
      });
  }, []);

  const handleDivClick = (plan) => {
    setChosenPlan(plan);
    setData({ ...data, run_category_id: plan });
  };

  const handleSubmit = async () => {
    if (
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
        duration: data.duration,
        note: data.note,
        rating: data.rating,
        average_pulse: data.average_pulse,
        distance: data.distance,
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full flex flex-grow bg-[#e9ecef]">
      <div className="w-2/3 flex justify-center">
        <div className="w-1/2 flex flex-col items-center justify-evenly my-10">
          <div className="text-left flex flex-col">
            <label className="px-2 text-xl">Duration</label>
            <input
              value={data.duration}
              onChange={(e) => setData({ ...data, duration: e.target.value })}
              className="text-2xl p-2 rounded-2xl outline-none shadow-xl"
              placeholder="1h 30min"
            ></input>
          </div>

          <div className="text-left flex flex-col ">
            <label className="px-2 text-xl">Average pulse</label>
            <input
              value={data.average_pulse}
              onChange={(e) =>
                setData({ ...data, average_pulse: e.target.value })
              }
              className="text-2xl p-2 rounded-2xl outline-none shadow-xl"
              placeholder="150"
            ></input>
          </div>
          <div className="text-left flex flex-col ">
            <label className="px-2 text-xl">Distance</label>
            <input
              value={data.distance}
              onChange={(e) => setData({ ...data, distance: e.target.value })}
              className="text-2xl p-2 rounded-2xl outline-none shadow-xl"
              type="number"
              placeholder="20.3"
            ></input>
          </div>
          <div className="text-left flex flex-col  rounded-xl p-2">
            <label className="px-2 text-xl">Rating</label>

            <input
              value={data.rating}
              step={0.1}
              min={0}
              max={5}
              onChange={(e) => setData({ ...data, rating: e.target.value })}
              className="text-2xl p-2 rounded-2xl outline-none shadow-xl"
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
        <div className="w-1/2 flex flex-col items-center justify-evenly my-10">
          <div className="text-left flex flex-col ">
            <label className="px-2 text-xl">Note</label>
            <textarea
              value={data.note}
              onChange={(e) => setData({ ...data, note: e.target.value })}
              className="resize-none text-2xl p-2 w-96 min-h-40 shadow-xl rounded-2xl outline-none"
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
                    : "bg-white"
                }
                ${
                  chosenPlan === item.run_category_id
                    ? "text-white"
                    : "text-black"
                }
                text-2xl shadow-2xl rounded-xl w-64 p-2 my-3 cursor-pointer`}
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
            className="text-2xl shadow-2xl text-white hover:scale-110 rounded-xl w-96 p-2 my-3 duration-200"
          >
            Do training
          </button>
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-evenly">
        <ChartAveragePulse />
        <ChartDistance />
      </div>
      <ToastContainer />
    </div>
  );
};

export default RunNewTraining;
