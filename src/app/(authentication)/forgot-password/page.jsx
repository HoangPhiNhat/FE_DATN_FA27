"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/common/Input/Input";
import messageService from "@/components/base/Message/Message";
import { resetPasswordEmail } from "@/services/auth";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const savedData = localStorage.getItem("forgotPasswordData");
    if (savedData) {
      const { email: savedEmail, step: savedStep } = JSON.parse(savedData);
      setEmail(savedEmail);
      setStep(savedStep);
    }
  }, []);

  const saveToLocalStorage = (email, step) => {
    localStorage.setItem("forgotPasswordData", JSON.stringify({ email, step }));
  };

  const onEmailSubmit = async (data) => {
    try {
      setEmail(data.email);
      const res = await resetPasswordEmail(data);
      if (res.status === 201) {
        setStep(2);
        saveToLocalStorage(data.email, 2);
      }
    } catch (error) {
      if (error.response?.status === 429) {
        messageService.error(
          "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau!"
        );
        return;
      }
      messageService.error(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!"
      );
    }
  };

  const onOTPAndPasswordSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      messageService.error("Mật khẩu không khớp!");
      return;
    }
    try {
      const res = await resetPassword(data);
      if (res.status === 201) {
        messageService.success("Đặt lại mật khẩu thành công!");
        localStorage.removeItem("forgotPasswordData");
        router.push("/sign-in");
      }
    } catch (error) {
      messageService.error(
        error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!"
      );
    }
  };

  const renderEmailForm = () => (
    <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Quên mật khẩu</h2>
      <p className="text-gray-600 text-center">
        Nhập email của bạn để nhận mã OTP
      </p>
      <Input
        label="Email"
        type="email"
        placeholder="Nhập email của bạn"
        error={errors.email?.message}
        {...register("email", {
          required: "Vui lòng nhập email!",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email không hợp lệ!",
          },
        })}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Gửi mã OTP
      </button>
    </form>
  );

  const renderOTPAndPasswordForm = () => (
    <form onSubmit={handleSubmit(onOTPAndPasswordSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Đặt lại mật khẩu</h2>
      <p className="text-gray-600 text-center">
        Mã OTP đã được gửi đến {email}
      </p>
      <Input
        label="Mã OTP"
        placeholder="Nhập mã OTP"
        error={errors.otp?.message}
        {...register("otp", {
          required: "Vui lòng nhập mã OTP!",
          pattern: {
            value: /^\d{6}$/,
            message: "Mã OTP phải là 6 chữ số!",
          },
        })}
      />
      <Input
        type="password"
        label="Mật khẩu mới"
        placeholder="Nhập mật khẩu mới"
        error={errors.password?.message}
        {...register("password", {
          required: "Vui lòng nhập mật khẩu mới!",
          minLength: {
            value: 6,
            message: "Mật khẩu phải có ít nhất 6 ký tự!",
          },
        })}
      />
      <Input
        type="password"
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu mới"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: "Vui lòng xác nhận mật khẩu!",
        })}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Đặt lại mật khẩu
      </button>
    </form>
  );

  return (
    <div className="flex  items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
        {step === 1 && renderEmailForm()}
        {step === 2 && renderOTPAndPasswordForm()}
      </div>
    </div>
  );
};

export default ForgotPassword;
