import ReactStars from "react-stars";
import pic from "../../icons/runIcon.png"
const RunTrainingSlide = ({ title, distance, date, duration, rating }) => {
  return (
    <div
      className="w-96 h-96 flex flex-col items-center justify-evenly rounded-2xl
           bg-white border-black m-5 cursor-pointer shadow-xl"
    >
      <div>
        <h2 className="text-2xl">{title}</h2>
      </div>
      <div className="flex justify-start w-full px-5  text-xl">
         <span className="text-5xl text-center  w-full">{distance} km</span>
      </div>
      <div className="flex justify-evenly w-full px-5  text-xl">
        <span className=" text-center">
        <span className="">{duration}</span>
        </span>
        <span className="">
          <span className="">2:30/km</span>
        </span>
      </div>

      <div className="w-full flex justify-evenly items-center">
        <h2 className="text-3xl">{rating}</h2>
        <ReactStars
          count={5}
          size={30}
          color1="gray"
          color2={"#ffd700"}
          value={rating}
          edit={false}
        />
      </div>
      <div className=" w-full flex justify-evenly items-center">
      <img width={60} src={pic}/>
      <h2 className=" text-xl">{date}</h2>
      </div>
      
    </div>
  );
};

export default RunTrainingSlide;
