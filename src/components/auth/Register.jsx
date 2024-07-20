import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { motion } from "framer-motion";

const Register = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    nickname: "",
    date_of_birth: "",
    description: "",
    profile_photo: "",
  });

  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(`No file`);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(`${file.name}`);
      setData({ ...data, profile_photo: file.name });
    } else {
      setSelectedFileName(`No file`);
    }
  };

  const handleSendPhoto = async (timestamp) => {
    if (!selectedFile) return null;

    const fileExtension = selectedFile.name;
    const newFileName = `${timestamp}-${fileExtension}`;
    const newFile = new File([selectedFile], newFileName, {
      type: selectedFile.type,
    });
    try {
      const formData = new FormData();
      formData.append("profilePhoto", newFile);
      const response = await axios.post("/public/profilePhoto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload photo");
      return null;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !data.email ||
      !data.password ||
      !data.nickname ||
      !data.description ||
      !data.profile_photo ||
      !data.date_of_birth
    ) {
      toast.error("All fields must be filled");
      return;
    }

    const timestamp = Date.now();

    try {
      const registerData = {
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        description: data.description,
        profile_photo: timestamp + "-" + data.profile_photo,
        date_of_birth: data.date_of_birth,
      };

      const resposne = await axios.post("/public/register", registerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (resposne.status === 204) {
        toast.error("Email already exists");
        return;
      }
      toast.success("Registration succesfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error:", error);
    }

    const photoUploadResponse = await handleSendPhoto(timestamp);

    if (!photoUploadResponse) {
      toast.error("Failed to upload photo");
      return;
    }
  };

  const today = dayjs();

  return (
    <>
      <div
        style={{
          "background-image":
            "linear-gradient(to top, #ffffff, #f1d3f5, #fc9fcd, #ff6685, #e73725)",
        }}
        className="min-h-screen flex"
      >
        <div className="w-full my-10 2xl:my-0 flex justify-center items-center z-50">
          <motion.form
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            className="flex h-fit w-1/2 p-10 gap-10 bg-white rounded-2xl shadow-xl"
            onSubmit={handleRegister}
          >
            <div className="flex flex-col w-1/2">
              <h2 className="w-full text-4xl text-center font font-semibold">
                Register
              </h2>
              <div className="flex flex-col">
                <label className="p-2">Email</label>
                <input
                  className="p-2 text-xl  text-black border-2 border-gray-200 outline-none"
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>

              <div className="flex flex-col">
                <label className="p-2">Password</label>
                <input
                  minLength={6}
                  className="p-2 text-xl text-black border-2 border-gray-200 outline-none"
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                />
              </div>

              <button
                className="my-10 bg-[#e73725] rounded-3xl p-2 text-xl text-white"
                type="submit"
              >
                Register
              </button>
              <label
                onClick={() => navigate("/login")}
                className="w-full text-center cursor-pointer"
              >
                I have an account
              </label>
            </div>
            <div className="w-1/2">
              <div className="flex flex-col ">
                <div className="flex justify-start gap-20 items-center">
                  <label className="p-2">Birth Date</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        maxDate={today}
                        onChange={(date) =>
                          setData({
                            ...data,
                            date_of_birth: date
                              ? date.format("YYYY-MM-DD")
                              : "",
                          })
                        }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                <label className="p-2">Profile photo</label>
                <label
                  htmlFor="fileInput"
                  class="h-12 flex justify-center items-center px-4 py-2 bg-white-500
                   text-[#e73725] 
                  border-2 border-[#e73725] 
                  rounded-3xl 
                    cursor-pointer transition-colors duration-300 hover:text-white hover:bg-[#e73725]"
                >
                  {selectedFileName}
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <label className="p-2">Nickname</label>
                <input
                  className="p-2 text-xl  text-black border-2 border-gray-200 outline-none"
                  type="text"
                  placeholder="Nickname"
                  value={data.nickname}
                  onChange={(e) =>
                    setData({ ...data, nickname: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col ">
                <label className="p-2">Description</label>
                <textarea
                  className="p-2 text-xl resize-none text-black border-2 border-gray-200 outline-none"
                  type="text"
                  placeholder="Description"
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                />
              </div>
            </div>
          </motion.form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
