"use client";

import messageService from "@/components/base/Message/Message";
import Input from "@/components/common/Input/Input";
import { signUp } from "@/services/auth";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      router.push("/");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      // phone: "",
      password: "",
      password_confirmation: "",
    },
  });

  const password = watch("password");
  const onSubmit = async (data) => {
    if (!checked) {
      return;
    }
    console.log(data);
    try {
      const res = await signUp(data);
      if (res) {
        setSuccessMsg(
          `Xin chào ${data.name} thân mến, Chào mừng bạn đến với NovaThreads. Chúng tôi đã nhận được yêu cầu đăng ký của bạn. Chúng tôi đã gửi link xác nhận đăng ký tài khoản vào email ${data.email} của bạn. Vui lòng xác nhận đăng ký tài khoản email của bạn để xác thực đăng ký tài khoản, cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Trân trọng`
        );
      }
    } catch (error) {
      messageService.error("Đăng ký tài khoản thất bại");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden mt-10">
      <div className="w-full h-full flex flex-col items-center justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont text-justify">
              {successMsg}
            </p>
            <Link href="/sign-in">
              <button className="w-full h-10 bg-primary rounded-md text-gray-200 text-base font-titleFont font-semibold tracking-wide hover:bg-black hover:text-white duration-300">
                Đăng nhập
              </button>
            </Link>
          </div>
        ) : (
          <form
            className="w-full lgl:w-[500px] h-full flex items-center justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="px-6 py-4 w-full h-full flex flex-col justify-start">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Tạo tài khoản của bạn
              </h1>
              <div className="flex flex-col gap-3">
                <Input
                  label="Họ và tên"
                  placeholder="eg. John Doe"
                  error={errors.name?.message}
                  {...register("name", {
                    required: "Nhập tên của bạn",
                  })}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="john@workemail.com"
                  error={errors.email?.message}
                  {...register("email", {
                    required: "Nhập email của bạn",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Nhập email hợp lệ",
                    },
                  })}
                />

                {/* <Input
                  label="Số điện thoại"
                  placeholder="0987654321"
                  error={errors.phone?.message}
                  {...register("phone", {
                    required: "Nhập số điện thoại của bạn",
                  })}
                /> */}

                <Input
                  label="Mật khẩu"
                  type="password"
                  placeholder="Tạo mật khẩu"
                  error={errors.password?.message}
                  {...register("password", {
                    required: "Tạo mật khẩu",
                    minLength: {
                      value: 6,
                      message: "Mật khẩu phải có ít nhất 6 ký tự",
                    },
                  })}
                />

                <Input
                  label="Nhập lại mật khẩu"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  error={errors.password_confirmation?.message}
                  {...register("password_confirmation", {
                    required: "Nhập lại mật khẩu",
                    validate: (value) =>
                      value === password || "Mật khẩu không khớp",
                  })}
                />

                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primary">
                    Tôi đồng ý với điều khoản dịch vụ của NovaThreads{" "}
                    <span className="text-blue-500">Điều khoản dịch vụ </span>
                    và <span className="text-blue-500">Chính sách bảo mật</span>
                    .
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
                  Tạo tài khoản
                </button>

                <p className="text-sm text-center font-titleFont font-medium">
                  Bạn chưa có tài khoản?
                  <Link href="/sign-in">
                    <span className="hover:text-blue-600 duration-300">
                      Đăng nhập
                    </span>
                  </Link>
                </p>
                <p className="text-sm text-center font-titleFont font-medium">
                  <Link href="/forgot-password">
                    <span className="hover:text-blue-600 duration-300">
                      Quên mật khẩu
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
