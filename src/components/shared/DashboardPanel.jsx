import React from "react";
const DashboardPanel = ({ title, icon, onclick, background }) => {
  return (
    <div
      onClick={onclick}
      className={`w-60 h-60 border-2 rounded-xl shadow-xl flex flex-col cursor-pointer duration-300 transform translate-y-0 transition-transform hover:-translate-y-20`}
      style={{ backgroundImage: `${background}` }}
    >
      <div className="h-1/2 flex justify-center items-end">
        <img src={icon} alt="Icon" className="w-20 h-20 object-contain" />
      </div>
      <div className="h-1/2 flex justify-center items-center">
        <h2 className="text-white font-semibold tracking-widest text-center text-xl">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default DashboardPanel;
