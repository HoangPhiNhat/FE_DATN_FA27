"use client";
import {
  getHistoryOrder,
  getConfirmOrder,
  getDeliveryOrder,
  getDeliveredOrder,
} from "@/services/order";
import { useQuery } from "@tanstack/react-query";

const useOrderQuery = (action, page = 1, size = 4) => {
  const queryKey = ["ORDER_KEY", action, page, size];
  const { data, refetch, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      switch (action) {
        case "HISTORY_ORDER":
          return await getHistoryOrder(page, size);
        case "CONFIRM_ORDER":
          return await getConfirmOrder(page, size);
        case "DELIVERY_ORDER":
          return await getDeliveryOrder(page, size);
        case "DELIVERED_ORDER":
          return await getDeliveredOrder(page, size);
        default:
          return null;
      }
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
  });
  return { data, refetch, ...rest };
};

export default useOrderQuery;
