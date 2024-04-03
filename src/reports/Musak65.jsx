import React, { useRef, useEffect, useState } from "react";
import bdLogo from "../fonts/logo-bd.png";

import ReactToPrint from "react-to-print";
import { useParams } from "react-router-dom";

import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const Musak65 = () => {
  const [data, setdata] = useState(null);
  const [datePart, setDatePart] = useState("");
  const [timePart, setTimePart] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalUnitPrice, setTotalUnitPrice] = useState(0);
  const [transferAddress, setTransferAddress] = useState("");
  const { id } = useParams();
  const componentRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const singleData = await getDoc(
        doc(collection(db, "ProductTransfer"), id)
      ).then((snapshot) => {
        if (snapshot.exists()) {
          setdata(snapshot.data());
          if (snapshot.data().issueDate) {
            const parts = snapshot.data().issueDate.split(" ");
            const date = parts[0]; // "8/6/2023"
            const time = parts[1]; // "11:48:12 AM"

            setDatePart(date);
            setTimePart(time);
          }
          let quantityTotal = 0;
          let unitPriceTotal = 0;

          if (snapshot.data().productList) {
            snapshot.data().productList.forEach((item) => {
              quantityTotal += parseFloat(item.quantity) || 0;
              unitPriceTotal += parseFloat(item.unitPrice) || 0;
            });
          }
          setTotalQuantity(quantityTotal);
          setTotalUnitPrice(unitPriceTotal);
        }
      });
    };

    getData();
  }, []);

  useEffect(() => {
    const getTransferAddress = async () => {
      if (data != null) {
        if (data.transferTo != " ") {
          const q = query(
            collection(db, "Transfer"),
            where("location", "==", data.transferTo)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setTransferAddress(doc.data().Address);
            });
          }
        }
      }
    };

    getTransferAddress();
  }, [data]);

  return (
    <>
      <div className="pt-4 pb-2 px-10 bg-slate-100 w-full flex justify-between">
        <p className="font-bold text-xl">Preview</p>
        <ReactToPrint
          trigger={() => (
            <button className="bg-[#ff5c8e] text-white rounded-lg px-4 py-2 mx-1 text-xl hover:bg-[#9e103b]">
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div className="musakReports ml-10 mr-5 flex flex-col" ref={componentRef}>
        <div className="flex w-[95%] justify-between pt-5 text-black">
          <img src={bdLogo} className="w-[100px] h-[76px] pl-6" />
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-wider">
              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার{" "}
            </h1>
            <p className="tracking-wide">জাতীয় রাজস্ব বোর্ড</p>
            <p className="font-bold text-[16px] tracking-wider">
              কেন্দ্রীয় নিবন্ধিত প্রতিষ্ঠানের পন্য স্থানান্তর চালানপত্র
            </p>
            <p className="text-[16px] tracking-wide">{`[বিধি ৪০  এর উপ-বিধি (১) এর দফা (ঙ) দ্রষ্টব্য]`}</p>
            <p className="text-[14px] tracking-wide">
              নিবন্ধিত ব্যক্তির নামঃ STAR PARTICLE BOARD MILLS LTD
            </p>
            <p className="text-[14px] tracking-wide">
              নিবন্ধিত ব্যক্তির বিআইএনঃ 000000796-0302
            </p>
          </div>
          <p className=" pt-1 pl-3 w-[92px] h-[31px] font-bold border border-gray-900">
            {" "}
            মূসক - ৬.৫{" "}
          </p>
        </div>
        <div className="flex flex-col pl-4 items-baseline justify-between w-[95%] text-md">
          <p>
            প্রেরণকারী শাখা/পণ্যাগারের নাম ও ঠিকানাঃ STAR PARTICLE BOARD MILLS
            LTD (Factory)
          </p>
          <p className="text-md tracking-[-.1px]">{data && data.HeadAddress}</p>
        </div>
        <div className="flex w-[95%] pt-9 gap-3">
          <div className="w-[45%] text-md flex flex-col items-baseline mr-5 pr-10">
            <p>
              গ্রহীতা শাখা/পণ্যাগারের নাম ও ঠিকানাঃ STAR PARTICLE BOARD MILLS
              LTD (CTG)
            </p>
            <p>{transferAddress}</p>
          </div>
          <div className="w-[50%] text-[16px] flex flex-col items-baseline">
            {data && (
              <>
                <p className="pt-1">চালান নম্বরঃ {data.InvoiceNum}</p>
                <p className="pt-1">ইস্যুর তারিখঃ {datePart}</p>
                <p className="pt-1">ইস্যুর সময়ঃ {timePart}</p>
                <p className="pt-1">
                  যানবাহনের প্রকৃতি ও নম্বরঃ {data.vehicleNum}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex w-[95%] pt-9">
          <table className="w-full text-center m-auto mt-2 text-[14px] text-black  border-collapse">
            <thead className=" uppercase ">
              <tr>
                <th className="p-1 border-[0.5px] border-black">
                  ক্রমিক <br />
                  নং
                </th>
                <th className="p-1 border-[0.5px] border-black w-60">
                  {" "}
                  পণ্যের (প্রযোজ্য ক্ষেত্রে সুনির্দিষ্ট ব্রান্ড <br />
                  নামসহ) বিবরন
                </th>
                <th className="p-1 border-[0.5px] border-black">
                  {" "}
                  সবরাহের <br />
                  একক
                </th>

                <th className="p-1 border-[0.5px] border-black">পরিমাণ</th>
                <th className="p-1 border-[0.5px] border-black">মূল্য</th>

                <th className="p-1 border-[0.5px] border-black">মন্তব্য</th>
              </tr>
            </thead>
            <tbody className="text-lg stroke-black">
              <tr>
                <td className="p-1 border-[0.5px] border-black">(১)</td>
                <td className="p-1 border-[0.5px] border-black">(২)</td>
                <td className="p-1 border-[0.5px] border-black"></td>
                <td className="p-1 border-[0.5px] border-black">(৩)</td>
                <td className="p-1 border-[0.5px] border-black">(৪)</td>
                <td className="p-1 border-[0.5px] border-black">(৫)</td>
              </tr>
              {data &&
                data.productList.map((item, index) => (
                  <tr>
                    <td className="p-1 border-[0.5px] border-black">
                      {index + 1}
                    </td>
                    <td className="p-1 border-[0.5px] border-black text-left">
                      {item.productName}
                    </td>
                    <td className="p-1 border-[0.5px] border-black">SFT</td>
                    <td className="p-1 border-[0.5px] border-black text-right">
                      {item.quantity}
                    </td>
                    <td className="p-1 border-[0.5px] border-black text-right">
                      {item.unitPrice}
                    </td>
                    <td className="p-1 border-[0.5px] border-black">
                      {item.remarks}
                    </td>
                  </tr>
                ))}

              <tr>
                <td className="p-1"></td>
                <td className="p-1"></td>
                <td className="p-1 font-semibold">Total</td>
                <td className="p-1 border-[0.5px] border-black text-right">
                  {totalQuantity}
                </td>
                <td className="p-1 border-[0.5px] border-black text-right">
                  {totalUnitPrice}
                </td>
                <td className="p-1 "></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-baseline justify-between w-[95%] pt-10">
          <p className="pb-1">
            প্রতিষ্ঠান কর্তৃপক্ষের দায়িত্বপ্রাপ্ত ব্যক্তির নামঃ
          </p>
          <p className="pb-1">পদবিঃ</p>
          <p className="pb-1">স্বাক্ষরঃ</p>
          <p className="pb-1">সীলঃ</p>
        </div>
      </div>
    </>
  );
};

export default Musak65;
