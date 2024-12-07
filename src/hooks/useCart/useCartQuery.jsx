"use client";
import { getCart } from "@/services/cart";
import { useQuery } from "@tanstack/react-query";

const useCartQuery = (key) => {
  const queryKey = ["CART_KEY", key];
  const { data, refetch, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        return [];
      }
      return await getCart();
    },
  });
  return { data, refetch, ...rest };
};

export default useCartQuery;
