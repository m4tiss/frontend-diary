const SmallStatsPanel = ({ title, description }) => {
  return (
    <div className="w-72 flex flex-col bg-[white] rounded-2xl justify-center shadow-xl p-5">
      <div className="flex justify-start text-xl font-semibold">{title}</div>
      <div className="flex justify-start text-3xl font-semibold">
        {description}
        {/* <div className=" text-xl flex justify-center items-center  w-fit p-2 bg-[#426c4d] rounded-xl text-[#65e76a]">
          110 %
        </div> */}
      </div>
    </div>
  );
};

export default SmallStatsPanel;
