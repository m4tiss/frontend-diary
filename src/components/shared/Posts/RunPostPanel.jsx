import { CiHeart } from "react-icons/ci";
import { GoComment } from "react-icons/go";
import { RiShareBoxFill } from "react-icons/ri";

const RunPostPanel = ({ post }) => {
  console.log(post);
  return (
    <div className="w-1/2 h-80 flex bg-white p-5 rounded-xl">
      <div className="w-1/2 flex flex-col gap-5">
        <div className="flex justify-center items-center gap-2">
          <img
            style={{
              borderRadius: "50%",
              width: "80px",
              height: "80px",
            }}
            className="cursor-pointer object-cover"
            src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${post?.profile_photo}`}
          />
          <h2 className="text-2xl">{post?.nickname}</h2>
        </div>
        <div className="text-center text-xl min-h-32 max-h-32">
          {post?.description}
        </div>
        <div className="flex gap-5 items-center px-10">
          <CiHeart size={35} />
          <GoComment size={25} />
          <RiShareBoxFill size={25} />
        </div>
      </div>

      <div className="w-1/2"></div>
    </div>
  );
};

export default RunPostPanel;
