const FriendStatsPanel = ({user}) => {
  return (
    <div className="flex flex-col rounded-2xl mx-5 my-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            className="object-cover"
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
            }}
            src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${user.profile_photo}`}
          />

          <h2 className=" mx-2 text-2xl">{user.nickname}</h2>
        </div>
        <div>
          <button className="p-2 bg-red-600 rounded-3xl text-white">Visit me</button>
        </div>
      </div>
    </div>
  );
};

export default FriendStatsPanel;
