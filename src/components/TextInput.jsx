import React from "react";

const TextInput = ({ label, ...rest }) => {
  return (
    <div className="flex flex-row w-full p-2">
      <label className="block uppercase text-left pt-3 tracking-wide w-[150px] text-gray-700 text-xl font-bold mb-2">
        {label}
      </label>
      <input
        className="appearance-none block text-lg w-[600px] bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        {...rest}
      />
    </div>
  );
};

export default TextInput;
