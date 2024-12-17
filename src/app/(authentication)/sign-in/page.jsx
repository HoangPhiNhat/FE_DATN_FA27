"use client";

import messageService from "@/components/base/Message/Message";
import Input from "@/components/common/Input/Input";
import { signIn } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      router.push("/");
    }
  }, [router]);

  const onSubmit = async (data) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await signIn(data);
      if (res) {
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        localStorage.setItem("user", JSON.stringify(res.user));
        window.dispatchEvent(new Event("loginSuccess"));
        messageService.success("Đăng nhập thành công");
        router.push("/");
      }
    } catch (error) {
      if (error?.response?.status === 500) {
        messageService.error("Lỗi máy chủ, vui lòng thử lại sau");
      } else if (error?.response?.status === 403) {
        messageService.error("Tài khoản hoặc mật khẩu không chính xác");
      } else if (error?.response?.status === 429) {
        messageService.error("Quá nhiều yêu cầu. Vui lòng thử lại sau ít phút");
      } else if (error?.response?.status === 401) {
        messageService.error("Tài khoản hoặc mật khẩu không chính xác");
      } else if (error?.response?.status === 404) {
        messageService.error("Tài khoản không tồn tại");
      }  else {
        messageService.error("Đăng nhập thất bại");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full mt-10 flex items-center justify-center scrollbar-none">
      <form
        className="w-full lgl:w-[450px] flex items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-6 py-4 w-full flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primary">
          <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
            Đăng nhập
          </h1>
          <div className="flex flex-col gap-3">
            <Input
              label="Email"
              type="email"
              placeholder="john@workemail.com"
              error={errors.email?.message}
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email không hợp lệ",
                },
              })}
            />

            <Input
              label="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
              error={errors.password?.message}
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                // minLength: {
                //   value: 6,
                //   message: "Mật khẩu phải có ít nhất 6 ký tự",
                // },
              })}
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`bg-primary hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            <p className="text-sm text-center font-titleFont font-medium">
              Bạn chưa có tài khoản?{" "}
              <Link href="/sign-up">
                <span className="hover:text-blue-600 duration-300">
                  Đăng ký
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
    </div>
  );
};

export default SignIn;
