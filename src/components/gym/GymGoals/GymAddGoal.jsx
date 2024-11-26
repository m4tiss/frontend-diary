import { motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import chestIcon from "../../../icons/chestIcon.jpg";
import backIcon from "../../../icons/backIcon.jpg";
import bicepsIcon from "../../../icons/bicepsIcon.jpg";
import tricepsIcon from "../../../icons/tricepsIcon.jpg";
import shouldersIcon from "../../../icons/shouldersIcon.jpg";
import absIcon from "../../../icons/absIcon.jpg";
import legsIcon from "../../../icons/legsIcon.jpg";

const icons = {
  "chestIcon.jpg": chestIcon,
  "backIcon.jpg": backIcon,
  "bicepsIcon.jpg": bicepsIcon,
  "tricepsIcon.jpg": tricepsIcon,
  "shouldersIcon.jpg": shouldersIcon,
  "absIcon.jpg": absIcon,
  "legsIcon.jpg": legsIcon,
};

const GymAddGoal = ({ toggleGoalDialog, successGoalDialog }) => {
  const [selectedCategory, setSelectedCategory] = useState("Chest");
  const categories = [
    "Chest",
    "Back",
    "Biceps",
    "Triceps",
    "Shoulders",
    "Abs",
    "Legs",
  ];

  const [data, setData] = useState({
    title: "",
    description: "",
    goal: 0.0,
    finish_date: "",
    type: "",
  });

  const today = dayjs();

  const handleSubmit = async () => {
    if (
      !data.title ||
      !data.description ||
      !data.goal ||
      !data.finish_date ||
      !selectedCategory
    ) {
      toast.error("All fields must be filled");
      return;
    }

    try {
      const goalData = {
        title: data.title,
        description: data.description,
        goal: data.goal,
        finish_date: data.finish_date,
        type: selectedCategory
      };
      console.log(goalData)

      const token = getAuthToken();
      const resposne = await axios.post("/gym/goal", goalData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log(resposne)
      successGoalDialog()
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleGoalDialog}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.2, opacity: 0 }}
        className="bg-white flex flex-col rounded-xl p-6 shadow-xl xl:w-2/3 w-full h-5/6 overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-semibold text-center">ADD NEW GOAL</h2>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
          {categories.map((category) => (
            <div
              key={category}
              className={`flex flex-col items-center cursor-pointer ${
                selectedCategory === category
                  ? "border-4 border-lime-500"
                  : "border-4 border-gray-200"
              } rounded-lg p-2`}
              onClick={() => setSelectedCategory(category)}
            >
              <img
                src={icons[`${category.toLowerCase()}Icon.jpg`]}
                alt={category}
                className="w-16 h-16 object-contain"
              />
              <span
                className={`text-lg font-medium mt-2 ${
                  selectedCategory === category
                    ? "text-lime-500"
                    : "text-gray-700"
                }`}
              >
                {category}
              </span>
            </div>
          ))}
        </div>
        <label className="p-2">Title</label>
        <input
          className="p-2 text-xl  text-black border-2 border-gray-200 outline-none"
          type="text"
          placeholder="Title"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        <label className="p-2">Description</label>
        <textarea
          className="p-2 text-xl resize-none text-black border-2 border-gray-200 outline-none min-h-[8rem]"
          placeholder="Description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />

        <label className="p-2">Goal</label>
        <input
          className="p-2 text-xl text-black border-2 border-gray-200 outline-none"
          type="number"
          placeholder="12"
          step={1}
          min={0}
          value={data.goal}
          onChange={(e) => setData({ ...data, goal: e.target.value })}
        />
        <div className="flex flex-col xl:flex-row w-full justify-center  xl:gap-20 items-start xl:items-center">
          <label className="w-fit p-2">Finish Date</label>
          <div className="flex flex-grow justify-start items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  minDate={today}
                  onChange={(date) =>
                    setData({
                      ...data,
                      finish_date: date ? date.format("YYYY-MM-DD") : "",
                    })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
        <button
          className="bg-lime-500 mt-5 text-white w-full p-2 rounded-xl shadow-xl"
          onClick={handleSubmit}
        >
          Add goal
        </button>
        <button
          className="bg-red-500 mt-5 text-white w-full p-2 rounded-xl shadow-xl"
          onClick={toggleGoalDialog}
        >
          Close
        </button>
        <ToastContainer />
      </motion.div>
    </div>,
    document.body
  );
};

export default GymAddGoal;
