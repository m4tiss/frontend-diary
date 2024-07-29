import RunTrainingSlider from "./RunTrainingSlider";
const RunHistory = () => {
  return (
    <div className="w-full flex flex-grow items-stretch bg-[#e9ecef] dark:bg-run-night-background">
      <div className="flex w-full">
        <div className="w-3/4 flex flex-col items-center justify-evenly flex-grow">
        <RunTrainingSlider />
          <div className="w-1/2 text-center gap-5 p-3 rounded-xl shadow-xl bg-white flex flex-col dark:bg-run-night-element dark:text-white">
            <h2 className="text-5xl">Last Trainings</h2>
            <label className="text-xl">
              Regular exercise can improve mental health by reducing symptoms of
              anxiety and depression. Research shows that physical activity
              releases endorphins, which are natural mood lifters. Additionally,
              regular exercise can enhance cognitive function and help with
              better sleep, leading to overall improved well-being.
            </label>
          </div> 
        </div>
        <div
          style={{
            "background-image":
              "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
          }}
          className="w-1/4 rounded-2xl flex-grow shadow-xl p-10 m-10"
        >
          <h2 className="text-2xl text-white text-center my-5">Filtration</h2>
        </div>
      </div>
    </div>
  );
};

export default RunHistory;
