import ReactStars from "react-stars";
import pic from "../../images/trainig_panel.jpg";
const GymTrainingSlide = ({ title, duration, sets, rating }) => {
  return (
    <div
      className="w-96 h-96 flex flex-col items-center justify-evenly rounded-2xl
           bg-white border-black m-5 cursor-pointer shadow-xl"
    >
      <div>
        <h2 className="text-2xl">{title}</h2>
      </div>
      <div className="flex justify-start w-full px-5  text-xl">
        <span className="text-5xl text-center  w-full">{duration}</span>
      </div>
      <div className="flex justify-evenly w-full px-5  text-xl">
        <span className=" text-center">
          Sets: <span className="">{sets}</span>
        </span>
        <span className="">
          Weights: <span className="">500 kg</span>
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
        <img width={80} src={pic} />
        <h2 className=" text-xl">20.05.2024</h2>
      </div>
    </div>
  );
};

export default GymTrainingSlide;
