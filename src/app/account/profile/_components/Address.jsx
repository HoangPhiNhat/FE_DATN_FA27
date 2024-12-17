"use client";
import React, { useState, useEffect } from "react";
import useAddressQuery from "@/hooks/useAddress/useAddressQuery";
import { useForm } from "react-hook-form";
import Input from "@/components/common/Input/Input";
import { getDistrict, getWard, getProvince } from "@/services/address";
import useAddressMutation from "@/hooks/useAddress/useAddressMutation";
import messageService from "@/components/base/Message/Message";
import Loading from "@/components/base/Loading/Loading";
import { usePathname } from "next/navigation";

const Address = ({ isAdding = false, isCheckout = false, onClose }) => {
  const [isAddingNew, setIsAddingNew] = useState(isAdding);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [addressDetails, setAddressDetails] = useState([]);
  const [districtMap, setDistrictMap] = useState({});
  const [wardMap, setWardMap] = useState({});
  const pathname = usePathname();
  const isCheckoutPage = pathname?.includes("checkout");
  const { mutate: addNewAddress, isLoading: isAddingNewAddress } =
    useAddressMutation({
      action: "CREATE",
      onSuccess: () => {
        setIsAddingNew(false);
        reset();
        messageService.success("Thêm địa chỉ mới thành công");
      },
      onError: () => {
        messageService.error("Thêm địa chỉ mới thất bại");
      },
    });
  const { mutate: updateAddress } = useAddressMutation({
    action: "UPDATE",
    onSuccess: () => {
      setIsEditing(false);
      setSelectedAddress(null);
      reset();
      messageService.success("Cập nhật địa chỉ thành công");
    },
    onError: () => {
      messageService.error("Cập nhật địa chỉ thất bại");
    },
  });

  const { data: addresses, isLoading, refetch } = useAddressQuery();
  const { mutate: removeAddress } = useAddressMutation({
    action: "DELETE",
    onSuccess: () => {
      refetch();
      messageService.success("Xoá địa chỉ thành công");
    },
    onError: () => {
      messageService.error("Đã có lỗi xảy ra vui lòng thử lại");
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      recipient_name: "",
      recipient_phone: "",
      recipient_address: "",
      province: "201",
      district: "",
      ward: "",
      is_default: false,
    },
  });
  const selectedDistrict = watch("district");

  useEffect(() => {
    const fetchDistricts = async () => {
      const res = await getDistrict(201);
      if (res?.data) {
        setDistricts(res.data);
        const dMap = {};
        res.data.forEach((d) => {
          dMap[d.DistrictID] = d.DistrictName;
        });
        setDistrictMap(dMap);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      setValue("ward", "");
      const fetchWards = async () => {
        const res = await getWard(selectedDistrict);
        if (res?.data) {
          setWards(res.data);
          const wMap = {};
          res.data.forEach((w) => {
            wMap[w.WardCode] = w.WardName;
          });
          setWardMap(wMap);
        }
      };
      fetchWards();
    }
  }, [selectedDistrict, setValue]);

  useEffect(() => {
    const fetchAddressDetails = async () => {
      if (!addresses || addresses.length === 0) {
        setAddressDetails([]);
        return;
      }

      const details = await Promise.all(
        addresses.map(async (address) => {
          const districtRes = await getDistrict(address.province_code);
          const wardRes = await getWard(address.district_code);
          return {
            ...address,
            province_name: "Hà Nội",
            district_name: districtRes?.data?.filter(
              (d) => d.DistrictID === Number(address.district_code)
            )[0]?.DistrictName,
            ward_name: wardRes?.data?.filter(
              (w) => w.WardCode === address.ward_code
            )[0]?.WardName,
          };
        })
      );
      setAddressDetails(details);
    };

    fetchAddressDetails();
  }, [addresses]);
  const handleEdit = async (address) => {
    try {
      setValue("district", address.district_code);
      const wardRes = await getWard(address.district_code);
      if (wardRes?.data) {
        setWards(wardRes.data);
        const wMap = {};
        wardRes.data.forEach((w) => {
          wMap[w.WardCode] = w.WardName;
        });
        setWardMap(wMap);
      }

      setSelectedAddress(address);
      setIsEditing(true);

      setValue("recipient_name", address.recipient_name);
      setValue("recipient_phone", address.recipient_phone);
      setValue("recipient_address", address.recipient_address);
      setValue("province", "201");
      setValue("ward", address.ward_code);
      setValue("is_default", address.is_default);
    } catch (error) {
      console.error("Error in handleEdit:", error);
    }
  };
  const onSubmit = (data, event) => {
    event.preventDefault();

    const formattedData = {
      ...data,
      province: {
        code: "201",
        name: "Hà Nội",
      },
      district: {
        code: String(data.district),
        name: districtMap[data.district],
      },
      ward: {
        code: String(data.ward),
        name: wardMap[data.ward],
      },
    };

    if (isEditing) {
      updateAddress({ id: selectedAddress.id, ...formattedData });
    } else {
      addNewAddress(formattedData);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={`${!isCheckoutPage ? "mt-4 max-w-4xl mx-auto p-4 " : ""}`}>
      {!isCheckoutPage && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Địa chỉ của tôi
          </h2>
          {addresses?.length > 0 && (
            <button
              onClick={() => setIsAddingNew(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Thêm địa chỉ mới
            </button>
          )}
        </div>
      )}

      {addressDetails.length === 0 || isCheckout ? (
        isLoading ? (
          <Loading />
        ) : (
          !isCheckoutPage && (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Bạn chưa có địa chỉ nào</p>
              <button
                onClick={() => setIsAddingNew(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Thêm địa chỉ mới
              </button>
            </div>
          )
        )
      ) : (
        <div className="space-y-4">
          {addressDetails.map((address) => (
            <div
              key={address.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {address.recipient_name}
                    </span>
                    {address.is_default === 1 && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                        Mặc định
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600">{address.recipient_phone}</p>
                  <p className="text-gray-600">{address.recipient_address}</p>
                  <p className="text-gray-600">
                    {`Tỉnh ${address.province_name}, ${address.district_name}, ${address.ward_name}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => removeAddress(address.id)}
                    className="text-gray-600 hover:text-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(isAddingNew || isEditing) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)(e);
              }}
              className="space-y-4"
            >
              <Input
                label="Họ tên người nhận"
                {...register("recipient_name", {
                  required: "Vui lòng nhập họ tên người nhận",
                })}
                error={errors.recipient_name?.message}
              />

              <Input
                label="Số điện thoại"
                type="tel"
                {...register("recipient_phone", {
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
                error={errors.recipient_phone?.message}
              />

              <div className="flex flex-col gap-0.5">
                <label className="font-titleFont text-base font-semibold text-gray-600">
                  Quận/Huyện
                </label>
                <select
                  className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                  {...register("district", {
                    required: "Vui lòng chọn quận/huyện",
                  })}
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts?.map((district) => (
                    <option
                      key={district.DistrictID}
                      value={district.DistrictID}
                    >
                      {district.DistrictName}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errors.district.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-0.5">
                <label className="font-titleFont text-base font-semibold text-gray-600">
                  Phường/Xã
                </label>
                <select
                  className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                  {...register("ward", {
                    required: "Vui lòng chọn phường/xã",
                  })}
                  disabled={!selectedDistrict}
                >
                  <option value="">Chọn Phường/Xã</option>
                  {wards.map((ward) => (
                    <option key={ward.WardCode} value={ward.WardCode}>
                      {ward.WardName}
                    </option>
                  ))}
                </select>
                {errors.ward && (
                  <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                    <span className="font-bold italic mr-1">!</span>
                    {errors.ward.message}
                  </p>
                )}
              </div>

              <Input
                label="Địa chỉ cụ thể"
                {...register("recipient_address", {
                  required: "Vui lòng nhập địa chỉ cụ thể",
                })}
                error={errors.recipient_address?.message}
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register("is_default")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Đặt làm địa chỉ mặc định
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(false);
                    setIsEditing(false);
                    setSelectedAddress(null);
                    onClose && onClose();
                    reset();
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? "Cập nhật" : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
