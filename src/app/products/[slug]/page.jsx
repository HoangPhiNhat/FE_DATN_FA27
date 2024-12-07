"use client";
import Loading from "@/components/base/Loading/Loading";
import messageService from "@/components/base/Message/Message";
import useCartMutation from "@/hooks/useCart/useCartMutation";
import useProductQuery from "@/hooks/useProduct/useProductQuery";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ProductImageSlider from "../_components/ProductImageSlider";

const ProductDetail = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useProductQuery(
    "GET_PRODUCT_BY_SLUG",
    slug
  );

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [colorImages, setColorImages] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { mutate: addToCart, isLoading: isAddingToCart } = useCartMutation({
    action: "CREATE",
    onSuccess: () => {
      messageService.success("Đã thêm sản phẩm vào giỏ hàng");
    },
    onError: (error) => {
      messageService.error(
        // error?.response?.data?.message || "Có lỗi xảy ra khi thêm vào giỏ hàng"
        "Sản phẩm không tồn tại."
      );
    },
  });

  useEffect(() => {
    if (data?.product_att?.length > 0) {
      const firstColor = data.product_att[0];
      setSelectedColor(firstColor);
      setSelectedSize(firstColor.sizes[0]);

      const images = data.product_att.map((attr, index) => ({
        url: attr.image,
        colorId: attr.color_id,
        color: attr.color_name,
        active: index === 0,
      }));

      setColorImages(images);
    }
  }, [data]);

  const handleColorChange = (colorId) => {
    const color = data.product_att.find((attr) => attr.color_id === colorId);

    setSelectedColor(color);

    if (color && color.sizes.length > 0) {
      setSelectedSize(color.sizes[0]);
    }

    setColorImages((prevImages) =>
      prevImages.map((img) =>
        img.colorId === colorId
          ? { ...img, active: true }
          : { ...img, active: false }
      )
    );
  };

  const handleSizeChange = (sizeId) => {
    const size = selectedColor.sizes.find((s) => s.size_id === sizeId);
    setSelectedSize(size);
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(0, parseInt(e.target.value, 10) || 0);
    setQuantity(newQuantity);
  };

  const incrementQuantity = () => {
    const maxStock = selectedSize.stock_quantity;
    setQuantity((prev) => Math.min(prev + 1, maxStock));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);

    const cartData = {
      product_id: data.id,
      product_att_id: selectedSize.id,
      quantity: quantity,
      user_id: userData.id,
    };

    addToCart(cartData);
  };
  if (isLoading) return <Loading />;
  if (isError || !data) return <p>Sản phẩm không tồn tại</p>;
  if (!selectedColor) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      {data ? (
        <div className="grid grid-cols-2 gap-8">
          <div>
            <ProductImageSlider
              images={colorImages}
              handleChangeImage={handleColorChange}
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{data.name}</h1>

            <div className="mb-4">
              <p className="text-xl">
                {selectedSize.reduced_price ? (
                  <>
                    <span className="line-through text-gray-500 mr-2">
                      ₫{selectedSize.regular_price.toLocaleString()}
                    </span>
                    <span className="text-red-600 font-bold">
                      ₫{selectedSize.reduced_price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-black font-bold">
                    ₫{selectedSize.regular_price.toLocaleString()}
                  </span>
                )}
              </p>
            </div>

            <p className="mb-4">{data.short_description}</p>
            <h3 className="font-semibold mb-2">Màu</h3>
            <div className="flex space-x-2">
              {data.product_att.map((color) => (
                <button
                  key={color.color_id}
                  onClick={() => handleColorChange(color.color_id)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    selectedColor.color_id === color.color_id
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  style={{
                    backgroundColor: color.color_name.toLowerCase(),
                    opacity: 1,
                  }}
                />
              ))}
            </div>
            <div className="my-4">
              <h3 className="font-semibold mb-2">Sizes</h3>
              <div className="flex space-x-2">
                {selectedColor.sizes.map((size) => (
                  <button
                    key={size.size_id}
                    onClick={() => handleSizeChange(size.size_id)}
                    disabled={size.stock_quantity === 0}
                    className={`
                    px-3 py-1 border rounded
                    ${
                      selectedSize?.size_id === size.size_id
                        ? "bg-black text-white"
                        : "bg-white"
                    }
                    ${
                      size.stock_quantity === 0
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }
                  `}
                  >
                    {size.size_name} ({size.stock_quantity})
                  </button>
                ))}
              </div>
            </div>
            <div className="my-4">
              <h3 className="font-semibold mb-2">Số lượng</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={decrementQuantity}
                  className="p-2 border rounded"
                  disabled={quantity <= 1}
                >
                  <FaMinus size={16} />
                </button>
                <input
                  type="text"
                  min="0"
                  max={selectedSize.stock_quantity}
                  defaultValue={0}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 pr-2 pl-3 py-1 border rounded text-center"
                />
                <button
                  onClick={incrementQuantity}
                  className="p-2 border rounded"
                  disabled={quantity >= selectedSize.stock_quantity}
                >
                  <FaPlus size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Kho: {selectedSize.stock_quantity} sản phẩm
              </p>
            </div>
            <div className="mt-4">
              <p>
                <strong>Chất liệu:</strong> {data.material}
              </p>
              <p>
                <strong>Danh mục:</strong> {data.category_id}
              </p>
              <p>
                <strong> SKU:</strong> {selectedSize.sku}
              </p>
              <p className="mt-2">{data.long_description}</p>
            </div>
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 rounded ${
                !selectedSize ||
                selectedSize.stock_quantity === 0 ||
                quantity > selectedSize.stock_quantity ||
                quantity === 0
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-primary text-white hover:opacity-80 transition-all duration-100"
              }`}
              disabled={
                isAddingToCart ||
                !selectedSize ||
                selectedSize.stock_quantity === 0 ||
                quantity > selectedSize.stock_quantity ||
                quantity === 0
              }
            >
              {isAddingToCart
                ? "Đang thêm..."
                : selectedSize && selectedSize.stock_quantity > 0
                ? quantity > selectedSize.stock_quantity
                  ? "Vượt quá số lượng tồn kho"
                  : quantity === 0
                  ? "Vui lòng chọn số lượng"
                  : "Thêm vào giỏ hàng"
                : "Hết hàng"}
            </button>
          </div>
        </div>
      ) : (
        "Sản phẩm không tồn tại"
      )}
    </div>
  );
};

export default ProductDetail;
