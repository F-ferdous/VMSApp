import React, { useState, useEffect } from "react";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeclarationEntry = () => {
  const [dec, setDec] = useState();

  const navigate = useNavigate();

  const UploadData = async (e) => {
    e.preventDefault();
    try {
      let today = new Date();

      const data = {
        dec,

        CreatedDate: today,
      };

      await addDoc(collection(db, "Declaration"), {
        ...data,
      }).then(() => {
        toast.success("Successfully added", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setDec("");
      });
    } catch (e) {
      console.log(e);
    }
  };

  const GoBack = () => {
    navigate("/");
  };
  return (
    <section className="w-full flex flex-col items-center justify-center mt-2 p-2">
      <div className=" bg-gray-50 rounded-xl  ">
        <ToastContainer />
        <div className="bg-gradient-to-tl from-sky-400 to-teal-600 p-2 flex justify-between items-center">
          <h1 className="text-white text-sm font-bold">
            Declaration Type Entry
          </h1>
          <button
            className="px-3 py-2 text-white rounded-lg bg-[#0a4c76] hover:bg-[#13384f]"
            onClick={GoBack}
          >
            Go Back
          </button>
        </div>

        <hr />
        <form className="px-5 py-5" onSubmit={UploadData}>
          <TextInput
            label="Declaration Type"
            onChange={(e) => setDec(e.target.value)}
            value={dec}
            placeholder="Enter Declaration Type Name"
          />

          <button
            type="submit"
            className="flex flex-row px-5 py-2 font-bold hover:text-gray-200 text-white rounded-lg bg-gradient-to-tl from-pink-600 to-pink-800 hover:bg-pink-900"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

export default DeclarationEntry;
