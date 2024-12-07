"use client";
import { getOrder, orderHistory } from "@/services/order";
import { useQuery } from "@tanstack/react-query";

const useOrderQuery = (action, page = 1, size = 4) => {
  console.log(page)
  const queryKey = ["ORDER_KEY", action, page, size];
  const { data, refetch, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      switch (action) {
        case "ORDER_HISTORY":
          return await orderHistory(page, size);
        case "ORDER":
          return await getOrder(page, size);
        default:
          return null;
      }
    },
    keepPreviousData: true,
  });
  return { data, refetch, ...rest };
};

export default useOrderQuery;
