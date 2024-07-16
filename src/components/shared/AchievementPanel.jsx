import { Line } from "rc-progress";

const AcheviementPanel = ({ title, percent, description, toggleDialog }) => {
  let lineColor = "#e63946";
  if (percent > 30 && percent < 80) lineColor = "#ffd60a";
  if (percent >= 80) lineColor = "#70e000";

  return (
    <div
    onClick={toggleDialog}
      className="w-96 h-32 flex flex-col items-center justify-evenly rounded-2xl
           bg-white border-black m-5 cursor-pointer shadow-xl"
    >
      <div className="w-full px-5 font-semibold text-right text-xl">
        {percent}%
        <Line percent={percent} trailColor="#FFFFFF" strokeColor={lineColor} />
      </div>
      <div className="flex justify-evenly items-center w-full">
        <div className="w- flex flex-col">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <span className="text-xl text-wrap">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default AcheviementPanel;
