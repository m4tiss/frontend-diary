const ProfileStatsSlide = ({number, description}) => {
  return (
    <div className="w-full h-32 flex flex-col justify-center items-center">
      <h2 className="text-6xl text-white">{number}</h2>
      <h2 className="text-xl text-white">{description}</h2>
    </div>
  );
};
export default ProfileStatsSlide;
