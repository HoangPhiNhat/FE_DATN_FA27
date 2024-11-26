import messageService from "@/components/base/Message/Message";
import useProfileMutation from "@/hooks/useProfile/useProfileMutation";
import { useForm } from "react-hook-form";
import { CiUser } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import Input from "@/components/common/Input/Input";

const EditForm = ({ data, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      date_of_birth: data?.date_of_birth || "",
    },
  });

  const { mutate: updateProfile } = useProfileMutation({
    action: "UPDATE_PROFILE",
    onSuccess: () => {
      messageService.success("Cập nhật thông tin thành công");
      onCancel();
    },
    onError: (error) => {
      messageService.error(error?.response?.data?.message || "Có lỗi xảy ra");
    },
  });

  const onSubmit = (formData) => {
    console.log("Form Data:", formData);
    updateProfile(formData);
  };

  return (
    <div className="animate-fade">
      <h2 className="text-2xl font-bold mb-4 flex items-center justify-between border-b pb-3">
        <div className="flex items-center">
          <CiUser className="mr-2" /> Chỉnh Sửa Thông Tin
        </div>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <IoMdClose size={24} />
        </button>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Họ Tên"
          {...register("name", { required: "Vui lòng nhập họ tên" })}
          error={errors.name?.message}
        />

        <Input
          label="Email"
          type="email"
          {...register("email", {
            required: "Vui lòng nhập email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email không hợp lệ",
            },
          })}
          error={errors.email?.message}
        />

        <Input
          label="Số Điện Thoại"
          type="tel"
          {...register("phone", {
            required: "Vui lòng nhập số điện thoại",
            pattern: {
              value: /(0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "Số điện thoại không hợp lệ",
            },
          })}
          error={errors.phone?.message}
        />

        <Input
          label="Ngày Sinh"
          type="date"
          {...register("date_of_birth", {
            required: "Vui lòng chọn ngày sinh",
          })}
          error={errors.date_of_birth?.message}
        />

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
          >
            Lưu Thay Đổi
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
