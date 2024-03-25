import React, { useState } from "react";
import TextInput from "../components/TextInput";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { user, signIn } = useStateContext();

  const [Name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const HandleLogin = async (e) => {
    e.preventDefault();

    await signIn(Name, password).then(() => {
      navigate("/");
    });
  };

  return (
    <section className="w-full items-center justify-center">
      <div className="flex flex-row  items-center justify-center absolute top-[30%] left-[30%]">
        <div className="bg-gradient-to-r from-sky-500 via-violet-600 to-pink-500 rounded-xl p-2 flex flex-col shadow-lg ">
          <p className="flex gap-2 text-xl justify-center font-bold p-0 pb-2 m-0 text-white text-underline">
            <AiFillCodeSandboxCircle className="text-3xl text-white" /> VMS App
          </p>
          <h4 className="font-bold p-2 text-white">Sign In to Continue</h4>
          <hr />
          <form className="p-2 text-white" onSubmit={HandleLogin}>
            <TextInput
              label="User Name"
              placeholder="Enter User Name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextInput
              label="Password"
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end pt-5 pb-3">
              <button
                type="submit"
                className="px-5 py-2 font-semibold hover:text-gray-200 text-white rounded-lg bg-gradient-to-tl from-pink-600 to-pink-800 hover:bg-pink-900"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
