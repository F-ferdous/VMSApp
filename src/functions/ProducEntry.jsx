import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {
  addDoc,
  collection,
  doc,
  getDocs,
  where,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProducEntry = () => {
  const [SLNo, setSLNo] = useState(1);
  const [code, setcode] = useState("");
  const [Name, setName] = useState("");
  const [Model, setModel] = useState("");
  const [Uom, setUom] = useState("");
  /* const [DecType, setDecType] = useState("");
  const [ProdCate, setProdCate] = useState(""); */
  const [SdRate, setSdRate] = useState("");
  const [EntryDate, setEntryDate] = useState(new Date());
  const [HsCode, setHsCode] = useState("");
  const [PackSize, setPackSize] = useState("");
  const [PackQty, setPackQty] = useState(0);
  const [UnitPrice, setUnitPrice] = useState(0);

  const [vatRate, setVatRate] = useState(15);

  const [uomList, setUomList] = useState(null);
  /* const [DecTypeList, setDecTypeList] = useState(null);
  const [ProdCateList, setProdCateList] = useState(null); */

  const navigate = useNavigate();

  const UploadData = async (e) => {
    e.preventDefault();
    try {
      let today = new Date();

      const data = {
        SLNo,
        code,
        Name,
        Model,
        Uom,

        SdRate,
        EntryDate,
        HsCode,
        PackSize,
        PackQty,
        UnitPrice,

        vatRate,
        CreatedDate: today,
      };

      await addDoc(collection(db, "Product"), {
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
        //setDecType("");
        setcode("");
        setName("");
        setEntryDate(new Date());
        setHsCode("");
        setModel("");
        setPackQty("");
        setPackSize("");
        // setProdCate("");
        setSdRate("");
        setUom("");
        setUnitPrice("");
      });
    } catch (e) {
      console.log(e);
    }
  };
  const GoBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const uomData = query(collection(db, "Uom"));
    const decData = query(collection(db, "Declaration"));
    const prodCatData = query(collection(db, "ProductCategory"));

    const uomList2 = onSnapshot(uomData, (querySnapshot) => {
      let tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push({ ...doc.data() });
      });
      setUomList(tempArr);
    });
    /* const declist2 = onSnapshot(decData, (querySnapshot) => {
      let tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push({ ...doc.data() });
      });
      setDecTypeList(tempArr);
    });
    const prodCatLsit2 = onSnapshot(prodCatData, (querySnapshot) => {
      let tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push({ ...doc.data() });
      });
      setProdCateList(tempArr);
    }); */

    return () => {
      uomList2();
      /*  */
    };
  }, []);

  /*   useEffect(() => {
    const getVatRate = async () => {
      if (ProdCate != " ") {
        const q = query(
          collection(db, "ProductCategory"),
          where("category", "==", ProdCate)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setVatRate(doc.data().vatRate);
          });
        }
      }
    };

    getVatRate();
  }, [ProdCate]); */

  return (
    <section className="w-full flex flex-col items-center justify-center mt-2 p-2">
      <div className=" bg-gray-50 rounded-xl  ">
        <ToastContainer />
        <div className="bg-gradient-to-tl from-sky-400 to-sky-800 p-2 flex justify-between items-center">
          <h1 className="text-white text-sm font-bold">Product Entry</h1>
          <button
            className="px-3 py-2 text-white rounded-lg bg-[#0a4c76] hover:bg-[#13384f]"
            onClick={GoBack}
          >
            Go Back
          </button>
        </div>

        <hr />
        <form className="px-5 py-5 flex w-full gap-20" onSubmit={UploadData}>
          <div className="w-[1/2]">
            {/*  <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                SL
              </label>
              <input
                disabled
                type="text"
                value={SLNo}
                placeholder="1"
                className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div> */}
            <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setcode(e.target.value)}
                placeholder="Enter Code"
                className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                Model
              </label>
              <input
                type="text"
                value={Model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Enter Model"
                className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                UOM
              </label>
              <select
                value={Uom}
                onChange={(e) => setUom(e.target.value)}
                className="appearance-none block w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option className="text-gray-600">Select...</option>
                {uomList &&
                  uomList.map((item, index) => (
                    <option key={index}>{item.uom}</option>
                  ))}
              </select>
            </div>
            {/*  <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                Declaration Type
              </label>
              <select
                value={DecType}
                onChange={(e) => setDecType(e.target.value)}
                className="appearance-none block w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option className="text-gray-600">Select...</option>
                {DecTypeList &&
                  DecTypeList.map((item, index) => (
                    <option key={index}>{item.dec}</option>
                  ))}
              </select>
            </div> */}
            <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                SD Rate (%)
              </label>
              <input
                type="text"
                value={SdRate}
                onChange={(e) => setSdRate(e.target.value)}
                placeholder="Enter Sd Rate"
                className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>

            <button
              type="submit"
              className="flex flex-row px-7 py-3 font-bold hover:text-gray-200 text-white rounded-lg bg-gradient-to-tl from-pink-600 to-pink-800 hover:bg-pink-900"
            >
              Save
            </button>
          </div>
          <div className="w-[1/2]">
            <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                Entry Date
              </label>
              <DatePicker
                className="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                selected={EntryDate}
                onChange={(date) => setEntryDate(date)}
                dateFormat="MMMM d, yyyy"
              />
            </div>
            <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                HS Code
              </label>
              <input
                type="text"
                value={HsCode}
                onChange={(e) => setHsCode(e.target.value)}
                placeholder="Enter HS Code"
                className="appearance-none block w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                Pack Size
              </label>
              <input
                type="text"
                value={PackSize}
                onChange={(e) => setPackSize(e.target.value)}
                placeholder="Enter Pack Size"
                className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                Pack Quantity
              </label>
              <input
                type="text"
                value={PackQty}
                onChange={(e) => setPackQty(e.target.value)}
                placeholder="Enter Pack Quantity"
                className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                Unit Price
              </label>
              <input
                type="text"
                value={UnitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                placeholder="Enter Unit Price"
                className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
            {/* <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                Product Category
              </label>
              <select
                value={ProdCate}
                onChange={(e) => setProdCate(e.target.value)}
                className="appearance-none block w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option className="text-gray-600">Select...</option>
                {ProdCateList &&
                  ProdCateList.map((item, index) => (
                    <option key={index}>{item.category}</option>
                  ))}
              </select>
            </div> */}
            <div className="flex flex-row w-full p-2 gap-4">
              <label className="block uppercase text-left tracking-wide w-[30%] text-gray-700 text-xs font-bold mb-2">
                VAT Rate (%)
              </label>
              <input
                type="text"
                value={vatRate}
                onChange={(e) => setVatRate(e.target.value)}
                placeholder="0.0"
                className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProducEntry;
