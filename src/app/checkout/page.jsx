"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Input from "@/components/common/Input/Input";
import useAddressQuery from "@/hooks/useAddress/useAddressQuery";
import Loading from "@/components/base/Loading/Loading";
import Address from "../account/profile/_components/Address";
import { getDistrict, getDistrict2, getWard } from "@/services/address";
import messageService from "@/components/base/Message/Message";
import {
  createOrder,
  createOnlinePayment,
  createOnlinePaymentVNPay,
} from "@/services/order";
import useCartQuery from "@/hooks/useCart/useCartQuery";
import Image from "next/image";
import { getProductAttById } from "@/services/product";

const Checkout = () => {
  const router = useRouter();
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [addressDetails, setAddressDetails] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [addressNames, setAddressNames] = useState({
    districtName: "",
    wardName: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { data: cartData, refetch: refetchCart } = useCartQuery("CART_DATA");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const { data: addresses, isLoading } = useAddressQuery("address");
  useEffect(() => {
    const validateAndFetchProducts = async () => {
      try {
        const items = localStorage.getItem("checkoutItems");
        const token = localStorage.getItem("access_token");

        if (!token) {
          router.push("/sign-in");
          return;
        }
        if (!items) {
          router.push("/cart");
          return;
        }

        const parsedItems = JSON.parse(items);
        setCheckoutItems(parsedItems);
        const total = parsedItems.reduce((sum, item) => {
          const price =
            item.product_att.reduced_price ?? item.product_att.regular_price;
          return sum + price * item.quantity;
        }, 0);

        setTotalAmount(total);
      } catch (error) {
        messageService.error("Có lỗi xảy ra khi kiểm tra giỏ hàng");
        router.push("/cart");
      }
    };

    validateAndFetchProducts();
  }, [router]);

  useEffect(() => {
    const fetchAddressDetails = async () => {
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

    if (addresses?.length > 0) {
      fetchAddressDetails();
    }
  }, [addresses]);

  useEffect(() => {
    const setDefaultAddress = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.email) {
        setValue("email", user.email);
      }

      if (addresses?.length > 0) {
        const defaultAddress = addresses.find((addr) => addr.is_default === 1);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
          setSelectedAddress(defaultAddress);
          setValue("name", defaultAddress.recipient_name);
          setValue("phone", defaultAddress.recipient_phone);
          setValue("address", defaultAddress.recipient_address);
        } else if (addresses[0]) {
          setSelectedAddressId(addresses[0].id);
          setSelectedAddress(addresses[0]);
          setValue("name", addresses[0].recipient_name);
          setValue("phone", addresses[0].recipient_phone);
          setValue("address", addresses[0].recipient_address);
        }
      }
    };

    setDefaultAddress();
  }, [addresses, setValue]);

  useEffect(() => {
    const fetchAddressDetails = async () => {
      if (selectedAddressId && addresses) {
        const selectedAddress = addresses.find(
          (addr) => addr.id === selectedAddressId
        );
        if (selectedAddress) {
          const districtRes = await getDistrict(selectedAddress.province_code);
          const wardRes = await getWard(selectedAddress.district_code);

          const districtName = districtRes?.data?.find(
            (d) => d.DistrictID === Number(selectedAddress.district_code)
          )?.DistrictName;

          const wardName = wardRes?.data?.find(
            (w) => w.WardCode === selectedAddress.ward_code
          )?.WardName;

          setAddressNames({
            districtName,
            wardName,
          });
        }
      }
    };

    fetchAddressDetails();
  }, [selectedAddressId, addresses]);

  const onSubmit = async (data) => {
    try {
      const selectedAddress = addressDetails.find(
        (addr) => addr.id === selectedAddressId
      );

      if (!selectedAddress) {
        messageService.error("Vui lòng chọn địa chỉ giao hàng");
        return;
      }

      const orderDetails = checkoutItems.map((item) => ({
        product_id: item.product_att.product_id,
        product_att_id: item.product_att.id,
        size: item.product_att.size.name,
        color: item.product_att.color.name,
        product_name: item.product_att.product.name,
        unit_price:
          item.product_att.reduced_price ?? item.product_att.regular_price,
        total_amount:
          (item.product_att.reduced_price ?? item.product_att.regular_price) *
          item.quantity,
        quantity: item.quantity,
        thumbnail: item.image ?? "/images/default-image.jpg",
      }));

      const payload = {
        total_amount: Number(totalAmount) + Number(shippingFee),
        delivery_fee: Number(shippingFee),
        shipping_address_id: selectedAddressId,
        note: data.note || "",
        order_details: orderDetails,
        total_product_amount: Number(totalAmount)
      };

      if (paymentMethod === "cod") {
        const response = await createOrder(payload);
        if (response.message == "Đặt hàng thành công") {
          messageService.success("Đặt hàng thành công");
          refetchCart();
          localStorage.removeItem("checkoutItems");
          router.push("/order-confirmation");
        }
      } else if (paymentMethod === "onlineVNPay") {
        const resOrder = await createOrder({
          ...payload,
          payment_method: "VNPAY",
        });

        const data = {
          order_id: resOrder.order_id,
          total_amount: resOrder.total_amount,
        };

        const resOnlineVnPay = await createOnlinePaymentVNPay(data);
        if ((resOnlineVnPay.message = "success" && resOnlineVnPay.data)) {
          window.location.href = resOnlineVnPay.data;
        }
      } else {
        const response = await createOnlinePayment(payload);
        refetchCart();
        if (response.payUrl) {
          window.location.href = response.payUrl;
        }
      }
    } catch (error) {
      messageService.error(
        "Đặt hàng thất bại. " + error?.response.data.message
      );
    }
  };

  useEffect(() => {
    const fetchAddressNames = async () => {
      const districtCode = watch("district");
      const wardCode = watch("ward");

      if (districtCode) {
        const districtRes = await getDistrict(201);
        if (districtRes?.data) {
          const district = districtRes.data.find(
            (d) => d.DistrictID === Number(districtCode)
          );
          setAddressNames((prev) => ({
            ...prev,
            districtName: district?.DistrictName || "",
          }));
        }
      }

      if (wardCode) {
        const wardRes = await getWard(watch("district"));
        if (wardRes?.data) {
          const ward = wardRes.data.find((w) => w.WardCode === wardCode);
          setAddressNames((prev) => ({
            ...prev,
            wardName: ward?.WardName || "",
          }));
        }
      }
    };

    fetchAddressNames();
  }, [watch]);

  const AddressModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Chọn địa chỉ giao hàng</h3>
          <button
            onClick={() => setShowAddressModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {addresses?.length === 0 ? (
          <div className=" py-4">
            <p className="text-gray-500 mb-4 text-center">
              Bạn chưa có địa chỉ nào
            </p>
            {/* <button
              onClick={() => {
                setIsAddingNew(true);
                // setShowAddressModal(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Thêm địa chỉ mới
            </button> */}
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {addressDetails?.map((address) => (
              <div
                key={address.id}
                className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 ${
                  selectedAddressId === address.id
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
                onClick={() => {
                  setSelectedAddressId(address.id);
                  setValue("name", address.recipient_name);
                  setValue("phone", address.recipient_phone);
                  setValue("address", address.recipient_address);
                  setSelectedAddress(address);
                  setShowAddressModal(false);
                }}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">{address.recipient_name}</p>
                    <p className="text-gray-600">{address.recipient_phone}</p>
                    <p className="text-gray-600">{address.recipient_address}</p>
                    <p className="text-gray-600">
                      {address.ward_name && address.district_name
                        ? `${address.ward_name}, ${address.district_name}, Hà Nội`
                        : "Đang tải..."}
                    </p>
                  </div>
                  {address.is_default === 1 && (
                    <span className="px-2 py-1 h-fit w-[70px] text-center text-xs bg-blue-100 text-blue-600 rounded">
                      Mặc định
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => {
              setIsAddingNew(true);
              setShowAddressModal(false);
            }}
            className="text-blue-600 hover:underline"
          >
            + Thêm địa chỉ mới
          </button>
          <button
            onClick={() => setShowAddressModal(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (selectedAddress) {
      const fetchShippingFee = async () => {
        const response = await getDistrict2(selectedAddress.district_code);
        setShippingFee(response.shipping_fee);
      };
      fetchShippingFee();
    }
  }, [selectedAddress]);

  if (isLoading) return <Loading />;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center 2xl:container 2xl:mx-auto px-4 md:px-6 lg:px-20 xl:px-44">
          <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
            <div className="flex w-full flex-col justify-start items-start">
              <div>
                <p className="text-3xl lg:text-4xl dark:text-white font-semibold leading-7 lg:leading-9 text-gray-800">
                  Thanh toán
                </p>
              </div>

              <div className="mt-12">
                <p className="text-xl font-semibold dark:text-white leading-5 text-gray-800">
                  Thông tin giao hàng
                </p>
              </div>
              <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8">
                <div className="w-full">
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(true)}
                    className="w-full p-4 border rounded-lg text-left hover:border-blue-500"
                  >
                    {selectedAddressId ? (
                      <div>
                        <p className="font-medium">{watch("name")}</p>
                        <p className="text-gray-600">{watch("phone")}</p>
                        <p className="text-gray-600">{watch("address")}</p>
                        <p className="text-gray-600">
                          {addressNames.wardName && addressNames.districtName
                            ? `${addressNames.wardName}, ${addressNames.districtName}, Hà Nội`
                            : "Đang tải..."}
                        </p>
                      </div>
                    ) : (
                      <span className="text-blue-600">
                        + Chọn địa chỉ giao hàng
                      </span>
                    )}
                  </button>
                </div>
                <Input
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không hợp lệ",
                    },
                  })}
                  error={errors.email?.message}
                  placeholder="Email"
                  className="w-full"
                />
                <Input
                  {...register("address")}
                  error={errors.address?.message}
                  placeholder="Địa chỉ"
                  className="w-full"
                />
                <textarea
                  {...register("note")}
                  placeholder="Ghi chú"
                  className="w-full border rounded-lg p-2"
                ></textarea>
              </div>
              <div className="mt-8">
                <p className="text-xl font-semibold dark:text-white leading-5 text-gray-800">
                  Phương thức thanh toán
                </p>
                <div className="mt-4 space-y-4">
                  <div
                    className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-blue-500"
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <input
                      type="radio"
                      id="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <label
                        htmlFor="cod"
                        className="font-medium cursor-pointer"
                      >
                        Thanh toán khi nhận hàng (COD)
                      </label>
                      <p className="text-sm text-gray-500">
                        Thanh toán bằng tiền mặt khi nhận được hàng
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-blue-500"
                    onClick={() => setPaymentMethod("online")}
                  >
                    <input
                      type="radio"
                      id="online"
                      checked={paymentMethod === "online"}
                      onChange={() => setPaymentMethod("online")}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <label
                        htmlFor="online"
                        className="font-medium cursor-pointer"
                      >
                        Thanh toán online
                      </label>
                      <p className="text-sm text-gray-500">
                        Thanh toán qua MoMo
                      </p>
                    </div>
                  </div>

                  {/* VNPay */}
                  <div
                    className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-blue-500"
                    onClick={() => setPaymentMethod("onlineVNPay")}
                  >
                    <input
                      type="radio"
                      id="onlineVNPay"
                      checked={paymentMethod === "onlineVNPay"}
                      onChange={() => setPaymentMethod("onlineVNPay")}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <label
                        htmlFor="onlineVNPay"
                        className="font-medium cursor-pointer"
                      >
                        Thanh toán online
                      </label>
                      <p className="text-sm text-gray-500">
                        Thanh toán qua VNPay
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white focus:ring-gray-500 focus:ring-offset-2 mt-8 text-base font-medium leading-4 hover:bg-black py-4 w-full md:w-4/12 lg:w-full text-white bg-gray-800"
              >
                {paymentMethod === "cod" ? "Đặt hàng" : "Thanh toán"}
              </button>
              <div className="mt-4 flex justify-start items-center w-full">
                <a
                  href="#"
                  className="text-base leading-4 dark:text-gray-400 hover:underline focus:outline-none focus:text-gray-500 hover:text-gray-800 text-gray-600"
                >
                  Quay lại giỏ hàng
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start bg-gray-50 dark:bg-gray-800 w-full p-6 md:p-14">
              <div>
                <h1 className="text-2xl dark:text-white font-semibold leading-6 text-gray-800">
                  Tổng đơn hàng
                </h1>
              </div>

              <div className="mt-8 w-full">
                {checkoutItems?.map((item) => {
                  const itemPrice =
                    item.product_att.reduced_price ??
                    item.product_att.regular_price;
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b py-4"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          width={100}
                          height={100}
                          src={item.image ?? "/images/default-image.jpg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                        <div>
                          <p className="text-lg dark:text-gray-300">
                            {item.product_att.product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.product_att.size.name} -{" "}
                            {item.product_att.color.name}
                          </p>
                          <p className="text-sm dark:text-gray-400">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg dark:text-gray-300 font-semibold">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(itemPrice)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Tổng:{" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(itemTotal)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex mt-7 flex-col items-end w-full space-y-6">
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg dark:text-gray-300 leading-4 text-gray-600">
                    Tổng số sản phẩm
                  </p>
                  <p className="text-lg dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    {checkoutItems?.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg dark:text-gray-300 leading-4 text-gray-600">
                    Tổng tiền hàng
                  </p>
                  <p className="text-lg dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalAmount)}
                  </p>
                </div>
                <div className="flex justify-between w-full items-center">
                  <p className="text-lg dark:text-gray-300 leading-4 text-gray-600">
                    Phí vận chuyển
                  </p>
                  <p className="text-lg dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(shippingFee)}
                  </p>
                </div>
                <div className="flex justify-between w-full items-center border-t pt-6">
                  <p className="text-xl dark:text-white font-semibold leading-4 text-gray-800">
                    Tổng thanh toán
                  </p>
                  <p className="text-xl dark:text-white font-semibold leading-4 text-red-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalAmount + Number(shippingFee))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {showAddressModal && <AddressModal />}
      {isAddingNew && (
        <Address
          isAdding={isAddingNew}
          isCheckout={true}
          onClose={() => setIsAddingNew(false)}
        />
      )}
    </>
  );
};

export default Checkout;
