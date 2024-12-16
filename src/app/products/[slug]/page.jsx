"use client";
import Loading from "@/components/base/Loading/Loading";
import messageService from "@/components/base/Message/Message";
import useCartMutation from "@/hooks/useCart/useCartMutation";
import useProductQuery from "@/hooks/useProduct/useProductQuery";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import ProductImageSlider from "../_components/ProductImageSlider";
import ProductSlider from "../_components/ProductSlider";
import ProductGrid from "../_components/ProductGrid";

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
  const [viewedProducts, setViewedProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { mutate: addToCart, isLoading: isAddingToCart } = useCartMutation({
    action: "CREATE",
    onSuccess: () => {
      messageService.success("Đã thêm sản phẩm vào giỏ hàng");
    },
    onError: (error) => {
      messageService.error(
        error?.response?.data?.message || "Có lỗi xảy ra khi thêm vào giỏ hàng"
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

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("viewedProducts") || "[]");
    const filteredProducts = products.filter((p) => p.id !== data?.id);
    setViewedProducts(filteredProducts);
  }, [data]);

  const handleColorChange = (colorId) => {
    const color = data.product_att.find((attr) => attr.color_id === colorId);
    setSelectedColor(color);
    if (color && color.sizes.length > 0) {
      setSelectedSize(color.sizes[0]);
    }

    const updatedImages = data.product_att.map((attr) => ({
      url: attr.image,
      colorId: attr.color_id,
      color: attr.color_name,
      active: attr.color_id === colorId,
    }));

    setColorImages(updatedImages);
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

  const renderViewedProducts = () => {
    if (viewedProducts.length === 0) return null;

    if (viewedProducts.length > 4 || isMobile) {
      return (
        <ProductSlider
          title="Sản phẩm đã xem"
          data={viewedProducts}
          hrefEdit={true}
        />
      );
    }

    return (
      <ProductGrid
        title="Sản phẩm đã xem"
        data={viewedProducts}
        hrefEdit={true}
      />
    );
  };

  if (isLoading) return <Loading />;
  if (isError || !data) return <p>Sản phẩm không tồn tại</p>;
  if (!selectedColor) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      {data ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="w-full">
              <ProductImageSlider
                images={colorImages}
                handleChangeImage={handleColorChange}
              />
            </div>

            <div className="mt-4 md:mt-0">
              <h1 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">
                {data.name}
              </h1>

              <div className="mb-3 md:mb-4">
                <p className="text-lg md:text-xl">
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

              <p className="mb-4 text-sm md:text-base">
                {data.short_description}
              </p>

              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-sm md:text-base">Màu</h3>
                <div className="flex flex-wrap gap-2">
                  {data.product_att.map((color) => (
                    <button
                      key={color.color_id}
                      onClick={() => handleColorChange(color.color_id)}
                      className={`w-7 h-7 md:w-8 md:h-8 rounded-full border-2 ${
                        selectedColor.color_id === color.color_id
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.color_name.toLowerCase(),
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-sm md:text-base">
                  Sizes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedColor.sizes.map((size) => (
                    <button
                      key={size.size_id}
                      onClick={() => handleSizeChange(size.size_id)}
                      disabled={size.stock_quantity === 0}
                      className={`
                        px-2 md:px-3 py-1 border rounded text-sm md:text-base
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

              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-sm md:text-base">
                  Số lượng
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={decrementQuantity}
                    className="p-1.5 md:p-2 border rounded"
                    disabled={quantity <= 1}
                  >
                    <FaMinus size={14} />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 md:w-20 px-2 py-1 border rounded text-center"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="p-1.5 md:p-2 border rounded"
                    disabled={quantity >= selectedSize.stock_quantity}
                  >
                    <FaPlus size={14} />
                  </button>
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Kho: {selectedSize.stock_quantity} sản phẩm
                </p>
              </div>

              <div className="mt-4 text-sm md:text-base">
                <p>
                  <strong>Chất liệu:</strong> {data.material}
                </p>
                <p>
                  <strong>Danh mục:</strong> {data.category_id}
                </p>
                <p>
                  <strong>SKU:</strong> {selectedSize.sku}
                </p>
                <p className="mt-2">{data.long_description}</p>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-2.5 md:py-3 rounded mt-4 text-sm md:text-base ${
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

          <div className="mt-8 md:mt-12">{renderViewedProducts()}</div>
        </>
      ) : (
        "Sản phẩm không tồn tại"
      )}
    </div>
  );
};

export default ProductDetail;
