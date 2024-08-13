import { useState } from "react";

const GymPlannedWorkout = () => {
  const [chosenPlan, setChosenPlan] = useState(null);

  const handleDivClick = (plan) => {
    setChosenPlan(plan);
  };

  return (
    <div className="w-full flex flex-grow flex-col 2xl:flex-row justify-center bg-[#e9ecef] dark:bg-run-night-background">
      <div className="w-full flex flex-col items-center">
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
          className={`${chosenPlan === "Upper B" ? "bg-red-500" : "bg-white"} 
          ${chosenPlan === "Upper B" ? "text-white" : "text-black"}
          text-2xl shadow-2xl rounded-xl w-96 p-2 my-3 cursor-pointer`}
        >
          Upper B
        </div>
        <div
          onClick={() => handleDivClick("Lower A")}
          className={`${chosenPlan === "Lower A" ? "bg-red-500" : "bg-white"} 
          ${chosenPlan === "Lower A" ? "text-white" : "text-black"}
          text-2xl shadow-2xl rounded-xl w-96 p-2 my-3 cursor-pointer`}
        >
          Lower A
        </div>
        <div
          onClick={() => handleDivClick("Lower B")}
          className={`${chosenPlan === "Lower B" ? "bg-red-500" : "bg-white"} 
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
    </div>
  );
};

export default GymPlannedWorkout;
