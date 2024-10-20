import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useState, useEffect } from "react";
import { TbRun } from "react-icons/tb";
import { CgGym } from "react-icons/cg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import RunPostPanel from "./RunPostPanel";
import GymPostPanel from "./GymPostPanel";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);

  // const sendPost = async () => {
  //   try {
  //     const token = getAuthToken();
  //     const response = await axios.post(
  //       "/shared/post",
  //       {
  //         gym_workout_id: null,
  //         run_workout_id: 82,
  //         description: "Opis treningu biegowego",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Post dodany pomyślnie:", response.data);
  //   } catch (error) {
  //     console.error("Błąd podczas dodawania posta:", error);
  //   }
  // };

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
  }, []);

  return (
    <div className="w-full flex flex-grow flex-col justify-start items-center bg-[#e9ecef] dark:bg-run-night-background py-10 xl:px-0 px-5 gap-8">
      <div className="flex gap-10">
        <div
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #e73725, #e62c37, #e22547, #dd2155, #d52362)",
          }}
          className="h-12 w-36 flex text-white text-2xl justify-center items-center gap-3 rounded-xl"
        >
          NEW <CgGym size={40}/>
        </div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
          }}
          className="h-12 w-36 flex text-white  text-2xl justify-center items-center gap-3 rounded-xl"
        >
          NEW <TbRun size={40}/>
        </div>
      </div>
      {posts.map((post) => {
        if (post.type === "run") {
          return <RunPostPanel key={post.post_id} post={post} />;
        } else if (post.type === "gym") {
          return <GymPostPanel key={post.post_id} post={post} />;
        }
        return null;
      })}
    </div>
  );
};

export default PostsPage;
