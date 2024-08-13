import GymTrainingSlider from "./GymTrainingSlider";

const GymHistory = () => {
  return (
    <div className="w-full flex flex-grow items-stretch bg-[#e9ecef] dark:bg-run-night-background">
      <div className="flex w-full">
        <div className="w-3/4 flex flex-col items-center justify-evenly flex-grow">
          <GymTrainingSlider />
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
              "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
          }}
          className="min-w-96 rounded-2xl flex-grow shadow-xl p-10 m-10"
        >
          <h2 className="text-2xl text-white text-center my-5">Filtration</h2>
          <div className="flex justify-between">
            <h2 className="text-white text-2xl">Category</h2>
            <select
              //value={category}
              //onChange={handleCategoryChange}
              className="bg-run-night-element text-white p-2 rounded mb-4"
            >
              <option value="">All</option>
              {/* {categories.map((category) => (
              <option key={category.run_category_id} value={category.category_name}>
                {category.category_name}
              </option>
            ))} */}
            </select>
          </div>
        </div>
      </div>
    </div>
    // <div className="w-full flex flex-grow items-stretch bg-[#e9ecef]">
    //   <div className="flex p-10 justify-center items-center flex-wrap w-full">
    //     <div className="flex w-full">
    //       <div className="w-3/4">
    //         <div className="text-4xl m-5 flex">Last Trainings</div>
    //         <GymTrainingSlider />
    //       </div>
    //       <div
    //         style={{
    //           "background-image":
    //             "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
    //         }}
    //         className="w-1/4 rounded-2xl shadow-xl mx-5"
    //       >
    //         <h2 className="text-2xl text-white text-center my-5">Filtration</h2>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default GymHistory;
