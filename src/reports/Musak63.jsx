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

const Musak63 = () => {
  const [data, setdata] = useState(null);
  const [datePart, setDatePart] = useState("");
  const [timePart, setTimePart] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalUnitPrice, setTotalUnitPrice] = useState(0);
  const { id } = useParams();
  const componentRef = useRef();

  useEffect(() => {
    const getData = async () => {
      const singleData = await getDoc(
        doc(collection(db, "SalesEntry"), id)
      ).then((snapshot) => {
        if (snapshot.exists()) {
          setdata(snapshot.data());
          if (snapshot.data().issueDate) {
            const parts = snapshot.data().issueDate.split(" ");
            const date = parts[0]; // "8/6/2023"
            const time = parts[1];
            //const time = parts[1] + " " + parts[2]; // "11:48:12 AM"

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

  return (
    <>
      <div className="py-4 px-10 bg-slate-100 w-full flex justify-between">
        <p className="font-normal text-xl">Preview</p>
        <ReactToPrint
          trigger={() => (
            <button className="bg-[#ff5c8e] text-white rounded-lg px-4 py-2 mx-1 text-xl hover:bg-[#9e103b]">
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div
        className="musakReports ml-10 mr-10 mt-2 flex flex-col"
        ref={componentRef}
      >
        <div className="flex w-full justify-between">
          <img src={bdLogo} className="w-[102px] h-[100px] pt-8 pl-6" />
          <div>
            <div className="text-center">
              <h1 className="text-[18px] font-semibold pt-2 tracking-[1.1px]">
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার{" "}
              </h1>
              <p className="tracking-wide text-black font-medium">
                জাতীয় রাজস্ব বোর্ড
              </p>
              <p className="font-bold text-[18px] tracking-wider">
                কর চালানপত্র
              </p>
            </div>

            <div className="text-left">
              <p className="text-[16px] tracking-wide">{`[বিধি ৪০  এর উপ-বিধি (১) এর দফা (গ) ও দফা (চ) দ্রষ্টব্য]`}</p>
              <p className="text-[16px] tracking-wide">
                নিবন্ধিত ব্যক্তির নামঃ STAR PARTICLE BOARD MILLS LTD
              </p>
              <p className="text-[16px] tracking-wide">
                নিবন্ধিত ব্যক্তির বিআইএনঃ 000000796-0302
              </p>
              <p className="text-[16px]">
                চালানপত্র ইস্যুর ঠিকানাঃ <span>{data && data.HeadAddress}</span>
              </p>
            </div>
          </div>
          <div className="pt-8">
            <p className="text-center py-1 h-[31px] w-28 font-bold border border-black">
              {" "}
              মূসক - ৬.৩{" "}
            </p>
          </div>
        </div>
        {/* <div className="flex flex-col items-baseline justify-between w-[95%] pt-2">
          <p className="text-[16px]">
            চালানপত্র ইস্যুর ঠিকানাঃ Branch- 125 Horipur, Madanpur, Bandar,
            Narayangonj; Bandar PS; Narayanganj-1411; Bangladesh
          </p>
        </div> */}
        <div className="flex w-[95%] pt-9 gap-3 text-black">
          {data && (
            <div className="w-[45%] flex text-md gap-2 flex-col items-baseline mr-5">
              <p>ক্রেতার নামঃ {data.Customer}</p>
              <p>ক্রেতার বিআইএনঃ {data.BIN}</p>
              <p>ক্রেতার ঠিকানাঃ {data.Address}</p>
              <p>সরবরাহের গন্তব্যস্থলঃ {data.Destination}</p>
              <p>যানবাহনের প্রকৃতি ও নম্বরঃ {data.VehicleNature}</p>
            </div>
          )}
          {data && (
            <div className="w-[50%] pl-20 text-md gap-2 flex flex-col items-baseline text-black">
              <p>চালান নম্বরঃ {data.InvoiceNum}</p>
              <p>ইস্যুর তারিখঃ {datePart}</p>
              <p>ইস্যুর সময়ঃ {timePart}</p>
              <p>যানবাহনের প্রকৃতি ও নম্বরঃ {data.VehicleNature}</p>
            </div>
          )}
        </div>
        <div className="flex w-[95%] pt-9">
          <table className="w-full text-center m-auto mt-2 text-md text-black  border-collapse">
            <thead className="text-md uppercase ">
              <tr>
                <td className="p-1 border border-black">ক্রমিক নং</td>
                <td className="p-1 border border-black">
                  {" "}
                  পণ্য/সেবার বর্ণনা
                  <br /> (প্রযোজ্য ক্ষেত্রে ব্রান্ড
                  <br /> নামসহ)
                </td>
                <td className="p-1 border border-black">
                  {" "}
                  সবরাহের
                  <br /> একক
                </td>

                <td className="p-1 border border-black">পরিমাণ</td>
                <td className="p-1 border border-black">
                  একক
                  <br /> মূল্য<sup>১</sup>
                  <br />
                  (টাকায়)
                </td>
                <td className="p-1 border border-black">
                  মোট মূল্য
                  <br />
                  (টাকায়)
                </td>
                <td className="p-1 border border-black">
                  সম্পূরক <br />
                  শুল্কের <br />
                  হার
                </td>
                <td className="p-1 border border-black">
                  সম্পূরক
                  <br /> শুল্কের
                  <br /> পরিমাণ
                  <br />
                  (টাকায়)
                </td>
                <td className="p-1 border border-black">
                  মূল্য
                  <br /> সংযো-
                  <br />
                  জন
                  <br /> করের
                  <br /> হার/
                  <br />
                  সুনির্দিষ্ট
                  <br /> কর
                </td>
                <td className="p-1 border border-black">
                  মূল্য সংযোজন
                  <br /> কর/সুনির্দিষ্ট
                  <br /> কর এর
                  <br /> পরিমাণ
                  <br />
                  (টাকায়)
                </td>
                <td className="p-1 border border-black">
                  সকল প্রকার শুল্ক
                  <br /> ও করসহ মূল্য
                </td>
              </tr>
            </thead>
            <tbody className="">
              <tr>
                <td className="p-1 border border-black">(১)</td>
                <td className="p-1 border border-black">(২)</td>

                <td className="p-1 border border-black">(৩)</td>
                <td className="p-1 border border-black">(৪)</td>
                <td className="p-1 border border-black">(৫)</td>
                <td className="p-1 border border-black">(৬)</td>
                <td className="p-1 border border-black">(৭)</td>
                <td className="p-1 border border-black">(৮)</td>
                <td className="p-1 border border-black">(৯)</td>
                <td className="p-1 border border-black">(১০)</td>
                <td className="p-1 border border-black">(১১)</td>
              </tr>
              {data &&
                data.productList.map((item, index) => (
                  <tr>
                    <td className="p-1 border border-black">{index + 1}</td>
                    <td className="p-1 border border-black">
                      {item.productName}
                    </td>
                    <td className="p-1 border border-black">SFT</td>
                    <td className="p-1 border border-black">{item.IssueQty}</td>
                    <td className="p-1 border border-black">
                      {item.unitPrice}
                    </td>
                    <td className="p-1 border border-black">
                      {item.NetAmount}
                    </td>
                    <td className="p-1 border border-black">0.00</td>
                    <td className="p-1 border border-black">0.00</td>
                    <td className="p-1 border border-black">15.00</td>
                    <td className="p-1 border border-black">
                      {(0.15 * item.NetAmount).toFixed(2)}
                    </td>
                    <td className="p-1 border border-black">
                      {item.GrossAmount}
                    </td>
                  </tr>
                ))}

              <tr>
                <td colSpan={3} className="p-1 border border-black">
                  সর্বমোট ={" "}
                </td>
                <td className="p-1 border border-black">
                  {data &&
                    data.productList
                      .reduce(
                        (total, item) => total + parseFloat(item.IssueQty),
                        0
                      )
                      .toFixed(2)}
                </td>
                <td className="p-1 border border-black"></td>
                <td className="p-1 border border-black">
                  {data && data.totalNetamount}
                </td>
                <td className="p-1 border border-black"></td>
                <td className="p-1 border border-black"></td>
                <td className="p-1 border border-black">0.00</td>
                <td className="p-1 border border-black">
                  {data &&
                    data.productList
                      .reduce(
                        (totalVAT, item) => totalVAT + 0.15 * item.NetAmount,
                        0
                      )
                      .toFixed(2)}
                </td>
                <td className="p-1 border border-black">
                  {data && data.totalgrossamount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-baseline justify-between w-[95%] text-md pt-10 text-black">
          <p className="pb-1">
            প্রতিষ্ঠান কর্তৃপক্ষের দায়িত্বপ্রাপ্ত ব্যক্তির নামঃ
          </p>
          <p className="pb-1">পদবিঃ</p>
          <p className="pb-1">স্বাক্ষরঃ</p>
          <p className="pb-1">সীলঃ</p>
        </div>
        <div className="flex flex-col items-baseline justify-between w-[95%] pt-10 text-black">
          <hr className="w-[330px] border-black" />
          <p className="pb-1">
            <sup>১</sup> সকল প্রকার কর মূল্য;
          </p>
        </div>
      </div>
    </>
  );
};

export default Musak63;
