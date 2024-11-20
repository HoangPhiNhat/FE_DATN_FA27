"use client";
import { getProductAll, getProductBySlug } from "@/services/product";
import { useQuery } from "@tanstack/react-query";

const useProductQuery = (action, slug, page, name) => {
  const queryKey = slug ? ["PRODUCT_KEY", slug] : ["PRODUCT_KEY", page, name];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      switch (action) {
        case "GET_ALL_PRODUCT":
          return await getProductAll(page, name);
        case "GET_PRODUCT_BY_SLUG":
          return await getProductBySlug(slug);
        default:
          return null;
      }
    },
  });
  return { data, ...rest };
};

export default useProductQuery;
