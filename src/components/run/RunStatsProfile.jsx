import { useUser } from "../../providers/UserProvider";
import { formattedDate } from "../../functions/formatData";

const RunStatsProfile = () => {
  const { userInfo } = useUser();
  return (
    <div
      className="rounded-3xl bg-[#E73725] flex flex-col p-10 shadow-xl"
      style={{
        "background-image":
          "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
      }}
    >
      <div className="flex">
        <img
          style={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
          }}
          className="cursor-pointer object-cover"
          src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${userInfo.profile_photo}`}
        />
        <div className="flex items-center mx-5">
          <span className="text-white text-2xl">{userInfo.nickname}</span>
        </div>
      </div>
      <div className="flex justify-between text-white my-3">
        <span>Joined platform</span>{" "}
        <span>{formattedDate(userInfo.created_at)}</span>
      </div>
      <div className="flex justify-between text-white my-3">
        <span>Friends</span> <span>{userInfo.friends_count}</span>
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
