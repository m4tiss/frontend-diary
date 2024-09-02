const SmallStatsPanel = ({ title, description }) => {
  return (
    <div className="min-w-72 flex flex-col bg-[white] dark:bg-run-night-element dark:text-white rounded-2xl justify-center shadow-xl p-5">
      <div className="flex justify-start text-xl font-semibold">{title}</div>
      <div className="flex justify-start text-3xl font-semibold">
        {description}
      </div>
    </div>
  );
};

export default SmallStatsPanel;
