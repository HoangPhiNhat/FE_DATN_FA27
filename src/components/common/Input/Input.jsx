"use client";

import { forwardRef } from "react";

const Input = forwardRef(({ label, type = "text", error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <p className="font-titleFont text-base font-semibold text-gray-600">
          {label}
        </p>
      )}
      <input
        ref={ref}
        type={type}
        className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
          <span className="font-bold italic mr-1">!</span>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
