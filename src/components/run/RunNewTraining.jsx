import { LineChart } from "@mui/x-charts";
import { useState, useEffect } from "react";
import { getAuthToken } from "../../config/auth";
import ReactStars from "react-stars";
import axios from '../../config/axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RunNewTraining = () => {
  const GYM_COLOR = "#FF0000";
  const RUN_COLOR = "#1DA1F2";

  const uData = [9, 12, 12, 13, 14, 13, 12];
  const pData = [1300, 1350, 1420, 1370, 1300, 1400, 1500];
  const xLabels = [
    "15.05.2024",
    "16.05.2024",
    "17.05.2024",
    "18.05.2024",
    "19.05.2024",
    "20.05.2024",
    "21.05.2024",
  ];

  const [chosenPlan, setChosenPlan] = useState(null);
  const [data, setData] = useState({
    run_category_id: 1,
    duration: "03:00:00",
    note: "",
    rating: 0.0,
    average_pulse: 0,
    distance: 0.0
  });

  

  const handleDivClick = (plan) => {
    setChosenPlan(plan);
  };


  const handleSubmit = async () => {
    try {
      const runData = {
          run_category_id: data.run_category_id,
          duration: data.duration,
          note: data.note,
          rating: data.rating,
          average_pulse: data.average_pulse,
          distance: data.distance
      };
        
      const token = getAuthToken()
      const resposne = await axios.post("/run/workout", runData, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
      });
      console.log(resposne)
      toast.success("Training added!")
      setData({
        run_category_id: 1,
        duration: "00:00",
        note: "",
        rating: 0.0,
        average_pulse: 0,
        distance: 0.0
      });
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
                    className="text-2xl p-2 rounded-2xl outline-none shadow-xl" placeholder="1h 30min"></input>
                </div>

                <div className="text-left flex flex-col ">
                    <label className="px-2 text-xl">Average pulse</label>
                    <input
                    value={data.average_pulse} 
                    onChange={(e) => setData({ ...data, average_pulse: e.target.value })}
                    className="text-2xl p-2 rounded-2xl outline-none shadow-xl" placeholder="150"></input>
                </div>
                <div className="text-left flex flex-col ">
                    <label className="px-2 text-xl">Distance</label>
                    <input
                    value={data.distance} 
                    onChange={(e) => setData({ ...data, distance: e.target.value })}
                    className="text-2xl p-2 rounded-2xl outline-none shadow-xl" type="number" placeholder="20.3"></input>
                </div>
                <div className="text-left flex flex-col shadow-xl rounded-xl bg-white p-2">
                    <label className="px-2 text-xl">Rating</label>
                    <ReactStars
                        count={5}
                        size={50}
                        color1="#e9ecef"
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
                    className="resize-none text-2xl p-2 w-96 min-h-40 shadow-xl rounded-2xl outline-none" type="text" placeholder="Best run every..."></textarea>
      </div>

             

          <h2 className="text-5xl my-10 font-semibold">
            Letss do new training!!!
          </h2>
          <div
            onClick={() => handleDivClick("LONG RUN")}
            className={`${
              chosenPlan === "LONG RUN" ? "bg-blue-400" : "bg-white"
            }
          ${chosenPlan === "LONG RUN" ? "text-white" : "text-black"}
           text-2xl shadow-2xl rounded-xl w-64 p-2 my-3 cursor-pointer`}
          >
            LONG RUN
          </div>
          <div
            onClick={() => handleDivClick("EASY RUN")}
            className={`${
              chosenPlan === "EASY RUN" ? "bg-blue-400" : "bg-white"
            } 
          ${chosenPlan === "EASY RUN" ? "text-white" : "text-black"}
          text-2xl shadow-2xl rounded-xl w-64 p-2 my-3 cursor-pointer`}
          >
            EASY RUN
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
        <div className="bg-white flex flex-col justify-center items-center rounded-2xl shadow-xl p-3 w-fit">
          <h2 className="text-2xl p-2">Last training volume</h2>
          <LineChart
            width={500}
            height={300}
            series={[{ data: pData, label: "Volume", color: RUN_COLOR }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
          />
        </div>
        <div className="bg-white flex flex-col justify-center items-center rounded-2xl shadow-xl p-3 w-fit">
          <h2 className="text-2xl p-2">Last training sets</h2>
          <LineChart
            width={500}
            height={300}
            series={[{ data: uData, label: "Sets", color: GYM_COLOR }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
          />
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default RunNewTraining;
