import RunFriendActionIcon from "./RunFriendActionsIcon";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { PiSword } from "react-icons/pi";
import { GiAchievement } from "react-icons/gi";


const RunFriendActions = () => {
    return (
        <div className="w-1/3 flex flex-col justify-start items-center bg-white dark:bg-run-night-element rounded-xl m-10 shadow-xl">
          <div className="w-full flex justify-center items-center flex-grow">
            <div className="w-1/6 flex flex-col justify-start items-center gap-4">
            <RunFriendActionIcon icon={
                <IoChatboxEllipsesOutline size={30}/>
            }/>
            <RunFriendActionIcon icon={
                <PiSword size={30} />
            }/>            <RunFriendActionIcon icon={
                <GiAchievement size={30}/>
            }/>            <RunFriendActionIcon icon={
                <IoChatboxEllipsesOutline size={30}/>
            }/>
            </div>
            <div className="w-5/6 flex flex-col justify-start items-center gap-5">
              <h2 className="text-2xl font-semibold">Fight with your friend</h2>
              <label className="text-center px-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                rerum perferendis obcaecati repellat. Sint, voluptatem suscipit
                accusantium debitis non ullam est, corrupti, perspiciatis
                nostrum fugiat repellendus amet placeat labore perferendis!
              </label>
              <button className="bg-red-600 p-2 text-white text-2xl rounded">Fight with your Friends</button>
            </div>
          </div>
        </div>
    );
  };
  
  export default RunFriendActions;
  