import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useState, useEffect } from "react";
import { TbRun } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import RunPostPanel from "./RunPostPanel";
import GymPostPanel from "./GymPostPanel";
import NewGymPost from "./NewGymPost";
import NewRunPost from "./NewRunPost";
import ContentContext from "../../../providers/ContentProvider";

const PostsPage = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [isOpenNewGym, setIsOpenNewGym] = useState(false);
  const [isOpenNewRun, setIsOpenNewRun] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [pattern, setPattern] = useState("");
  const { isGymContent } = useContext(ContentContext);

  const postAdded = () => {
    setPage(1);
    setPosts([]);
    fetchPosts(1, pattern);
  };

  const toggleGym = () => {
    setIsOpenNewGym((prev) => !prev);
  };

  const toggleRun = () => {
    setIsOpenNewRun((prev) => !prev);
  };

  const fetchPosts = async (currentPage, searchPattern) => {
    try {
      const token = getAuthToken();
      const response = await axios.get("/shared/post/getAll", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          pattern: searchPattern,
        },
      });

      const { posts, hasMore } = response.data;
      setPosts((prevPosts) => (currentPage === 1 ? posts : [...prevPosts, ...posts]));
      setHasMore(hasMore);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setPosts([]);
    fetchPosts(1, pattern);
  }, [pattern]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage, pattern);
  };

  const handleSearchChange = (e) => {
    setPattern(e.target.value);
  };

  return (
    <div className="w-full flex flex-grow flex-col justify-start items-center bg-[#e9ecef] dark:bg-run-night-background py-10 xl:px-0 gap-5">
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
      <div className="w-80 my-4">
        <input
          type="text"
          value={pattern}
          onChange={handleSearchChange}
          placeholder={"Nick.."}
          className="w-full  p-3 rounded-lg text-xl border  dark:border-gray-700 outline-none  dark:bg-gray-800 dark:text-white"
        />
      </div>
      <div className="text-2xl font-semibold">
        {t("shared.posts.lastPosts")}
      </div>

      {posts.length === 0 ? (
        <div className="text-4xl text-black">{t("shared.posts.noPosts")}</div>
      ) : (
        posts.map((post) => {
          if (post.type === "run") {
            return (
              <RunPostPanel key={post.post_id} post={post} onDelete={postAdded} />
            );
          } else if (post.type === "gym") {
            return (
              <GymPostPanel key={post.post_id} post={post} onDelete={postAdded} />
            );
          }
          return null;
        })
      )}

      {hasMore && (
        <div className="w-full flex justify-center mt-4">
          <motion.button
            onClick={handleLoadMore}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="w-40 text-white p-3 rounded-xl shadow-xl text-xl"
            style={
              isGymContent
                ? {
                    backgroundImage:
                      "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
                  }
                : {
                    backgroundImage:
                      "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
                  }
            }
          >
            {t("gym.historyTraining.loadMore")}
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {isOpenNewGym && (
          <NewGymPost toggleGym={toggleGym} postAdded={postAdded} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isOpenNewRun && (
          <NewRunPost toggleRun={toggleRun} postAdded={postAdded} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostsPage;
