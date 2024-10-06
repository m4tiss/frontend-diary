import { useState, useEffect } from "react";
import RunTrainings from "./RunTrainings";
import axios from "../../../config/axios";
import { getAuthToken } from "../../../config/auth";
import { useTranslation } from "react-i18next";

const RunHistory = () => {
  const [categories, setCategories] = useState([]);
  const [category, setAllCategory] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    const token = getAuthToken();
    axios
      .get("/run/category/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        let response = res.data.categories;
        console.log(response);
        setCategories(response);
      });
  }, []);

  const handleCategoryChange = (e) => {
    setAllCategory(e.target.value);
  };

  return (
    <div className="w-full flex flex-grow flex-col items-center bg-[#e9ecef] dark:bg-gym-night-background gap-10 p-5 xl:p-10">
              <div
          style={{
            "background-image":
              "linear-gradient(to bottom, #1da1f2, #1794e4, #1087d5, #087ac7, #006eb9)",
          }}
          className="min-w-80 xl:min-w-96 rounded-2xl  shadow-xl p-10"
        >
          <h2 className="text-2xl text-white text-center my-5">
            {t("gym.historyTraining.filtration")}
          </h2>
          <div className="flex justify-between">
            <h2 className="text-white text-2xl">
              {t("gym.historyTraining.category")}
            </h2>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="bg-run-night-element text-white p-2 rounded mb-4"
            >
              <option value="">{t("run.historyTraining.all")}</option>
              {categories.map((category) => (
                <option
                  key={category.run_category_id}
                  value={category.category_name}
                >
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full px-5 xl:px-0 flex flex-grow flex-wrap justify-center">
          <RunTrainings categoryName={category} />
      </div>
    </div>
  );
};

export default RunHistory;
