"use client";
import React, { useState } from "react";
import CategoryFilter from "./_components/Filters/CategoryFilter";
import { MdCollections } from "react-icons/md";
import CollectionFilter from "./_components/Filters/CollectionFilter";
import ColorFilter from "./_components/Filters/ColorFilter";
import ProductNav from "./_components/ProductNav";
import useProductQuery from "@/hooks/useProduct/useProductQuery";
import Loading from "@/components/base/Loading/Loading";
import ProductGrid from "./_components/ProductGrid";
import Pagination from "@/components/base/Pagination";
import useCategoryQuery from "@/hooks/useCategory/useCategoryQuery";
import SizeFilter from "./_components/Filters/SizeFilter";
import PriceFilter from "./_components/Filters/PriceFilter";

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
  if (error) return <div>Error: {error.message}</div>;
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  console.log(products);
  return (
    <div className="container mx-auto">
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:block h-full">
          <CategoryFilter category={category} setCategory={setCategory} />
          <ColorFilter color={color} setColor={setColor} />
          {/* <SizeFilter size={size} setSize={setSize} /> */}
          <PriceFilter
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductNav
            itemsPerPageFromBanner={itemsPerPageFromBanner}
            sort={sort}
            setSort={setSort}
          />
          <ProductGrid data={products.data} />
          <Pagination
            currentPage={page}
            totalPages={products?.last_page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;