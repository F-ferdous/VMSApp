import React, { useState, useEffect } from "react";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SupplierEntry = () => {
  const [code, setcode] = useState("");
  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [BIN, setBIN] = useState("");
  const [AccHead, setAccHead] = useState("");
  const [ContactPerson, setContactPerson] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [Remarks, setRemarks] = useState("");

  const navigate = useNavigate();

  const UploadData = async (e) => {
    e.preventDefault();
    try {
      let today = new Date();

      const data = {
        code,
        Name,
        Address,
        BIN,
        AccHead,
        ContactPerson,
        ContactNumber,
        Remarks,
        CreatedDate: today,
      };

      await addDoc(collection(db, "Suppliers"), {
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
        setcode(" ");
        setAccHead(" ");
        setAddress(" ");
        setBIN(" ");
        setContactNumber(" ");
        setName(" ");
        setContactPerson(" ");
        setRemarks(" ");
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
        <div className="bg-gradient-to-tl from-sky-400 to-sky-800 p-2 flex justify-between items-center">
          <h1 className="text-white text-sm font-bold">Party Supplier Entry</h1>
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
            label="Code"
            onChange={(e) => setcode(e.target.value)}
            value={code}
            placeholder="Enter Code"
          />
          <TextInput
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={Name}
            placeholder="Enter Name"
          />
          <TextInput
            label="Address"
            onChange={(e) => setAddress(e.target.value)}
            value={Address}
            placeholder="Enter Address"
          />
          <TextInput
            label="BIN/NID"
            onChange={(e) => setBIN(e.target.value)}
            value={BIN}
            placeholder="Enter BIN or NID No."
          />
          <TextInput
            label="Account Head"
            onChange={(e) => setAccHead(e.target.value)}
            value={AccHead}
            placeholder="Enter Account Head Name"
          />
          <TextInput
            label="Contact Person"
            onChange={(e) => setContactPerson(e.target.value)}
            value={ContactPerson}
            placeholder="Enter Contact Person Name"
          />
          <TextInput
            label="Contact Number"
            onChange={(e) => setContactNumber(e.target.value)}
            value={ContactNumber}
            placeholder="Enter Contact Number"
          />
          <TextInput
            label="Remarks"
            onChange={(e) => setRemarks(e.target.value)}
            value={Remarks}
            placeholder="Enter Remarks"
          />
          <button
            type="submit"
            className="flex flex-row px-7 py-3 font-bold hover:text-gray-200 text-white rounded-lg bg-gradient-to-tl from-pink-600 to-pink-800 hover:bg-pink-900"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

export default SupplierEntry;
