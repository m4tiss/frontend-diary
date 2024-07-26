import { motion } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";
import { ToastContainer ,toast } from "react-toastify";
import { getAuthToken } from "../../config/auth";
import axios from '../../config/axios'
import "react-toastify/dist/ReactToastify.css";
const RunAddCategory = ({ toggleCategoryDialog, successCategoryDialog }) => {

  const [categoryName, setCategoryName] = useState("");


  const handleSubmit = async () => {
    if (
      !categoryName
    ) {
      toast.error("Category name must be filled");
      return;
    }

    try {
       const token = getAuthToken();
      const resposne = await axios.post("/run/userCategory", {category_name : categoryName}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      console.log(resposne)
      successCategoryDialog()
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={toggleCategoryDialog}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.2, opacity: 0 }}
        className="bg-white flex flex-col rounded-xl p-6 shadow-xl w-1/3 h-fit overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-semibold text-center">ADD NEW CATEGORY</h2>
        <label className="p-2">Category Name</label>
        <input
          className="p-2 text-xl  text-black border-2 border-gray-200 outline-none"
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) =>
            setCategoryName(e.target.value)
          }
        />
        <button
          className="bg-lime-500 mt-5 text-white w-full p-2 rounded-xl shadow-xl"
          onClick={handleSubmit}
        >
          Add category
        </button>
        <button
          className="bg-red-500 mt-5 text-white w-full p-2 rounded-xl shadow-xl"
          onClick={toggleCategoryDialog}
        >
          Close
        </button>
         <ToastContainer/>
      </motion.div>
    </div>,
    document.body
  );
};

export default RunAddCategory;
