"use client";
import { getCart } from "@/services/cart";
import { useQuery } from "@tanstack/react-query";

const useCartQuery = () => {
  const queryKey = ["CART_KEY"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => await getCart(),
  });
  return { data, ...rest };
};

export default useCartQuery;
