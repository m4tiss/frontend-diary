import { motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ToastContainer ,toast } from "react-toastify";
import { getAuthToken } from "../../config/auth";
import axios from '../../config/axios'
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const RunAddGoal = ({ toggleGoalDialog, successGoalDialog }) => {

  const [data, setData] = useState({
    title: "",
    description: "",
    goal: 0.0,
    finish_date: ""
  });

  const today = dayjs();

  const handleSubmit = async () => {
    if (
      !data.title ||
      !data.description ||
      !data.goal ||
      !data.finish_date
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
      };
      console.log(goalData)

      const token = getAuthToken();
      const resposne = await axios.post("/run/goal", goalData, {
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
        className="bg-white flex flex-col rounded-xl p-6 shadow-xl w-1/3 h-fit overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-semibold text-center">ADD NEW GOAL</h2>
        <label className="p-2">Title</label>
        <input
          className="p-2 text-xl  text-black border-2 border-gray-200 outline-none"
          type="text"
          placeholder="Title"
          value={data.title}
          onChange={(e) =>
          setData({ ...data, title: e.target.value })
          }
        />
        <label className="p-2">Description</label>
        <textarea
          className="p-2 text-xl resize-none  text-black border-2 border-gray-200 outline-none"
          type="text"
          placeholder="Description"
          value={data.description}
          onChange={(e) =>
          setData({ ...data, description: e.target.value })
          }
        />
        <label className="p-2">Goal</label>
        <input
          className="p-2 text-xl  text-black border-2 border-gray-200 outline-none"
          type="number"
          placeholder="40.0"
          step={0.1}
          min={0}
          value={data.goal}
          onChange={(e) =>
          setData({ ...data, goal: e.target.value })
          }
        />
        <div className="flex w-full justify-start gap-20 items-center">
          <label className="w-fit p-2">Finish Date</label>
          <div className="flex flex-grow justify-center items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  minDate={today}
                  onChange={(date) =>
                    setData({
                      ...data,
                      finish_date: date
                        ? date.format("YYYY-MM-DD")
                        : "",
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
        <ToastContainer/>
      </motion.div>
    </div>,
    document.body
  );
};

export default RunAddGoal;
