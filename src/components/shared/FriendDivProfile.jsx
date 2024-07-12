const FriendDivProfile = ({nickname,profileImage}) => {
    return (
      <div className="relative flex flex-col justify-center items-center gap-2">
      <div className="relative group">
        <img
          className="rounded-full"
          width={100}
          src={profileImage}
          alt="Profile"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black opacity-0 
        group-hover:opacity-80 transition-opacity duration-300 rounded-full">
          <p className="flex justify-center flex-wrap items-center 
          p-5 h-full text-white opacity-0 group-hover:opacity-100 
          duration-700 ease-in-out text-center transform translate-y-20 
          group-hover:translate-y-0">
            {nickname}
          </p>
        </div>
      </div>
      <label className="text-xl">{nickname}</label>
    </div>
    );
  };
  
  export default FriendDivProfile;
  