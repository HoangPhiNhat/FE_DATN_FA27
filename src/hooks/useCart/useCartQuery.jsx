"use client";
import { getCart } from "@/services/cart";
import { useQuery } from "@tanstack/react-query";

const useCartQuery = () => {
  const queryKey = ["CART_KEY"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        return [];
      }
      return await getCart();
    },
  });
  return { data, ...rest };
};

export default useCartQuery;
