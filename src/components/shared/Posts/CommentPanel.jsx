import { getAuthToken } from "../../../config/auth";
import axios from "../../../config/axios";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useUser } from "../../../providers/UserProvider";
const CommentPanel = ({ comment }) => {
  const { userInfo } = useUser();

  const handleDelete = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.delete("/shared/comment", {
        data: { comment_id: comment.comment_id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Błąd podczas usuwania komentarza:", error);
    }
  };

  return (
    <div className="w-full flex justify-start items-center gap-5">
      <img
        style={{
          borderRadius: "50%",
          width: "80px",
          height: "80px",
        }}
        className="cursor-pointer object-cover"
        src={`${process.env.REACT_APP_IMAGES_URL}images/profilePhotos/${comment?.profile_photo}`}
      />
      <div className="flex flex-col flex-grow">
        <h2 className="font-semibold">{comment?.nickname}</h2>
        <span>{comment?.description}</span>
      </div>
      {userInfo.user_id === comment.user_id && (
        <div className="cursor-pointer" onClick={handleDelete}>
          <RiDeleteBin7Line color="red" size={30} />
        </div>
      )}
    </div>
  );
};

export default CommentPanel;
