"use client";

import Input from "@/components/common/Input/Input";
import { signUp } from "@/services/auth";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [checked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "nhatdeptrai",
      email: "hoangnhat27122004@gmail.com",
      phone: "0987654321",
      password: "quancunho",
      password_confirmation: "quancunho",
      address: "siu dep trai, vo dich, vu tru",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    if (!checked) {
      return;
    }

    try {
      const res = await signUp(data);
      if (res) {
        setSuccessMsg(
          `Hello dear ${data.name}, Welcome you to OREBI Admin panel. We received your Sign up request. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${data.email}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link href="/sign-in">
              <button className="w-full h-10 bg-primary rounded-md text-gray-200 text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form
            className="w-full lgl:w-[500px] h-full flex items-center justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="px-6 py-4 w-full h-full flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primary">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
              </h1>
              <div className="flex flex-col gap-3">
                <Input
                  label="Full Name"
                  placeholder="eg. John Doe"
                  error={errors.name?.message}
                  {...register("name", {
                    required: "Enter your name",
                  })}
                />

                <Input
                  label="Work Email"
                  type="email"
                  placeholder="john@workemail.com"
                  error={errors.email?.message}
                  {...register("email", {
                    required: "Enter your email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Enter a Valid email",
                    },
                  })}
                />

                <Input
                  label="Phone Number"
                  placeholder="008801234567891"
                  error={errors.phone?.message}
                  {...register("phone", {
                    required: "Enter your phone number",
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
                      message: "Passwords must be at least 6 characters",
                    },
                  })}
                />

                <Input
                  label="Password Confirmation"
                  type="password"
                  placeholder="Confirm password"
                  error={errors.password_confirmation?.message}
                  {...register("password_confirmation", {
                    required: "Confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />

                <Input
                  label="Address"
                  placeholder="road-001, house-115, example area"
                  error={errors.address?.message}
                  {...register("address", {
                    required: "Enter your address",
                  })}
                />

                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primary">
                    I agree to the OREBI{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>

                <button
                  type="submit"
                  className={`${
                    checked
                      ? "bg-primary hover:bg-black hover:text-white cursor-pointer"
                      : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-not-allowed"
                  } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                  disabled={!checked}
                >
                  Create Account
                </button>

                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link href="/sign-in">
                    <span className="hover:text-blue-600 duration-300">
                      Sign in
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
