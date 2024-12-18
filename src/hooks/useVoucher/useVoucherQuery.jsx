"use client";
import { getVoucher } from "@/services/voucher";
import { useQuery } from "@tanstack/react-query";

const useVoucherQuery = () => {
  const queryKey = ["VOUCHER_KEY"];
  const { data, refetch, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        return await getVoucher();
      }
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
  });
  return { data, refetch, ...rest };
};

export default useVoucherQuery;
