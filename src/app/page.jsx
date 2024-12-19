"use client";
import Loading from "@/components/base/Loading/Loading";
import Banner from "@/components/UI/Banner/Banner";
import ServiceHighlights from "@/components/UI/Service/ServiceHighlights";
import useProductQuery from "@/hooks/useProduct/useProductQuery";
import ProductGrid from "./products/_components/ProductGrid";
import useVoucherQuery from "@/hooks/useVoucher/useVoucherQuery";
import VoucherSlider from "@/components/UI/VoucherSlider";
import useCategoryQuery from "@/hooks/useCategory/useCategoryQuery";
import { useEffect, useMemo } from "react";

export default function Home() {
  const {
    data: categories,
    isLoading: categoryLoading,
    refetch,
  } = useCategoryQuery("GET_ALL_CATEGORY");
  const { data: productData, isLoading: productLoading } = useProductQuery(
    "GET_PRODUCT_BY",
    null,
    1,
    ""
  );
  useEffect(() => {
    localStorage.removeItem("checkoutItems");
    refetch();
  }, [refetch]);
  console.log(productData);
  const { data: voucherData } = useVoucherQuery();
  const topCategories = useMemo(() => {
    return categories ? categories.data.slice(0, 4) : [];
  }, [categories]);
  const groupedProducts = useMemo(() => {
    if (!productData || !topCategories) return {};

    const grouped = {};

    topCategories.forEach((category) => {
      grouped[category.id] = {
        category,
        products: productData?.data
          .filter((product) => product.category_id === category.id)
          .slice(0, 8),
      };
    });

    return grouped;
  }, [productData, topCategories]);

  const features = [
    {
      image: "/images/exchange_goods.png",
      title: "Đổi hàng tận nhà",
      description: "Trong vòng 15 ngày",
    },
    {
      image: "/images/cod.png",
      title: "Thanh toán COD",
      description: "Yên tâm mua sắm",
    },
    {
      image: "/images/cod.png",
      title: "Hotline: 028.73066.060",
      description: "Hỗ trợ bạn từ 8h30-24h00",
    },
  ];

  return (
    <div>
      <Banner />
      <div className="">
        <div className="py-7 border-b">
          <div className="container flex justify-between">
            {features.map((feature, index) => (
              <ServiceHighlights key={index} item={feature} />
            ))}
          </div>
        </div>
        <div className="container">
          {voucherData?.length > 0 && <VoucherSlider vouchers={voucherData} />}

          {productLoading ? (
            <div className="mt-20">
              <Loading />
            </div>
          ) : (
            <>
              {/* <ProductSlider
                title="Tất cả sản phẩm"
                href="/"
                data={productData.data}
              /> */}

              {Object.values(groupedProducts).map(
                ({ category, products }) =>
                  products.length > 0 && (
                    <ProductGrid
                      key={category.id}
                      title={`${category.name}`}
                      data={products}
                    />
                  )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
