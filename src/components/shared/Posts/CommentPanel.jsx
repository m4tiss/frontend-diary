const CommentPanel = ({ comment }) => {
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
      <div className="flex flex-col">
        <h2 className="font-semibold">{comment?.nickname}</h2>
        <span>{comment?.description}</span>
      </div>
    </div>
  );
};

export default CommentPanel;
