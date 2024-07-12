import profile from "../../images/cris.jpg";
const FriendStatsPanel = () => {
  return (
    <div className="flex flex-col rounded-2xl mx-5 my-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="rounded-full object-cover"
            width={50}
            height={50}
            src={profile}
          />

          <h2 className=" mx-2 text-2xl">Koslinj</h2>
        </div>
        <div>
          <button className="p-2 bg-red-600 rounded-3xl text-white">Visit me</button>
        </div>
      </div>
    </div>
  );
};

export default FriendStatsPanel;
