"use client";
import { getOrder, orderHistory } from "@/services/order";
import { useQuery } from "@tanstack/react-query";

const useOrderQuery = (action) => {
  const queryKey = ["ORDER_KEY", action];
  const { data, refetch, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      switch (action) {
        case "ORDER_HISTORY":
          return await orderHistory();
        case "ORDER":
          return await getOrder();
        default:
          return null;
      }
    },
  });
  return { data, refetch, ...rest };
};

export default useOrderQuery;
