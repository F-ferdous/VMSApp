import React, { useState, useEffect } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useStateContext } from "../contexts/ContextProvider";

const Report61entry = () => {
  const { user } = useStateContext();

  const [EntryDate, setEntryDate] = useState("");
  const [firstProductName, setFirstProductName] = useState("");
  const [firstUnit, setFirstUnit] = useState(0);
  const [firstCostWithoutVat, setFirstCostWithoutVat] = useState(0);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchaseBillEntryNum, setPurchaseBillEntryNum] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [sellerid, setSellerid] = useState("");
  const [purchaseDescription, setPurchaseDescription] = useState("");
  const [purchaseQuantity, setPurchaseQuantity] = useState(0);
  const [purchaseCostWithoutVat, setPurchaseCostWithoutVat] = useState(0);
  const [purchaseVat, setPurchaseVat] = useState("");
  const [purchaseMusak, setPurchaseMusak] = useState("");
  const [manufacturerUnit, setManufacturerUnit] = useState(0);

  const [remarks, setRemarks] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const TotalUnit = parseFloat(firstUnit) + parseFloat(purchaseQuantity);
    const TotalCostwithoutVatTemp =
      parseFloat(firstCostWithoutVat) + parseFloat(purchaseCostWithoutVat);
    const TotalManufacturerCostTemp =
      (TotalCostwithoutVatTemp / TotalUnit) * manufacturerUnit;
    const LastProductQuantityTemp = TotalUnit - parseFloat(manufacturerUnit);
    const LastProductCost =
      parseFloat(firstCostWithoutVat) +
      parseFloat(purchaseCostWithoutVat) -
      TotalManufacturerCostTemp;

    try {
      const Data = {
        EntryDate: EntryDate.toLocaleDateString(),
        firstProductName,
        firstUnit,
        firstCostWithoutVat,
        purchaseDate: purchaseDate && purchaseDate.toLocaleDateString(),
        purchaseBillEntryNum,
        sellerName,
        sellerAddress,
        sellerid,
        purchaseDescription,
        purchaseQuantity,
        purchaseCostWithoutVat,
        purchaseVat,
        purchaseMusak,
        manufacturerUnit,
        manufacturerCostWithoutVat: TotalManufacturerCostTemp,
        remarks,
        creeatedBy: user.uid,
        createdAt: new Date().toLocaleDateString(),
        TotalPurchaseUnit: TotalUnit,
        TotalPurchaseWithoutVat: TotalCostwithoutVatTemp,
        ProductFinalQunatity: LastProductQuantityTemp,
        ProductFinalCostWithoutVat: LastProductCost,
      };
      await addDoc(collection(db, "61Musak"), {
        ...Data,
      }).then(() => {
        toast.success("Successfully added", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setEntryDate(new Date());
        setFirstProductName("");
        setFirstUnit(0);
        setFirstCostWithoutVat(0);
        setPurchaseDate("");
        setPurchaseBillEntryNum("");
        setSellerName("");
        setSellerAddress("");
        setSellerid("");
        setPurchaseDescription("");
        setPurchaseQuantity(0);
        setPurchaseVat("");
        setPurchaseMusak("");
        setManufacturerUnit(0);
        setRemarks("");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const GoBack = () => {
    navigate("/");
  };
  return (
    <section className="w-full flex flex-col items-center justify-center mt-2 p-2 mx-5">
      <div className="bg-gray-100 w-[90%]">
        <ToastContainer />
        <div className="bg-gradient-to-tl from-sky-400 to-sky-800 p-2 flex justify-between items-center">
          <h1 className="text-white text-[18px] font-bold">Musak 6.1 Entry</h1>
          <button
            className="px-3 py-2 text-white text-[18px] rounded-lg bg-[#0a4c76] hover:bg-[#13384f]"
            onClick={GoBack}
          >
            Go Back
          </button>
        </div>

        <hr />
        <form className="w-[100%]" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                  তারিখ
                </label>
                <DatePicker
                  className="appearance-none block text-[18px] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  selected={EntryDate}
                  onChange={(date) => setEntryDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
            </div>
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                  উপকরনের নাম
                </label>
                <input
                  placeholder="Product Name"
                  value={firstProductName}
                  onChange={(e) => setFirstProductName(e.target.value)}
                  type="text"
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
          </div>
          <div>
            <hr />
            <p className="text-center text-white font-bold text-[20px] pl-2 pb-1 pt-2 bg-gray-500">
              মজুদ উপকরনের প্ররম্ভিক জের
            </p>
            <hr />
            <div className="flex">
              <div className="w-[50%] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                    পরিমান (একক)
                  </label>
                  <input
                    type="text"
                    placeholder="Unit"
                    value={firstUnit}
                    onChange={(e) => setFirstUnit(e.target.value)}
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="w-[50%] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                    মূল্য (সকল প্রকার কর ব্যতিত)
                  </label>
                  <input
                    placeholder="Amount wihtout Vat"
                    value={firstCostWithoutVat}
                    onChange={(e) => setFirstCostWithoutVat(e.target.value)}
                    type="text"
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
            </div>
            <hr />
          </div>

          <div>
            <hr />
            <p className="text-center text-white font-bold text-[20px] pl-2 pb-1 pt-2 bg-gray-500">
              ক্রয়কৃত উপকরন
            </p>
            <hr />
            <div className="flex">
              <div className="w-[50%] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                    তারিখ
                  </label>
                  <DatePicker
                    className="appearance-none block text-[18px] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    selected={purchaseDate}
                    onChange={(date) => setPurchaseDate(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
              <div className="w-[50%] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                    চালান/বিল অব এন্ট্রি নম্বর
                  </label>
                  <input
                    placeholder="Challan/Bill "
                    value={purchaseBillEntryNum}
                    onChange={(e) => setPurchaseBillEntryNum(e.target.value)}
                    type="text"
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                  বিবরণ
                </label>
                <input
                  type="text"
                  placeholder="Description"
                  value={purchaseDescription}
                  onChange={(e) => setPurchaseDescription(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                  পরিমাণ
                </label>
                <input
                  placeholder="Quantity"
                  value={purchaseQuantity}
                  onChange={(e) => setPurchaseQuantity(e.target.value)}
                  type="text"
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                  মূল্য (সকল প্রকার কর ব্যতিত)
                </label>
                <input
                  type="text"
                  placeholder="Amount wihtout Vat"
                  value={purchaseCostWithoutVat}
                  onChange={(e) => setPurchaseCostWithoutVat(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                  সম্পূরক শুল্ক (যদি থাকে)
                </label>
                <input
                  placeholder="Vat"
                  value={purchaseVat}
                  onChange={(e) => setPurchaseVat(e.target.value)}
                  type="text"
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="w-[50%] p-2">
              <div className="flex flex-row w-full p-2 gap-2">
                <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                  মুসক
                </label>
                <input
                  type="text"
                  placeholder="Musak"
                  value={purchaseMusak}
                  onChange={(e) => setPurchaseMusak(e.target.value)}
                  className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
            </div>
            <div className="w-[50%] p-2"></div>
          </div>

          <div className="">
            <hr />
            <p className="text-left text-white font-bold text-[18px] pl-2 pb-1 pt-2 bg-gray-500">
              বিক্রেতা/সরবরাহকারী
            </p>
            <hr />
            <div className="flex justify-between">
              <div className="w-full p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[20%] text-gray-700 text-[18px] font-bold mb-2">
                    নাম
                  </label>
                  <input
                    type="text"
                    placeholder="Seller Name"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    className="appearance-none block  w-[80%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="w-full p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[20%] text-gray-700 text-[18px] font-bold mb-2">
                    ঠিকানা
                  </label>
                  <input
                    placeholder="Seller Address"
                    value={sellerAddress}
                    onChange={(e) => setSellerAddress(e.target.value)}
                    type="text"
                    className="appearance-none block  w-[80%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="w-full p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left pl-5 pt-4 tracking-wide w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                    নিবন্ধন নম্বর/তালিকাভুক্তি/জাতীয় পরিচয়পত্র নম্বর
                  </label>
                  <input
                    placeholder="Seller Identification "
                    value={sellerid}
                    onChange={(e) => setSellerid(e.target.value)}
                    type="text"
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
            </div>
            <hr />
          </div>

          <div>
            <hr />
            <p className="text-center text-white font-bold text-[18px] pl-2 pb-1 pt-2 bg-gray-500">
              পণ্য প্রস্তুত/প্রক্রিয়াকরনে উপকরনের ব্যবহার
            </p>
            <hr />
            <div className="flex">
              <div className="w-[50%] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[30%] text-gray-700 text-[18px] font-bold mb-2">
                    পরিমাণ (একক)
                  </label>
                  <input
                    type="text"
                    placeholder="Unit"
                    value={manufacturerUnit}
                    onChange={(e) => setManufacturerUnit(e.target.value)}
                    className="appearance-none block  w-[70%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
              <div className="w-[50%] p-2">
                <div className="flex flex-row w-full p-2 gap-2">
                  <label className="block uppercase text-left tracking-wide pl-5 pt-4 w-[15%] text-gray-700 text-[18px] font-bold mb-2">
                    মন্তব্য
                  </label>
                  <input
                    type="text"
                    placeholder="Comments"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    className="appearance-none block  w-[85%] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  />
                </div>
              </div>
            </div>
            <hr />
          </div>
          <div className="my-5 ml-8">
            <button
              type="submit"
              className="flex text-[18px] flex-row px-7 py-3 font-bold hover:text-gray-200 text-white rounded-lg bg-gradient-to-tl from-pink-600 to-pink-800 hover:bg-pink-900"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Report61entry;
