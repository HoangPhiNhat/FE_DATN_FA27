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
    keepPreviousData: true,
  });
  return { data, refetch, ...rest };
};

export default useVoucherQuery;