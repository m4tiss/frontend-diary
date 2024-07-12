import { LineChart } from "@mui/x-charts";
import { useState } from "react";

const GymNewTraining = () => {
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

  const handleDivClick = (plan) => {
    setChosenPlan(plan);
  };

  return (
    <div className="w-full flex flex-grow bg-[#e9ecef]">
      <div className="w-2/3 flex flex-col items-center">
        <h2 className="text-5xl my-10 font-semibold">
          Letss do new training!!!
        </h2>
        <div
          onClick={() => handleDivClick("Upper A")}
          className={`${chosenPlan === "Upper A" ? "bg-red-500" : "bg-white"}
          ${chosenPlan === "Upper A" ? "text-white" : "text-black"}
           text-2xl shadow-2xl rounded-xl w-96 p-2 my-3 cursor-pointer`}
        >
          Upper A
        </div>
        <div
          onClick={() => handleDivClick("Upper B")}
          className={`${
            chosenPlan === "Upper B" ? "bg-red-500" : "bg-white"
          } 
          ${chosenPlan === "Upper B" ? "text-white" : "text-black"}
          text-2xl shadow-2xl rounded-xl w-96 p-2 my-3 cursor-pointer`}
        >
          Upper B
        </div>
        <div
          onClick={() => handleDivClick("Lower A")}
          className={`${
            chosenPlan === "Lower A" ? "bg-red-500" : "bg-white"
          } 
          ${chosenPlan === "Lower A" ? "text-white" : "text-black"}
          text-2xl shadow-2xl rounded-xl w-96 p-2 my-3 cursor-pointer`}
        >
          Lower A
        </div>
        <div
          onClick={() => handleDivClick("Lower B")}
          className={`${
            chosenPlan === "Lower B" ? "bg-red-500" : "bg-white"
          } 
          ${chosenPlan === "Lower B" ? "text-white" : "text-black"}
          text-2xl shadow-2xl rounded-xl w-96 p-2 my-3 cursor-pointer`}
        >
          Lower B
        </div>
        <button
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
          }}
          className="text-2xl shadow-2xl text-white hover:scale-110 rounded-xl w-96 p-2 my-3 duration-200"
        >
          Do training
        </button>
      </div>
      <div className="w-1/3 flex flex-col justify-evenly">
        <div className="bg-white flex flex-col justify-center items-center rounded-2xl shadow-xl p-3 w-fit">
          <h2 className="text-2xl p-2">Last training volume</h2>
          <LineChart
            width={500}
            height={300}
            series={[{ data: pData, label: "Volume", color: GYM_COLOR }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
          />
        </div>
        <div className="bg-white flex flex-col justify-center items-center rounded-2xl shadow-xl p-3 w-fit">
        <h2 className="text-2xl p-2">Last training sets</h2>
          <LineChart
            width={500}
            height={300}
            series={[{ data: uData, label: "Sets", color: RUN_COLOR }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
          />
        </div>
      </div>
    </div>
  );
};

export default GymNewTraining;
