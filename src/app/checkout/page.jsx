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
import Link from "next/link";
import useVoucherQuery from "@/hooks/useVoucher/useVoucherQuery";
import useVoucherMutation from "@/hooks/useVoucher/useVoucherMutation";

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
  const [cart, setCart] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { data: cartData, refetch: refetchCart } = useCartQuery(cart);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const { data: addresses, isLoading } = useAddressQuery("address");
  const { data: voucherData } = useVoucherQuery();
  const { mutate: applyVoucherMutation } = useVoucherMutation({
    onSuccess: (data) => {
      setDiscountAmount(Number(data.discountPrice));
      messageService.success("Áp dụng voucher thành công!");
    },
    onError: (error) => {
      setDiscountAmount(0);
      setSelectedVoucher(null);
      messageService.error(
        error?.response?.data?.message || "Không thể áp dụng voucher"
      );
    },
  });

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
        thumbnail: item.product_att.image ?? "/images/default-image.jpg",
      }));

      const payload = {
        total_amount:
          discountAmount > 0
            ? totalAmount + Number(shippingFee) - discountAmount
            : Number(totalAmount) + Number(shippingFee),
        delivery_fee: Number(shippingFee),
        shipping_address_id: selectedAddressId,
        note: data.note || "",
        order_details: orderDetails,
        total_product_amount: Number(totalAmount),
        voucher_code: selectedVoucher?.voucher_code
          ? selectedVoucher?.voucher_code
          : "",
      };

      if (paymentMethod === "cod") {
        const response = await createOrder(payload);
        if (response.message == "Đặt hàng thành công") {
          messageService.success("Đặt hàng thành công");
          setCart(cart + 1);
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

  const handleApplyVoucher = (voucherId) => {
    const voucher = voucherData?.find((v) => v.id === Number(voucherId));
    setSelectedVoucher(voucher);

    if (voucher) {
      applyVoucherMutation({
        voucher_code: voucher.voucher_code,
        total: Number(totalAmount) + Number(shippingFee),
      });
    } else {
      setDiscountAmount(0);
    }
  };

  const handleSelectAddress = async (address) => {
    try {
      setSelectedAddressId(address.id);
      setValue("name", address.recipient_name);
      setValue("phone", address.recipient_phone);
      setValue("address", address.recipient_address);
      setValue("province_code", address.province_code);
      setValue("district_code", address.district_code);
      setValue("ward_code", address.ward_code);

      const districtRes = await getDistrict(address.province_code);
      const wardRes = await getWard(address.district_code);

      const districtName = districtRes?.data?.find(
        (d) => d.DistrictID === Number(address.district_code)
      )?.DistrictName;

      const wardName = wardRes?.data?.find(
        (w) => w.WardCode === address.ward_code
      )?.WardName;

      setAddressNames({
        districtName: districtName || "",
        wardName: wardName || "",
      });

      if (address.district_code) {
        const district = await getDistrict2(address.district_code);
        setShippingFee(district?.data?.ship_fee || 0);
      }

      setShowAddressModal(false);
    } catch (error) {
      console.error("Error handling address selection:", error);
      messageService.error("Có lỗi xảy ra khi chọn địa chỉ");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container mx-auto px-4 py-6 md:py-8"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <h2 className="text-xl md:text-2xl font-semibold mb-6">
                Thông tin giao hàng
              </h2>

              <div className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <h3 className="text-lg font-medium">Địa chỉ nhận hàng</h3>
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(true)}
                    className="text-primary hover:underline text-sm sm:text-base"
                  >
                    + Thêm địa chỉ mới
                  </button>
                </div>

                <div className="space-y-4">
                  {addressDetails.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => handleSelectAddress(address)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedAddressId === address.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-gray-400"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="font-medium">
                            {address.recipient_name}
                          </p>
                          <p className="text-gray-600 text-sm md:text-base">
                            {address.recipient_phone}
                          </p>
                          <p className="text-gray-600 text-sm md:text-base">
                            {address.recipient_address}
                          </p>
                          <p className="text-gray-600 text-sm md:text-base">
                            {address.ward_name}, {address.district_name}, Hà Nội
                          </p>
                        </div>
                        <input
                          type="radio"
                          checked={selectedAddressId === address.id}
                          onChange={() => handleSelectAddress(address)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Ghi chú
                </label>
                <textarea
                  {...register("note")}
                  className="w-full border rounded-lg p-3 min-h-[100px] resize-none"
                  placeholder="Ghi chú cho đơn hàng..."
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">
                  Phương thức thanh toán
                </h3>
                <div className="space-y-4">
                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary">
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium">
                        Thanh toán khi nhận hàng (COD)
                      </p>
                      <p className="text-sm text-gray-500">
                        Thanh toán bằng tiền mặt khi nhận được hàng
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer hover:border-primary">
                    <input
                      type="radio"
                      value="onlineVNPay"
                      checked={paymentMethod === "onlineVNPay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium">Thanh toán qua VNPAY</p>
                      <p className="text-sm text-gray-500">
                        Thanh toán qua Internet Banking, Visa, Master, JCB
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm lg:sticky lg:top-4">
              <h3 className="text-xl font-semibold mb-6">Đơn hàng của bạn</h3>

              <div className="space-y-4 mb-6">
                {checkoutItems?.map((item) => {
                  const itemPrice =
                    item.product_att.reduced_price ??
                    item.product_att.regular_price;
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex gap-4 flex-1">
                        <Image
                          width={64}
                          height={64}
                          src={
                            item.product_att.image ??
                            "/images/default-image.jpg"
                          }
                          alt={item.product_att.product.name}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm md:text-base">
                            {item.product_att.product.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {item.product_att.size.name} -{" "}
                            {item.product_att.color.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm md:text-base">
                          {new Intl.NumberFormat("vi-VN").format(itemPrice)}đ
                        </p>
                        <p className="text-sm text-gray-500">
                          Tổng:{" "}
                          {new Intl.NumberFormat("vi-VN").format(itemTotal)}đ
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mb-6">
                <p className="text-base mb-2">Mã giảm giá</p>
                <select
                  className="w-full p-3 border rounded-lg"
                  onChange={(e) => handleApplyVoucher(e.target.value)}
                  value={selectedVoucher?.id || ""}
                >
                  <option value="">Chọn voucher</option>
                  {voucherData?.map((voucher) => (
                    <option key={voucher.id} value={voucher.id}>
                      {voucher.name} - Giảm{" "}
                      {voucher.discount_type === "percentage"
                        ? `${voucher.discount_value}%`
                        : `${new Intl.NumberFormat("vi-VN").format(
                            voucher.discount_value
                          )}đ`}
                    </option>
                  ))}
                </select>
                {selectedVoucher && (
                  <p className="text-sm text-gray-500 mt-2">
                    Giảm tối đa{" "}
                    {new Intl.NumberFormat("vi-VN").format(
                      selectedVoucher.max_discount
                    )}
                    đ
                  </p>
                )}
              </div>

              <div className="space-y-4 py-4 border-t">
                <div className="flex justify-between text-sm md:text-base">
                  <p className="text-gray-600">Tổng số sản phẩm</p>
                  <p className="font-medium">
                    {checkoutItems?.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </p>
                </div>

                <div className="flex justify-between text-sm md:text-base">
                  <p className="text-gray-600">Tạm tính</p>
                  <p className="font-medium">
                    {new Intl.NumberFormat("vi-VN").format(totalAmount)}đ
                  </p>
                </div>

                <div className="flex justify-between text-sm md:text-base">
                  <p className="text-gray-600">Phí vận chuyển</p>
                  <p className="font-medium">
                    {new Intl.NumberFormat("vi-VN").format(shippingFee)}đ
                  </p>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm md:text-base text-primary">
                    <p>Giảm giá</p>
                    <p className="font-medium">
                      -{new Intl.NumberFormat("vi-VN").format(discountAmount)}đ
                    </p>
                  </div>
                )}

                <div className="flex justify-between pt-4 border-t">
                  <p className="text-lg font-semibold">Tổng cộng</p>
                  <p className="text-lg font-semibold text-primary">
                    {new Intl.NumberFormat("vi-VN").format(
                      Number(totalAmount) + Number(shippingFee) - discountAmount
                    )}
                    đ
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-primary text-white py-4 rounded-lg hover:bg-primary-dark transition-colors text-sm md:text-base"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Modals */}
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
