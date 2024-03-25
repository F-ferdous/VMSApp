import React from "react";
import { useNavigate } from "react-router-dom";

const ViewCard = ({ title, link, icon }) => {
  const navigate = useNavigate();
  return (
    <div
      className="rounded-xl p-3 bg-gradient-to-br from-sky-400 to-sky-600 w-[250px] h-[200px] shadow-md cursor-pointer items-center flex flex-col justify-center hover:bg-gradient-to-tr hover:from-sky-600 hover:to-sky-800"
      onClick={() => navigate(`${link}`)}
    >
      <div className="text-[60px] text-white">{icon}</div>
      <h1 className="font-bold text-white text-[20px] shadow-black capitalize text-center">
        {title}
      </h1>
    </div>
  );
};

export default ViewCard;
