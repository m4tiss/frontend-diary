const RunFriendActionIcon = ({icon, onClick}) => {
  return (
    <button onClick={onClick} className="bg-blue-500 p-2 flex justify-center items-center h-12 w-12 rounded-xl text-white">
      {icon}
    </button>
  );
};

export default RunFriendActionIcon;
