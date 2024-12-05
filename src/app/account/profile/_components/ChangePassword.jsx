"use client";
import { useForm } from "react-hook-form";
import messageService from "@/components/base/Message/Message";
import useProfileMutation from "@/hooks/useProfile/useProfileMutation";
import Input from "@/components/common/Input/Input";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset, // thêm reset để sử dụng
  } = useForm({
    defaultValues: {
      current_password: "",
      password: "",
      confirm_password: "",
    },
  });

  const { mutate: changePassword } = useProfileMutation({
    action: "CHANGE_PASSWORD",
    onSuccess: () => {
      messageService.success("Đổi mật khẩu thành công");
      reset(); // Reset form về giá trị mặc định
    },
    onError: (error) => {
      messageService.error(error?.response?.data?.message || "Có lỗi xảy ra");
    },
  });

  const onSubmit = (data) => {
    changePassword(data);
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Đổi Mật Khẩu</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
        <Input
          label="Mật khẩu hiện tại"
          type="password"
          {...register("current_password", {
            required: "Vui lòng nhập mật khẩu hiện tại",
          })}
          error={errors.current_password?.message}
        />

        <Input
          label="Mật khẩu mới"
          type="password"
          {...register("password", {
            required: "Vui lòng nhập mật khẩu mới",
            minLength: {
              value: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự",
            },
          })}
          error={errors.password?.message}
        />

        <Input
          label="Xác nhận mật khẩu mới"
          type="password"
          {...register("confirm_password", {
            required: "Vui lòng xác nhận mật khẩu mới",
            validate: (value) =>
              value === watch("password") || "Mật khẩu xác nhận không khớp",
          })}
          error={errors.confirm_password?.message}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Đổi Mật Khẩu
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
