import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useState, useEffect } from "react";
import { TbRun } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import RunPostPanel from "./RunPostPanel";
import GymPostPanel from "./GymPostPanel";
import NewGymPost from "./NewGymPost";
import NewRunPost from "./NewRunPost";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isOpenNewGym, setIsOpenNewGym] = useState(false);
  const [isOpenNewRun, setIsOpenNewRun] = useState(false);
  const [postsUpdated, setPostsUpdated] = useState(false);

  const postAdded = () => {
    setPostsUpdated((prev) => !prev);
  };

  const toggleGym = () => {
    setIsOpenNewGym((prev) => !prev);
  };

  const toggleRun = () => {
    setIsOpenNewRun((prev) => !prev);
  };

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get("/shared/post/getAll", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Błąd podczas dodawania posta:", error);
      }
    };

    getAllPosts();
  }, [postsUpdated]);

  return (
    <div className="w-full flex flex-grow flex-col justify-start items-center bg-[#e9ecef] dark:bg-run-night-background py-10 xl:px-0  gap-5">
      <div className="flex flex-col 2xl:flex-row gap-10">
        <motion.div
          onClick={toggleGym}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
          }}
          className="h-12 w-80 flex text-white text-2xl justify-center items-center cursor-pointer gap-3 rounded-xl"
        >
          NEW <CgGym size={40} />
        </motion.div>
        <motion.div
          onClick={toggleRun}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
          }}
          className="h-12 w-80 flex text-white  text-2xl justify-center items-center cursor-pointer  gap-3 rounded-xl"
        >
          NEW <TbRun size={40} />
        </motion.div>
      </div>
      {posts.map((post) => {
        if (post.type === "run") {
          return <RunPostPanel key={post.post_id} post={post} onDelete={setPostsUpdated} />;
        } else if (post.type === "gym") {
          return <GymPostPanel key={post.post_id} post={post} onDelete={setPostsUpdated} />;
        }
        return null;
      })}
      <AnimatePresence>
        {isOpenNewGym && <NewGymPost toggleGym={toggleGym} postAdded={postAdded} />}
      </AnimatePresence>

      <AnimatePresence>
        {isOpenNewRun && <NewRunPost toggleRun={toggleRun} />}
      </AnimatePresence>
    </div>
  );
};

export default PostsPage;
