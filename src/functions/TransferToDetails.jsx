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

const TransferToDetails = () => {
  const [Data, setData] = useState(null);
  const [OriginalData, setOriginalData] = useState(null);

  const getData = () => {
    const q = query(collection(db, "Transfer"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push({ ...doc.data() });
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
            Transfer Locations List
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
          <table className="w-[90%] items-center m-auto mt-2 text-xs text-left   border-collapse border border-gray-400">
            <thead className="text-xs text-gray-50 uppercase bg-gradient-to-l from-sky-500 via-violet-500 to-pink-500">
              <tr>
                <th className="p-2 border border-gray-400">SL</th>
                <th className="p-2 border border-gray-400">Location</th>
                <th className="p-2 border border-gray-400">Address</th>
              </tr>
            </thead>
            <tbody>
              {Data &&
                Data.map((item, index) => (
                  <tr className="text-gray-900">
                    <td className="p-2 border border-gray-400">{index + 1}</td>
                    <td className="p-2 border border-gray-400">
                      {item.location}
                    </td>
                    <td className="p-2 border border-gray-400">
                      {item.Address}
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

export default TransferToDetails;
