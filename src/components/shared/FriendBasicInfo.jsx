
const FriendBasicInfo = ({ friendInfo }) => {
  return (
    <div className="w-full flex items-center h-fit justify-evenly my-10">
    <img
      style={{
        borderRadius: "50%",
        width: "250px",
        height: "250px",
      }}
      className="cursor-pointer object-cover shadow-xl border-2 border-black dark:border-white my-5"
      src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${friendInfo?.profile_photo}`}
    />
    <div className="bg-white dark:bg-run-night-element min-w-96 w-1/2 gap-5 flex flex-col dark:text-white text-center p-2 rounded-xl shadow-xl">
      <h2 className="text-3xl font-semibold">{friendInfo?.nickname}</h2>
      <p className="text-lg">{friendInfo?.description}</p>
    </div>
  </div>
  );
};

export default FriendBasicInfo;
