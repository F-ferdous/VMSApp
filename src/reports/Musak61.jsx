import React, { useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const Musak61 = () => {
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const handleSearch = async (e) => {
    try {
      const startDate = dateFrom.toLocaleDateString();
      const endDate = dateTo.toLocaleDateString();

      const querySnapshot = await getDocs(
        query(
          collection(db, "61Musak"),
          where("EntryDate", ">=", startDate),
          where("EntryDate", "<=", endDate)
        )
      );
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });
      setSearchResults(results);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(searchResults);

  const GoBack = () => {
    navigate("/");
  };
  return (
    <>
      <section className="w-full flex flex-col items-center justify-center mt-2 p-2">
        <div className="bg-gray-100 w-full pb-5">
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
      <section className="my-2 mx-4">
        <div className="flex">
          <div className="w-[34%] text-left text-[10px]">
            <p>ব্যবসায় প্রতিষ্ঠানের নামঃ Star Particle Board Mills Limited</p>
            <p>
              ঠিকানাঃ 125 Horipur, Madanpur, Bandar, Narayangonj; Ps:
              Narayangonj-1411; Bangladesh
            </p>
            <p>করদাতা সনাক্তকরন সংখ্যাঃ 000000796-0302</p>
          </div>
          <div className="w-[66%] flex">
            <div className="w-[1/3]">
              <p className="font-bold text-[12px]">
                গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
              </p>
              <p className="font-bold text-[12px]">জাতীয় রাজস্ব বোর্ড, ঢাকা</p>
              <p className="font-bold text-[12px]">ক্রয় হিসাব পুস্তক</p>
              <p className="pt-3 text-[12px]">
                (পণ্য বা সেবা প্রক্রিয়াকরনে সম্পৃক্ত এমন নিবন্ধিত বা তালিকাভুক্ত
                ব্যক্তির জন্য প্রযোজ্য)
              </p>
              <p className="text-[10px]">
                [বিধি ৪০ (১) এর দফা (ক). এবং ৪১ এর দফা (ক) দ্রষ্টব্য]
              </p>
            </div>
            <div className="w-[1/3]  mt-6">
              <p className="text-[10px]">
                উপকরনের নামঃ Paraformaldehyde (RM 1009)
              </p>
            </div>
            <div className="w-[1/3] ml-[20%] mt-[5%]">
              <p className="border p-2 border-gray-900 font-semibold  text-[10px]">
                মুসক-৬.১
              </p>
              <p className="pt-2 text-[10px]">Page 1 of 1</p>
            </div>
          </div>
        </div>

        <table width="100%" className="table61 pt-2 text-[12px]">
          <tr>
            <td className="p-1 border border-gray-400" colspan="21">
              পণ্য/সেবার উপকরন ক্রয়
            </td>
          </tr>
          <tr>
            <td className="p-1 border border-gray-400" rowspan="3">
              ক্রমিক সংখ্যা
            </td>
            <td className="p-1 border border-gray-400" rowspan="3">
              তারিখ
            </td>
            <td className="p-1 border border-gray-400" height="80" colspan="2">
              মজুদ উপকরনের প্ররম্ভিক জের
            </td>
            <td className="p-1 border border-gray-400" colspan="14">
              ক্রয়কৃত উপকরন
            </td>
            <td className="p-1 border border-gray-400" colspan="2">
              উপকরনের প্রান্তিক জের
            </td>
            <td className="p-1 border border-gray-400" rowspan="3">
              মন্তব্য
            </td>
          </tr>
          <tr>
            <td className="p-1 border border-gray-400" rowspan="2">
              পরিমান (একক)
            </td>
            <td className="p-1 border border-gray-400" rowspan="2">
              মুল্য (সকল প্রকার কর ব্যতিত)
            </td>
            <td className="p-1 border border-gray-400" rowspan="2">
              চালান/বিল অব এন্ট্রি নম্বর
            </td>
            <td className="p-1 border border-gray-400" rowspan="2">
              তারিখ
            </td>
            <td className="p-1 border border-gray-400" colspan="3">
              বিক্রেতা/সরবরাহকারী
            </td>
            <td className="p-1 border border-gray-400" rowspan="2">
              বিবরণ
            </td>
            <td className="p-1 border border-gray-400" rowspan="2">
              পরিমাণ
            </td>
            <td className="p-1 border border-gray-400" rowspan="2">
              মূল্য (সকল প্রকার কর ব্যতিত)
            </td>
            <td className="p-1 border border-gray-400" rowspan="2">
              সম্পূরক শুল্ক (যদি থাকে)
            </td>
            <td className="p-1 border border-gray-400" rowspan="2">
              মুসক
            </td>
            <td className="p-1 border border-gray-400" colspan="2">
              মোট উপকরনের পরিমাণ
            </td>
            <td className="p-1 border border-gray-400" colspan="2">
              পণ্য প্রস্তুত/প্রক্রিয়াকরনে উপকরনের ব্যবহার
            </td>
            <td className="p-1 border border-gray-400" rowspan="2">
              পরিমান (একক)
            </td>
            <td className="p-1 border border-gray-400" rowspan="2">
              মূল্য (সকল প্রকার কর ব্যতিত)
            </td>
          </tr>
          <tr>
            <td className="p-1 border border-gray-400" height="190">
              নাম
            </td>
            <td className="p-1 border border-gray-400">ঠিকানা</td>
            <td className="p-1 border border-gray-400">
              নিবন্ধন নম্বর/তালিকাভুক্তি/জাতীয় পরিচয়পত্র নং
            </td>
            <td className="p-1 border border-gray-400">পরিমান (একক)</td>
            <td className="p-1 border border-gray-400">
              মূল্য (সকল প্রকার কর ব্যতিত)
            </td>
            <td className="p-1 border border-gray-400">পরিমান (একক)</td>
            <td className="p-1 border border-gray-400">
              মূল্য (সকল প্রকার কর ব্যতিত)
            </td>
          </tr>
          <tr>
            <td className="p-1 border border-gray-400">1</td>
            <td className="p-1 border border-gray-400">2</td>
            <td className="p-1 border border-gray-400">3</td>
            <td className="p-1 border border-gray-400">4</td>
            <td className="p-1 border border-gray-400">5</td>
            <td className="p-1 border border-gray-400">6</td>
            <td className="p-1 border border-gray-400">7</td>
            <td className="p-1 border border-gray-400">8</td>
            <td className="p-1 border border-gray-400">9</td>
            <td className="p-1 border border-gray-400">10</td>
            <td className="p-1 border border-gray-400">11</td>
            <td className="p-1 border border-gray-400">12</td>
            <td className="p-1 border border-gray-400">13</td>
            <td className="p-1 border border-gray-400">14</td>
            <td className="p-1 border border-gray-400">15</td>
            <td className="p-1 border border-gray-400">16</td>
            <td className="p-1 border border-gray-400">17</td>
            <td className="p-1 border border-gray-400">18</td>
            <td className="p-1 border border-gray-400">19</td>
            <td className="p-1 border border-gray-400">20</td>
            <td className="p-1 border border-gray-400">21</td>
          </tr>
          <tr>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">10/11/2023</td>
            <td className="p-1 border border-gray-400"></td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">
              Fakirsons Papchem PVT Ltd
            </td>
            <td className="p-1 border border-gray-400">India</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
            <td className="p-1 border border-gray-400">&nbsp;</td>
          </tr>
        </table>
      </section>
    </>
  );
};

export default Musak61;
