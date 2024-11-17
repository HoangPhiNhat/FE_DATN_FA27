"use client";

import Input from "@/components/common/Input/Input";
import { signIn } from "@/services/auth";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "hoangnhat27122004@gmail.com",
      password: "quancunho",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await signIn(data);
      if (res) {
        setSuccessMsg(
          `Hello dear, Thank you for your attempt. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${data.email}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      {successMsg ? (
        <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
          <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
            {successMsg}
          </p>
          <Link href="/authentication/sign-up">
            <button className="w-full h-10 bg-primary text-gray-200 rounded-md text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <form
          className="w-full lgl:w-[450px] flex items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="px-6 py-4 w-full flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primary">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Sign in
            </h1>
            <div className="flex flex-col gap-3">
              <Input
                label="Work Email"
                type="email"
                placeholder="john@workemail.com"
                error={errors.email?.message}
                {...register("email", {
                  required: "Enter your email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Create password"
                error={errors.password?.message}
                {...register("password", {
                  required: "Create a password",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />

              <button
                type="submit"
                className="bg-primary hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300"
              >
                Sign In
              </button>

              <p className="text-sm text-center font-titleFont font-medium">
                Don't have an Account?{" "}
                <Link href="/sign-up">
                  <span className="hover:text-blue-600 duration-300">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignIn;
