import profilePhoto from "../../images/lebron.png";
const RunStatsProfile = () => {
  return (
    <div
      className="rounded-3xl bg-[#E73725] flex flex-col p-10 shadow-xl"
      style={{'background-image': 'linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)'}}

    >
      <div className="flex">
        <img
          className="rounded-full object-cover"
          width={50}
          height={50}
          src={profilePhoto}
        />
        <div className="flex items-center mx-5">
          <span className="text-white text-2xl">m4tiss</span>
        </div>
      </div>
      <div className="flex justify-between text-white my-3">
        <span>Joined platform</span> <span>6 Dec 2020</span>
      </div>
      <div className="flex justify-between text-white my-3">
        <span>Friends</span> <span>243</span>
      </div>
      <div className="flex justify-between text-white my-3">
        <span>Week kilometers</span>{" "}
        <div className="bg-lime-500 flex justify-center  w-16 rounded-full">
          110% ➚{" "}
        </div>{" "}
        <span>432</span>
      </div>
    </div>
  );
};

export default RunStatsProfile;
//➘ ➙
