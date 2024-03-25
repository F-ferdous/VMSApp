import React, { useState, useEffect } from "react";
import {
  AiFillEdit,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";

import { useNavigate } from "react-router-dom";

import {
  addDoc,
  collection,
  getDocs,
  where,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const Musak65Reports = () => {
  const [Data, setData] = useState(null);
  const [OriginalData, setOriginalData] = useState(null);
  const [SearchValue, setSearchValue] = useState("");

  const HandleSearch = () => {
    if (!SearchValue) {
      setData(OriginalData);
      return;
    }
    const filteredData = Data.filter(
      (item) =>
        item.InvoiceNum.toLowerCase().includes(SearchValue.toLowerCase()) ||
        item.vehicleNum.toLowerCase().includes(SearchValue.toLowerCase()) ||
        item.transferType.toLowerCase().includes(SearchValue.toLowerCase())
      // Add more conditions for other fields if needed
    );

    setData(filteredData);
  };
  const getData = () => {
    const q = query(collection(db, "ProductTransfer"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push({ id: doc.id, ...doc.data() });
      });

      setData(tempArr);
      setOriginalData(tempArr);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();
  const GoBack = () => {
    navigate("/");
  };
  return (
    <section className="w-full flex flex-col items-center justify-center mt-2 p-2 mx-5">
      <div className="bg-gray-100 w-[90%] pb-5">
        <div className="bg-gradient-to-tl from-sky-400 to-sky-800 p-2 flex justify-between items-center">
          <h1 className="text-white text-sm font-bold">
            Product Transfer List
          </h1>
          <button
            className="px-3 py-2 text-white rounded-lg bg-[#0a4c76] hover:bg-[#13384f]"
            onClick={GoBack}
          >
            Go Back
          </button>
        </div>

        <hr />
        <div className="mt-5">
          <div className="flex justify-end">
            <div className="w-[50%]"></div>
            <div className="w-[50%]">
              <div className="flex gap-1 justify-end w-[90%]">
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={SearchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="bg-white border w-96 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2 "
                  placeholder="Search Here...."
                  required
                />
                <button
                  type="submit"
                  className=" text-white bg-[#FF5C8E] hover:bg-[#b33058] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={(e) => HandleSearch(e)}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <table className="w-[90%] items-center m-auto mt-2 text-xs text-left   border-collapse border border-gray-400">
            <thead className="text-xs text-gray-50 uppercase bg-gradient-to-l from-sky-500 via-violet-500 to-pink-500">
              <tr>
                <th className="p-2 border border-gray-400">SL</th>
                <th className="p-2 border border-gray-400">Invoice No</th>
                <th className="p-2 border border-gray-400">Issue Date</th>

                <th className="p-2 border border-gray-400">Vehicle No.</th>
                <th className="p-2 border border-gray-400">Transfer Type</th>

                <th className="p-2 border border-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {Data &&
                Data.map((item, index) => (
                  <tr className="text-gray-900">
                    <td className="p-2 border border-gray-400">{index + 1}</td>
                    <td className="p-2 border border-gray-400">
                      {item.InvoiceNum}
                    </td>
                    <td className="p-2 border border-gray-400">
                      {item.issueDate}
                    </td>
                    <td className="p-2 border border-gray-400">
                      {item.vehicleNum}
                    </td>
                    <td className="p-2 border border-gray-400">
                      {item.transferType}
                    </td>
                    <td className="p-2 border border-gray-400 ">
                      <button
                        className="text-center text-xl text-black"
                        onClick={() =>
                          navigate(`/ProductTransferReportView/${item.id}`)
                        }
                      >
                        <AiFillEdit />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Musak65Reports;
