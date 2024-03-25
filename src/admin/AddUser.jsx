import React, { useState, useEffect } from "react";
import TextInput from "../components/TextInput";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addDoc,
  collection,
  setDoc,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const AddUser = () => {
  const { createUser } = useStateContext();
  const [Data, setData] = useState();
  const [Name, setName] = useState();
  const [email, setemail] = useState();
  const [Address, setAddress] = useState();
  const [Password, setPassword] = useState();
  const [ContactNumber, setContactNumber] = useState();
  //const [Role, setRole] = useState();
  const navigate = useNavigate();

  const GoBack = () => {
    navigate("/");
  };

  const UploadData = async (e) => {
    e.preventDefault();
    try {
      let today = new Date();

      await createUser(email, Password).then(async (userCred) => {
        try {
          const docRef = doc(db, "Users", userCred.user.uid);
          const data = {
            Name,
            Address,
            email,

            Password,
            ContactNumber,

            CreatedDate: today,
          };
          setDoc(docRef, data).then(() => {
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
            //setRole("");
            setPassword("");
            setemail("");
            setAddress("");

            setContactNumber("");
            setName("");
          });
        } catch (error) {
          alert("Following Error Occured: ", error);
        }
      });
    } catch (error) {
      alert("Following Error Occured: ", error);
    }
  };

  const getData = () => {
    const q = query(collection(db, "Users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tempArr = [];
      querySnapshot.forEach((doc) => {
        tempArr.push({ ...doc.data() });
      });

      setData(tempArr);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <section className="w-full flex flex-col items-center justify-center mt-2 p-2">
        <div className=" bg-gray-50 rounded-xl  ">
          <ToastContainer />
          <div className="bg-gradient-to-tl from-sky-400 to-sky-800 p-2 flex justify-between items-center">
            <h1 className="text-white text-sm font-bold">Create a User</h1>
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
              label="User Name"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              placeholder="Enter User Name"
            />
            <TextInput
              label="Email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              placeholder="Enter Email"
            />
            <TextInput
              label="Set password"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              placeholder="Enter Login Password"
            />
            <TextInput
              label="Address"
              onChange={(e) => setAddress(e.target.value)}
              value={Address}
              placeholder="Enter Address"
            />

            <TextInput
              label="Phone Number"
              onChange={(e) => setContactNumber(e.target.value)}
              value={ContactNumber}
              placeholder="Enter Phone Number"
            />

            {/* <TextInput
            label="User Role"
            onChange={(e) => setRole(e.target.value)}
            value={Role}
            placeholder="Set User Role"
          /> */}

            <button
              type="submit"
              className="flex flex-row px-7 py-3 font-bold hover:text-gray-200 text-white rounded-lg bg-gradient-to-tl from-pink-600 to-pink-800 hover:bg-pink-900"
            >
              Save
            </button>
          </form>
        </div>
      </section>
      <section className="w-full flex flex-col  justify-center mt-2 p-2 pl-48 pr-48">
        <div className=" bg-gray-50 rounded-xl  ">
          <ToastContainer />
          <div className="bg-gradient-to-tl from-sky-400 to-sky-800 p-2 flex justify-between items-center">
            <h1 className="text-white text-sm font-bold">User List</h1>
          </div>

          <hr />
          <div className="mt-5">
            <table className="w-full items-center m-auto mt-2 text-xs text-left   border-collapse border border-gray-400">
              <thead className="text-xs text-gray-50 uppercase bg-gradient-to-l from-sky-500 via-violet-500 to-pink-500">
                <tr>
                  <th className="p-2 border border-gray-400">SL</th>
                  <th className="p-2 border border-gray-400">Name</th>
                  <th className="p-2 border border-gray-400">Email</th>

                  <th className="p-2 border border-gray-400">Password</th>
                  <th className="p-2 border border-gray-400">Contact Number</th>
                  <th className="p-2 border border-gray-400">Address</th>
                </tr>
              </thead>
              <tbody>
                {Data &&
                  Data.map((item, index) => (
                    <tr className="text-gray-900">
                      <td className="p-2 border border-gray-400">
                        {index + 1}
                      </td>
                      <td className="p-2 border border-gray-400">
                        {item.Name}
                      </td>
                      <td className="p-2 border border-gray-400">
                        {item.email}
                      </td>
                      <td className="p-2 border border-gray-400">
                        {item.Password}
                      </td>
                      <td className="p-2 border border-gray-400">
                        {item.ContactNumber}
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
    </div>
  );
};

export default AddUser;
