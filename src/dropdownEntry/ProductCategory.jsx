import React, { useState, useEffect } from "react";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCategory = () => {
  const [category, setCategory] = useState();
  const [vatRate, setVatRate] = useState();

  const navigate = useNavigate();

  const UploadData = async (e) => {
    e.preventDefault();
    try {
      let today = new Date();

      const data = {
        category,
        vatRate,

        CreatedDate: today,
      };

      await addDoc(collection(db, "ProductCategory"), {
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
        setCategory("");
        setVatRate("");
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
            Product Category Entry
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
            type="text"
            label="Category Name"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            placeholder="Enter Category"
          />
          <TextInput
            type="number"
            label="Vat Rate"
            onChange={(e) => setVatRate(e.target.value)}
            value={vatRate}
            placeholder="Enter Vat Rate"
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

export default ProductCategory;
