"use client";
import Loading from "@/components/base/Loading/Loading";
import Banner from "@/components/UI/Banner/Banner";
import ServiceHighlights from "@/components/UI/Service/ServiceHighlights";
import useProductQuery from "@/hooks/useProduct/useProductQuery";
import ProductGrid from "./products/_components/ProductGrid";
import ProductSlider from "./products/_components/ProductSlider";

export default function Home() {
  const { data, isLoading } = useProductQuery("GET_ALL_PRODUCT", null, 1, "");
  const features = [
    {
      image: "/images/shipping.webp",
      title: "Miễn phí vận chuyển",
      description: "Đơn từ 399K",
    },
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
      <div className=" ">
        <div className="py-7 border-b">
          <div className="container flex justify-between">
            {features.map((feature, index) => (
              <ServiceHighlights key={index} item={feature} />
            ))}
          </div>
        </div>
        <div className="container">
          {isLoading ? (
            <div className="mt-20">
              <Loading />
            </div>
          ) : (
            <>
              <ProductSlider title="New Arrivals" href="/" data={data.data} />
              <ProductGrid
                title="Best Sellers"
                href="/"
                data={data.data.slice(0, 4)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
{
  /* <SectionHeader title="New Arrivals" href="/" />
          <div className="grid grid-cols-5 gap-x-4 gap-y-8">
            <Slider {...productSettings}>
              {products.map((product, index) => (
                <ProductItem key={index} product={product} />
              ))}
            </Slider>
          </div> */
}
