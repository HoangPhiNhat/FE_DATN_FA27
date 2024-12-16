"use client";
import Loading from "@/components/base/Loading/Loading";
import Pagination from "@/components/base/Pagination";
import useProductQuery from "@/hooks/useProduct/useProductQuery";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import CategoryFilter from "./_components/Filters/CategoryFilter";
import ColorFilter from "./_components/Filters/ColorFilter";
import PriceFilter from "./_components/Filters/PriceFilter";
import ProductGrid from "./_components/ProductGrid";
import ProductNav from "./_components/ProductNav";
import { IoFilterCircleOutline } from "react-icons/io5";

const Product = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [sort, setSort] = useState("DESC");
  const searchParams = useSearchParams();
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setCategory(categoryFromUrl);
    }
  }, [searchParams]);

  const itemsPerPageFromBanner = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  };
  const {
    data: products,
    isLoading,
    error,
  } = useProductQuery(
    "GET_ALL_PRODUCT",
    null,
    page ? page : 1,
    searchName,
    category,
    color,
    size,
    minPrice,
    maxPrice,
    sort
  );
  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error?.response?.data?.message}</div>;
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleRemoveFilter = () => {
    setCategory("");
    setColor("");
    setSize("");
    setMinPrice(0);
    setMaxPrice(0);
  };
  return (
    <div className="container mx-auto px-4">
      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <button
          onClick={() => setShowMobileFilter(true)}
          className="bg-primary text-white p-4 rounded-full shadow-lg"
        >
          <IoFilterCircleOutline className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-6 py-4 md:py-8">
        {showMobileFilter && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowMobileFilter(false)}
            />
            <div className="absolute right-0 top-0 h-full w-80 bg-white p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Bộ lọc</h2>
                <button onClick={() => setShowMobileFilter(false)}>✕</button>
              </div>
              <CategoryFilter category={category} setCategory={setCategory} />
              <ColorFilter color={color} setColor={setColor} />
              <PriceFilter
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
              <button
                onClick={handleRemoveFilter}
                className="w-full py-2 px-4 border rounded mt-4"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        )}

        <div className="hidden md:block w-full md:w-[280px] lg:w-[300px]">
          <CategoryFilter category={category} setCategory={setCategory} />
          <ColorFilter color={color} setColor={setColor} />
          <PriceFilter
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
          <button
            onClick={handleRemoveFilter}
            className="w-full py-2 px-4 border rounded hover:bg-gray-50"
          >
            Xóa bộ lọc
          </button>
        </div>

        <div className="flex-1">
          <ProductNav
            itemsPerPageFromBanner={itemsPerPageFromBanner}
            sort={sort}
            setSort={setSort}
          />

          {products?.data?.length > 0 ? (
            <>
              <ProductGrid data={products.data} />
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={products?.last_page}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              Danh mục này chưa có sản phẩm
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Product />
    </Suspense>
  );
}
