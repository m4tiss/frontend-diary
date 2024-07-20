import profilePhoto from "../../images/lebron.png";
import { useUser } from "../../providers/UserProvider";
const GymStatsProfile = () => {
  const { userInfo } = useUser();
  return (
    <div
      className="rounded-3xl bg-[#E73725] flex flex-col p-10 shadow-xl"
      style={{
        "background-image":
          "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
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
        <span>Week volume</span>{" "}
        <div className="bg-lime-500 flex justify-center  w-16 rounded-full">
          110% ➚{" "}
        </div>{" "}
        <span>1000</span>
      </div>
    </div>
  );
};

export default GymStatsProfile;
//➘ ➙
