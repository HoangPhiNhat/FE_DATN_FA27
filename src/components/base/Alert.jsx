import React from "react";
import { IoAlertCircle } from "react-icons/io5";

const Alert = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center pointer-events-none">
      <div className="bg-[rgba(0,0,0,0.55)] p-4 rounded-lg pointer-events-auto animate-jump-in">
        <IoAlertCircle className="mx-auto mb-2 text-white text-[40px]" />
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
};

export default Alert;
