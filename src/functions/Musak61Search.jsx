import React, { useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Musak61Search = () => {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const navigate = useNavigate();
  const handleSearch = (e) => {
    const startDate = dateFrom.toLocaleDateString();
    const endDate = dateTo.toLocaleDateString();
  };

  const GoBack = () => {
    navigate("/");
  };

  return (
    <section className="w-full flex flex-col items-center justify-center mt-2 p-2 mx-5">
      <div className="bg-gray-100 w-[90%] pb-5">
        <div className="bg-gradient-to-tl from-sky-400 to-sky-800 p-2 flex justify-between items-center">
          <h1 className="text-white text[18px] font-bold">
            Musak 6.1 Reports Search
          </h1>
          <button
            className="px-3 py-2 text[18px] text-white rounded-lg bg-[#0a4c76] hover:bg-[#13384f]"
            onClick={GoBack}
          >
            Go Back
          </button>
        </div>

        <hr />
        <div className="mt-5">
          <div className="flex justify-evenly">
            <div className="w-[40%]">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                  Select Start Date
                </label>
                <DatePicker
                  className="appearance-none block text-[18px] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  selected={dateFrom}
                  onChange={(date) => setDateFrom(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="w-[40%]">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                  Select End Date
                </label>
                <DatePicker
                  className="appearance-none block text-[18px] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  selected={dateTo}
                  onChange={(date) => setDateTo(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="w-[20%]">
              <button
                type="submit"
                className=" text-white bg-[#FF5C8E] hover:bg-[#b33058] focus:ring-4 text-[20px] focus:outline-none focus:ring-primary-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={(e) => handleSearch(e)}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Musak61Search;
