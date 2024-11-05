"use client";
import { getProductAll, getProductById } from "@/services/product";
import { useQuery } from "@tanstack/react-query";

const useProductQuery = (action, id, page, name) => {
  const queryKey = id ? ["PRODUCT_KEY", id] : ["PRODUCT_KEY", page, name];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      switch (action) {
        case "GET_ALL_PRODUCT":
          return await getProductAll(page, name);
        case "GET_PRODUCT_BY_ID":
          return await getProductById(id);
        default:
          return null;
      }
    },
  });
  return { data, ...rest };
};

export default useProductQuery;
