import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div
        className="w-12 h-12 rounded-full animate-spin mx-auto
    border-y-2 border-solid border-blue-500 border-t-transparent shadow-md"
      ></div>
    </div>
  );
};

export default Loading;
