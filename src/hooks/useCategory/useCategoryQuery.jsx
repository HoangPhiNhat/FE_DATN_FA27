"use client";
import { getAllCategory, getCategoryById } from "@/services/category";
import { useQuery } from "@tanstack/react-query";

const useCategoryQuery = (action, slug) => {
  const queryKey = slug ? ["CATEGORY_KEY", slug] : ["CATEGORY_KEY"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      switch (action) {
        case "GET_ALL_CATEGORY":
          return await getAllCategory();
        case "GET_CATEGORY_BY_SLUG":
          return await getCategoryById(slug);
        default:
          return null;
      }
    },
  });
  return { data, ...rest };
};

export default useCategoryQuery;
